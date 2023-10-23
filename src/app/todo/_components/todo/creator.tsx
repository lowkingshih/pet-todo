'use client'

import { Box, Button, Container, Input } from "@mui/material"
import { useLocalStore, StoreConfig } from "state-decorator";
import { Todo } from "@/type"

type State = {
  description: Todo['description']
}

type Actions = {
  setDescription: (description: Todo['description']) => void
}

type Props = {
  createTodo: (todo: string) => void
}

const config: StoreConfig<State, Actions, Props> = {
  getInitialState: () => ({
    description: ''
  }),

  actions: {
    setDescription: ({ args: [description] }) =>({
        description
    })
  }
}
const Creator = ({
  createTodo
}: Props) => {
  const { state, actions } = useLocalStore(config);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '2rem',
        maxWidth: 'sm'
      }}
    >
      <Box 
        sx={{
          flexGrow: 1,
          pr: 1
        }}
      >
        <Input
          placeholder="填寫代辦事項"
          value={state.description}
          onChange={(e) => actions.setDescription(e.target.value)}
          sx={{
            width: '100%',
            marginRight: '1rem',
            flexGrow: 1,
          }}
        />
      </Box>
      <Box>
        <Button
          variant='contained'
          onClick={() => {
            createTodo(state.description);
            actions.setDescription('');
          }}
        >
          新增事項
        </Button>
      </Box>
    </Container>
  )

}

export default Creator