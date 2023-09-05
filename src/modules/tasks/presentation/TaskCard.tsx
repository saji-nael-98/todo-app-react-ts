import { ActionIcon, Card, Flex, Menu, Text, rem } from '@mantine/core';
import { ITask } from '@modules/tasks/types';
import { IconCircleCheck, IconDots, IconTrash } from '@tabler/icons-react';
import React from 'react';
import EditTaskButton from './EditTaskButton';
import { DoneTaskButton } from './DoneTaskButton';

interface TaskCardProps {
  task: ITask;
}
const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder h={'auto'}>
      <Card.Section withBorder px={5}>
        <Flex align="center" gap="md">
          <IconCircleCheck color={task.done? 'green':'black'} size={rem(14)} />
          <Text size="sm" weight={500}>
            {task.title}
          </Text>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon>
                <IconDots size="1rem" />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              {!task.done && (
                <>
                  <DoneTaskButton taskId={task.id as number} />
                  <EditTaskButton taskId={task.id as number} />
                </>
              )}
              <Menu.Item icon={<IconTrash size={rem(14)} />} color="red">
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Card.Section>
      <Card.Section px={5}>
        <Text size="sm" lineClamp={3}>
          {task.description}
        </Text>
      </Card.Section>
    </Card>
  );
};

export default TaskCard;
