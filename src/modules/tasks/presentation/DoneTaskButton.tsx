import React from 'react'
import { Menu, rem } from '@mantine/core'
import { IconCircleCheck } from '@tabler/icons-react';
import { useDoneTask } from '../infrastructure/taskQuery';

interface Props {
    taskId: number
}
export const DoneTaskButton: React.FC<Props> = ({ taskId }) => {
    const { mutate } = useDoneTask(taskId)
    const clickHandler = () => {
        mutate()
    }
    return (
        <Menu.Item onClick={clickHandler} icon={<IconCircleCheck size={rem(14)} />}>
            Done
        </Menu.Item>
    )
}
