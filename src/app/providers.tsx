/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { ChakraProvider } from '@chakra-ui/react'
import theme from '../../theme'
import { FC, Fragment, PropsWithChildren, useEffect } from 'react'
import { useProjects, useSetProjects } from '../../store/projects'
import { useSetStatus, useStatusList } from '../../store/status'
import { useSetTasks, useTaskList } from '../../store/task'
import { useNotes, useSetNotes } from '../../store/notes'
import { db } from '../../db'

export const STORAGE_NAME = {
  PROJECTS: 'projects',
  STATUS: 'status',
  TASKS: 'tasks',
  NOTES: 'notes'
}

interface StorageItem {
  value: any;
  setValue: (value: any) => void;
  name: string;
}

const useStorage = (storageItem: StorageItem) => {
  const { value, setValue, name } = storageItem;

  useEffect(() => {
    db.table(name).toArray().then((data: any) => {
      if (data.length > 0 && value.length === 0) {
        setValue(data);
      }
    })
  }, []);

  
};

const StorageProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const projects = useProjects();
  const statusList = useStatusList();
  const taskList = useTaskList();
  const notes = useNotes();

  useStorage({ value: projects, setValue: useSetProjects(), name: STORAGE_NAME.PROJECTS });
  useStorage({ value: statusList, setValue: useSetStatus(), name: STORAGE_NAME.STATUS });
  useStorage({ value: taskList, setValue: useSetTasks(), name: STORAGE_NAME.TASKS });
  useStorage({ value: notes, setValue: useSetNotes(), name: STORAGE_NAME.NOTES });

  return <Fragment>{children}</Fragment>;
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <StorageProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </StorageProvider>
    </ChakraProvider>
  )
}