'use client'

import { Stack, Typography, ButtonGroup, Button, Input } from '@mui/material'
import { useLocalStore, StoreConfig } from "state-decorator"
import { Todo } from "@/type"


type State = {
    isEdit: boolean;
    editDescription: Todo['description'];
}

type Actions = {
    setIsEdit: (isEdit: State['isEdit']) => void;
    editTodo: (description: Todo['description']) => void;
    setEditDescription: (editDescription: State['editDescription']) => void;
    cancelEdit: () => void;
}

type Props = {
    id: Todo['id'];
    description: Todo['description'];
    index: number;
    deleteTodo: (id: Todo['id']) => void;
    updateTodo: (id: Todo['id'], description: Todo['description']) => void;
}

const config: StoreConfig<State, Actions, Props> = {
    getInitialState: (params) => {
        return ({
            isEdit: false,
            editDescription: ''
        })
    },
    actions: {
        editTodo: ({ args:[currentDescription] }) => ({ 
            isEdit: true, 
            editDescription: currentDescription
        }),
        setIsEdit: ({ args: [isEdit] }) => ({ isEdit }),
        setEditDescription: ({ args: [editDescription] }) => ({ editDescription }),
        cancelEdit: () => ({
            isEdit: false,
            editDescription: ''
        })
    }
}

const Item = ({
    id,
    description,
    deleteTodo,
    updateTodo,
    index
}: Props) => {
    const { state, actions } = useLocalStore(config)

    return (
        <Stack 
            direction='row'
            justifyContent='flex-start'
            alignItems='center'
            marginBottom={1}
        >
            {
                state.isEdit 
                    ? (
                        <Stack
                            direction='row'
                            justifyContent='flex-start'
                            alignItems='center'
                            sx={{
                                flexGrow: 1,
                                paddingX: 1
                            }}
                        >
                            <Input 
                                type="text" 
                                value={state.editDescription}
                                onChange={(e) => actions.setEditDescription(e.target.value)}
                                sx={{
                                    width: '100%',
                                }}
                            />
                        </Stack>
                    )
                    : (
                        <Typography>
                            { `${index}. ${description}` }
                        </Typography>
                    )
            }
            {
                state.isEdit ? (
                    <ButtonGroup 
                        variant="contained" 
                        color='success'
                        aria-label="outlined secondary button group"
                        sx={{
                            marginLeft: 'auto'
                        }}
                    >
                        <Button
                            color='error'
                            onClick={actions.cancelEdit}
                        >
                            取消
                        </Button>
                        <Button
                            color='success'
                            onClick={() => {
                                updateTodo(id, state.editDescription);

                                actions.setIsEdit(false);
                            }}
                        >
                            確定
                        </Button>
                    </ButtonGroup>
                ) : (
                    <ButtonGroup
                        variant="contained" 
                        color='success'
                        aria-label="outlined secondary button group"
                        sx={{
                            marginLeft: 'auto'
                        }}
                    >
                        <Button
                            color='warning'
                            onClick={() => actions.editTodo(description)}
                        >
                            編輯
                        </Button>
                        <Button
                            color='error'
                            onClick={() => deleteTodo(id)}
                        >
                            刪除
                        </Button>
                    </ButtonGroup>
                )
            }
        </Stack>
    
    )
}

export default Item