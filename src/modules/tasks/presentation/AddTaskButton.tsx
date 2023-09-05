import { ActionIcon, Box } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconPlus } from '@tabler/icons-react';
import { useRef } from 'react';
import { useSaveTaskQuery } from '../infrastructure/taskQuery';
import { ITask } from '../types';
import { TaskFormRefProps } from './TaskForm';
import TaskModalForm from './TaskModalForm';

const AddTaskButton: React.FC = () => {
  const { mutateAsync } = useSaveTaskQuery();
  const childRef = useRef<TaskFormRefProps>(null);

  const submit = async (data: ITask) => {
    await mutateAsync(data);
    modals.close('test');
  };

  const clickHandler = () => {
    modals.openConfirmModal({
      modalId: 'test',
      title: 'Add a new task',
      children: <TaskModalForm submit={submit} ref={childRef} />,
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
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: 100,
        bottom: 0,
        left: 0,
        backgroundImage:
          'linear-gradient(180deg,rgba(255,255,255,0.7),rgba(255,255,255,1))',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ActionIcon
        onClick={clickHandler}
        color="green"
        size="xl"
        radius="xl"
        variant="filled"
      >
        <IconPlus size="2.125rem" />
      </ActionIcon>
    </Box>
  );
};

export default AddTaskButton;
