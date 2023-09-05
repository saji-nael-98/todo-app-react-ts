import { TextInput } from '@mantine/core';
import { ITask } from '@modules/tasks/types';
import React, { Ref, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface Props {
  task?: ITask;
  submit: (data: ITask) => void;
}
export interface TaskFormRefProps {
  submit: () => void;
}
const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
});
function TaskForm(props: Props, ref: Ref<TaskFormRefProps>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITask>({
    values: props.task,
    resolver: yupResolver(schema),
  });
  useImperativeHandle(ref, () => ({ submit: handleSubmit(props.submit) }));

  return (
    <form onSubmit={handleSubmit(props.submit)}>
      <TextInput
        withAsterisk
        label="Title"
        placeholder="Enter task title"
        error={errors?.title?.message || undefined}
        {...register('title')}
      />
      <TextInput
        withAsterisk
        label="Description"
        placeholder="Enter task title"
        error={errors?.description?.message || undefined}
        {...register('description')}
      />
    </form>
  );
}

export default React.forwardRef(TaskForm);
