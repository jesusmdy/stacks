/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { Box, Button, ButtonProps, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { RadioButtonCheckedIcon } from '../../../icons';
import { StatusItem, useGetStatusByProjectId } from '../../../store/status';
import _ from 'lodash';
import { CheckIcon } from '@chakra-ui/icons';
import { ProjectContext } from '@/app/projects/[projectId]/context';
import StatusModal from '../StatusModal';

interface StatusButtonProps extends ButtonProps {
  status: StatusItem;
  withLabel?: boolean;
}

const StatusButton: FC<StatusButtonProps> = ({ status, withLabel, ...rest }) => {

  if (withLabel) return (
    <Button
      variant="solid"
      colorScheme="gray"
      leftIcon={
        <RadioButtonCheckedIcon
          width={15}
          height={15}
          style={{
            color: `var(--chakra-colors-${status.color}-500)`
          }}
        />
      }
      {...rest}
    >
      <Text fontSize="xs" isTruncated>{status.name}</Text>
    </Button>
  )

  return (
    <IconButton
      variant="unstyled"
      aria-label={status.name}
      icon={
        <RadioButtonCheckedIcon
          width={15}
          height={15}
          style={{
            color: `var(--chakra-colors-${status.color}-500)`
          }}
        />
      }
      {...rest}
    />
  )
};

const ItemButton: FC<{
  status: StatusItem;
  currentStatusId?: string;
  onClick?: () => void;
}> = ({ status, onClick, currentStatusId }) => {
  return (
    <Button
      key={status.id}
      onClick={onClick}
      display="flex"
      alignItems="center"
      gap={2}
      variant="ghost"
    >
      <RadioButtonCheckedIcon width={15} height={15} style={{ color: `var(--chakra-colors-${status.color}-500)` }} />
      <Text fontSize="xs" textAlign="left" flex={1}>{status.name}</Text>
      {
        status.id === currentStatusId && (
          <CheckIcon color="blue.500" width={11} height={11} />
        )
      }
    </Button>
  )
}

const StatusPicker: FC<{
  onChange?: (statusId: string) => void;
  defaultValue?: string;
  readOnly?: boolean;
  withLabel?: boolean;
  buttonProps?: ButtonProps;
}> = ({ defaultValue, withLabel, readOnly, onChange, buttonProps }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState('');
  const { project } = useContext(ProjectContext);
  const [statusId, setStatusId] = useState(defaultValue);
  const statusList = useGetStatusByProjectId(project.id);

  useEffect(
    () => {
      if (defaultValue) {
        setStatusId(defaultValue);
      }
    },
    [defaultValue]
  );

  const status = useMemo(
    () => {
      return statusId ? _.find(statusList, { id: statusId }) : _.first(statusList);
    },
    [statusId]
  )

  const filteredStatusList = useMemo(
    () => {
      return _.filter(
        statusList,
        (status) => {
          return status.name.toLowerCase().includes(search.toLowerCase());
        }
      )
    },
    [search, statusList]
  )


  const handleChangeStatus = (id: string) => {
    setStatusId(id);
    onChange && onChange(id);
    onClose();
  }

  if (_.isEmpty(status)) return null;

  if (readOnly) return (
    <StatusButton status={status} withLabel={withLabel} {...buttonProps} />
  )

  return (
    <Box position="relative">
      <Popover
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        placement="bottom-start"
      >
        <PopoverTrigger>
          <StatusButton status={status} withLabel={withLabel} {...buttonProps} />
        </PopoverTrigger>
        <PopoverContent width="250px">
          <PopoverArrow />
          <PopoverCloseButton zIndex={1} />
          <PopoverHeader
            px={4}
            py={1.5}
            display="flex"
            alignItems="center"
          >
            <Input
              variant="unstyled"
              fontSize="xs"
              size="sm"
              placeholder="Search status"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </PopoverHeader>
          <PopoverBody>
            <Stack gap={1}>
              {
                _.map(
                  filteredStatusList,
                  (status) => {
                    return (
                      <ItemButton
                        key={status.id}
                        status={status}
                        onClick={() => handleChangeStatus(status.id)}
                        currentStatusId={statusId}
                      />
                    )
                  }
                )
              }
            </Stack>
          </PopoverBody>
          <PopoverFooter>
            <StatusModal />
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </Box>
  )
};

export default StatusPicker;