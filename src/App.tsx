import TaskList from '@modules/tasks/presentation/TaskList';
import { Center, Container, MantineProvider, rem } from '@mantine/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ModalsProvider } from '@mantine/modals';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        theme={{
          primaryColor: 'grape',
          components: {
            Button: {
              defaultProps: {
                size: 'xs',
              },
            },
          },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <ModalsProvider>
          <Container
            fluid
            mih={rem('100vh')}
            sx={(theme) => ({
              backgroundImage: theme.fn.linearGradient(
                180,
                theme.colors.blue[2],
                theme.colors.blue[9],
              ),
            })}
          >
            <Center>
              <TaskList />
            </Center>
          </Container>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}
