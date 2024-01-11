import { FC, useMemo } from 'react';
import { TaskInterface } from '../../../store/task';
import { Flex, Text, useColorMode } from '@chakra-ui/react';
import { isPast, isToday } from 'date-fns';

const DueDateLabel: FC<{
  task: TaskInterface
}> = ({ task }) => {

  const colorMode = useColorMode().colorMode;

  const date = useMemo(
    () => {
      const dueDate = new Date(task.dueDate);
      const isPastDue = isPast(dueDate);
      const isDueToday = isToday(dueDate);
      if (isPastDue) {
        return {
          color: 'red',
          text: 'Past Due',
          fontWeight: 'bold'
        }
      }
      if (isDueToday) {
        return {
          color: 'orange',
          text: 'Due Today',
          fontWeight: 'bold'
        }
      }
      return {
        color: colorMode === 'light' ? 'black' : 'gray.400',
        text: (() => {
          if (!task.dueDate) return '-';
          return dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        })(),
        fontWeight: 'normal'
      }
    },
    [task.dueDate, colorMode]
  );

  return (
    <Flex alignItems="center" width="10%" borderLeft="1px solid" borderColor="inherit" paddingX={2}>
      <Text size="sm" rounded="full" color={date.color} fontSize="xs" fontWeight={date.fontWeight}>{date.text}</Text>
    </Flex>
  )
};

export default DueDateLabel;