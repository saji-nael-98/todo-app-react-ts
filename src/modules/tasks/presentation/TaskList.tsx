import { Box, Flex, Paper, ScrollArea, Stack, Title, rem } from '@mantine/core';
import { useFetchTasksQuery } from '@modules/tasks/infrastructure/tasksQuery';
import { ITask } from '@modules/tasks/types';
import AddTaskButton from '@modules/tasks/presentation/AddTaskButton';
import TaskCard from '@modules/tasks/presentation/TaskCard';
const TaskList = () => {
  const { data, isLoading, isFetching } = useFetchTasksQuery();
  if (isLoading || isFetching) {
    return <p>loading...</p>;
  }
  return (
    <Paper
      pos="relative"
      shadow="md"
      p="md"
      radius="md"
      h={600}
      withBorder
      sx={(theme) => ({
        marginTop: 75,
        '@media (max-width: 50em)': {
          width: rem('90%'),
        },
        '@media (min-width: 50em)': {
          width: 350,
        },
      })}
    >
      <Flex direction="column" h={'100%'}>
        <Title
          order={3}
          sx={{
            textAlign: 'center',
            fontWeight: 'normal',
          }}
        >
          All Tasks
        </Title>
        <Box
          sx={{
            flex: 1,
            paddingTop: 10,
            height: 0,
            minHeight: 0,
          }}
        >
          <ScrollArea h={'100%'} type="scroll">
            <Stack>
              {data?.data.map((task: ITask) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </Stack>
          </ScrollArea>
        </Box>
        <AddTaskButton />
      </Flex>
    </Paper>
  );
};

export default TaskList;
