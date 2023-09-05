import { Menu, rem } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconEdit } from '@tabler/icons-react';
import React, { useRef } from 'react';
import { ITask } from '../types';
import TaskModalForm from './TaskModalForm';
import { TaskFormRefProps } from './TaskForm';
import { useUpdateTaskData } from '../infrastructure/taskQuery';

interface EditTaskButtonProps {
  taskId: number;
}

const EditTaskButton: React.FC<EditTaskButtonProps> = ({ taskId }) => {
  const { mutate } = useUpdateTaskData(taskId)
  const childRef = useRef<TaskFormRefProps>(null);

  const submit = (data: ITask) => {
    mutate(data)
    modals.close('test');
  };

  const clickHandler = () => {
    modals.openConfirmModal({
      modalId: 'test',
      title: 'Edit Task',
      children: (
        <TaskModalForm taskId={taskId} submit={submit} ref={childRef} />
      ),
      labels: { confirm: 'Save', cancel: 'Cancel' },
      confirmProps: { color: 'green' },
      closeOnConfirm: false,
      onConfirm: () => {
        if (childRef.current) {
          childRef.current.submit();
        }
      },
    });
  };

  return (
    <Menu.Item onClick={clickHandler} icon={<IconEdit size={rem(14)} />}>
      Edit
    </Menu.Item>
  );
};

export default EditTaskButton;
