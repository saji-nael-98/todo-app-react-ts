import React, { Ref } from 'react';
import { useTaskData } from '../infrastructure/taskQuery';
import { ITask } from '../types';
import TaskForm, { TaskFormRefProps } from './TaskForm';

interface Props {
  taskId?: number;
  submit: (data: ITask) => void;
}

function TaskModalForm(
  { taskId = 0, submit }: Props,
  ref: Ref<TaskFormRefProps>,
) {
  const { data, isFetching, isLoading } = useTaskData(taskId as number);
  if (isLoading || isFetching) {
    return <p>loading...</p>;
  }
  return <TaskForm task={data?.data} submit={submit} ref={ref} />;
}
export default React.forwardRef(TaskModalForm);
