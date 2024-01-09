/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { ChakraProvider } from '@chakra-ui/react'
import theme from '../../theme'
import { FC, PropsWithChildren, useEffect } from 'react'
import { useProjects, useSetProjects } from '../../store/projects'
import { useSetStatus, useStatusList } from '../../store/status'
import { useSetTasks, useTaskList } from '../../store/task'

export const STORAGE_NAME = {
  PROJECTS: 'projects',
  STATUS: 'status',
  TASKS: 'tasks'
}

const ProjectsProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const projects = useProjects();
  const setProjects = useSetProjects();

  useEffect(
    () => {
      const storageItem = localStorage.getItem(STORAGE_NAME.PROJECTS);
      if (
          storageItem !== null && storageItem !== undefined
          && projects.length === 0
        ) {
        setProjects(JSON.parse(storageItem));
      }
    },
    []
  );

  useEffect(
    () => {
      if (
          projects.length > 0
      ) {
        localStorage.setItem(STORAGE_NAME.PROJECTS, JSON.stringify(projects));
      }
    },
    [projects]
  );

  return (
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
  )
}

const StatusProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const statusList = useStatusList();
  const setStatusList = useSetStatus();

  useEffect(
    () => {
      const storageItem = localStorage.getItem(STORAGE_NAME.STATUS);
      if (
          storageItem !== null && storageItem !== undefined
          && statusList.length === 0
        ) {
        setStatusList(JSON.parse(storageItem));
      }
    },
    []
  );

  useEffect(
    () => {
      if (
          statusList.length > 0
      ) {
        localStorage.setItem(STORAGE_NAME.STATUS, JSON.stringify(statusList));
      }
    },
    [statusList]
  );

  return (
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
  )
}

const TasksProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const taskList = useTaskList();
  const setTaskList = useSetTasks();

  useEffect(
    () => {
      const storageItem = localStorage.getItem(STORAGE_NAME.TASKS);
      if (
          storageItem !== null && storageItem !== undefined
          && taskList.length === 0
        ) {
        setTaskList(JSON.parse(storageItem));
      }
    },
    []
  );

  useEffect(
    () => {
      if (
          taskList.length > 0
      ) {
        localStorage.setItem(STORAGE_NAME.TASKS, JSON.stringify(taskList));
      }
    },
    [taskList]
  );

  return (
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <ProjectsProvider>
        <StatusProvider>
          <TasksProvider>
            {children}
          </TasksProvider>
        </StatusProvider>
      </ProjectsProvider>
    </ChakraProvider>
  )
}