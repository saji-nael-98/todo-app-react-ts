import { axiosClient } from '@config/axios';
import { ITask } from '@modules/tasks/types';
import { useMutation, useQuery } from 'react-query';
import { useQueryClient } from 'react-query';

function saveTask(task: ITask) {
  return axiosClient.post('/tasks', task);
}

export const useSaveTaskQuery = () => {
  const queryClient = useQueryClient();
  return useMutation(saveTask, {
    onMutate: async (newTask) => {
      await queryClient.cancelQueries('task');
      const prevTasks = queryClient.getQueryData('tasks');
      queryClient.setQueriesData('tasks', (oldQueryData: any) => {
        if (oldQueryData?.data.length) {
          return {
            ...oldQueryData,
            data: [
              ...oldQueryData?.data,
              {
                id: oldQueryData?.data?.length + 1,
                ...newTask,
              },
            ],
          };
        }
        return {
          ...oldQueryData,
          data: [
            {
              id: 1,
              ...newTask,
            },
          ],
        };
      });
      return { prevTasks };
    },
  });
};

function fetchTask(taskId: number) {
  return axiosClient.get('/tasks/' + taskId);
}

export const useTaskData = (taskId: number) => {
  return useQuery(['task', taskId], () => fetchTask(taskId), {
    enabled: !!taskId,
  });
};

async function updateTaskData(taskId: number, task: ITask) {
  return axiosClient.put('/tasks/' + taskId, task)
}

export const useUpdateTaskData = (taskId: number) => {
  const queryClient = useQueryClient();

  return useMutation(['tasks', taskId], (task: ITask) => updateTaskData(taskId, task), {
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries('tasks')
    },
  })
}

async function doneTask(taskId: number) {
  return axiosClient.patch('/tasks/' + taskId,{done:true})
}

export const useDoneTask = (taskId: number) => {
  const queryClient = useQueryClient();

  return useMutation(['tasks', taskId], () => doneTask(taskId), {
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries('tasks')
    },
  })
}