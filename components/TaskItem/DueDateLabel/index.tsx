/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useMemo } from 'react';
import { TaskInterface } from '../../../store/task';
import { Flex, FlexProps, Text, useColorMode } from '@chakra-ui/react';
import { isPast, isToday } from 'date-fns';
import { useGetStatusByID } from '../../../store/status';
import { statusCategory, toDateString } from '../../../utils/constants';

const DueDateLabel: FC<{
  task: TaskInterface,
  flexProps?: FlexProps
}> = ({ task, flexProps }) => {

  const colorMode = useColorMode().colorMode;
  const status = useGetStatusByID(task.statusId);

  const toDueDateString = (task: TaskInterface) => {
    if (!task.dueDate) return '-';
    return toDateString(new Date(task.dueDate));
  };

  const date = useMemo(
    () => {
      const dueDate = new Date(task.dueDate);
      const isPastDue = isPast(dueDate);
      const isDueToday = isToday(dueDate);
      if (
        status && (
          status.category === statusCategory.closed ||
          status.category === statusCategory.completed
        )
      ) {
        return {
          color: 'green',
          text: toDueDateString(task),
          fontWeight: 'bold'
        }
      }
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
        text: toDueDateString(task),
        fontWeight: 'normal'
      }
    },
    [task.dueDate, colorMode, status]
  );

  return (
    <Flex alignItems="center" width="10%" borderLeft="1px solid" borderColor="inherit" paddingX={2} {...flexProps}>
      <Text size="sm" rounded="full" color={date.color} fontSize="xs" fontWeight={date.fontWeight}>{date.text}</Text>
    </Flex>
  )
};

export default DueDateLabel;