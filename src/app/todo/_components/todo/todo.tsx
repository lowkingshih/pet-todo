'use client'

import { Container, Typography, Stack } from '@mui/material';
import { useLocalStore, StoreConfig } from 'state-decorator';
import { v4 } from "uuid"
import { Todo } from "@/type"
import Creator from "./creator";
import Item from "./item";
 
type State = {
    todoList: Todo[];
}

type Actions = {
    handleCreateTodo: (description: Todo['description']) => void;
    handleDeleteTodo: (id: Todo['id']) => void;
    handleUpdateTodo: (id: Todo['id'], description: Todo['description']) => void;
}

type Props = {}

const INITIAL_TODO_LIST: Todo[] = [
    {
        id: v4(),
        description: '吃飯',
        isDone: false
    },
    {
        id: v4(),
        description: '睡覺',
        isDone: false
    },
    {
        id: v4(),
        description: '打東東',
        isDone: false
    }
]

const config: StoreConfig<State, Actions, Props> = {
    getInitialState: () => ({
        todoList: INITIAL_TODO_LIST
    }),
    actions: {
        handleCreateTodo: ({ args: [description], state }) => ({
            todoList: state.todoList = [...state.todoList, {
                id: v4(),
                description,
                isDone: false
            }]
        }),
        handleDeleteTodo: ({ args: [id], state }) => ({
            todoList: state.todoList.filter(todo => todo.id !== id)
        }),
        handleUpdateTodo: ({ args: [id, description], state }) => ({
            todoList: state.todoList.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        description
                    }
                }

                return todo;
            })
        })
    }
}


const Todo = () => {
    const { state, actions } = useLocalStore(config);

    return (
        <Container 
            id="www"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100vh',
            }}
            maxWidth="sm"
        >
            <Typography variant="h2" textAlign='center'>
                待辦清單
            </Typography>
            <Creator 
                createTodo={actions.handleCreateTodo}
            />
            <Stack 
                sx={{
                    width: '100%',
                    padding: 2
                }}
            >
                {
                    state.todoList.map((todo, index) => (
                        <Item 
                            key={todo.id}
                            id={todo.id}
                            description={todo.description}
                            index={index + 1}
                            deleteTodo={actions.handleDeleteTodo}
                            updateTodo={actions.handleUpdateTodo}
                        />
                    ))
                }
            </Stack>
        </Container>
    )
}

export default Todo