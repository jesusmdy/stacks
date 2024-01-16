import { create } from 'zustand';

export interface TaskInterface {
  projectId: string;
  statusId: string;
  id: string;
  title: string;
  description: string;
  dateCreated: Date;
  dueDate: Date;
  tags: string[];
  estimatedTime: number;
  timeSpent: number;
  priority: number;
  subTask?: string[];
  comments?: string[];
  parentId?: string;
}

export interface TaskStoreInterface {
  tasks: TaskInterface[];
  options: {
    showCompletedTasks: boolean;
    setShowCompletedTasks: (showCompletedTasks: boolean) => void;
    showClosedTasks: boolean;
    setShowClosedTasks: (showClosedTasks: boolean) => void;
  },
  setTasks: (tasks: TaskInterface[]) => void;
  addTask: (task: TaskInterface) => void;
  removeTask: (id: string) => void;
  updateTask: (task: TaskInterface) => void;
  toggleShowCompletedTasks: () => void;
  toggleShowClosedTasks: () => void;
}

export const useTasks = create<TaskStoreInterface>((set) => ({
  tasks: [],
  options: {
    showCompletedTasks: true,
    showClosedTasks: true,
    setShowCompletedTasks: (showCompletedTasks) =>
      set((state) => ({
        options: { ...state.options, showCompletedTasks },
      })),
    setShowClosedTasks: (showClosedTasks) =>
      set((state) => ({
        options: { ...state.options, showClosedTasks },
      })),
  },
  setTasks: (tasks) => set(() => ({ tasks })),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  removeTask: (id) =>
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
  updateTask: (task) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    })),
  toggleShowCompletedTasks: () =>
    set((state) => ({
      options: {
        ...state.options,
        showCompletedTasks: !state.options.showCompletedTasks,
      },
    })),
  toggleShowClosedTasks: () =>
    set((state) => ({
      options: {
        ...state.options,
        showClosedTasks: !state.options.showClosedTasks,
      },
    })),
}));

// ui
export const useShowCompletedTasks = () => useTasks((state) => state.options.setShowCompletedTasks);
export const useShowClosedTasks = () => useTasks((state) => state.options.setShowClosedTasks);
export const useTasksOptions = () => useTasks((state) => state.options);

export const useTaskList = () => useTasks((state) => state.tasks);
export const useTask = (id: string) => useTasks((state) => state.tasks.find((task) => task.id === id));
export const useAddTask = () => useTasks((state) => state.addTask);
export const useRemoveTask = () => useTasks((state) => state.removeTask);
export const useUpdateTask = () => useTasks((state) => state.updateTask);
export const useGetTaskByID = (id: string) => useTasks((state) => state.tasks.find((task) => task.id === id));
export const useGetTasksByProjectId = (projectId: string) => useTasks((state) => state.tasks.filter((task) => task.projectId === projectId));
export const useGetParentTaskByProjectId = (projectId: string) => useTasks((state) => state.tasks.filter((task) => task.projectId === projectId && !task.parentId));
export const useGetTasksByStatusId = (statusId: string) => useTasks((state) => state.tasks.filter((task) => task.statusId === statusId));
export const useGetParentTasksByStatusId = (statusId: string) => useTasks((state) => state.tasks.filter((task) => task.statusId === statusId && !task.parentId));
export const useGetTasksByTag = (tag: string) => useTasks((state) => state.tasks.filter((task) => task.tags.includes(tag)));
export const useGetTasksByParentId = (parentId: string) => useTasks((state) => state.tasks.filter((task) => task.parentId === parentId));
export const useGetTasksByPriority = (priority: number) => useTasks((state) => state.tasks.filter((task) => task.priority === priority));
export const useGetTasksByEstimatedTime = (estimatedTime: number) => useTasks((state) => state.tasks.filter((task) => task.estimatedTime === estimatedTime));
export const useGetTasksByTimeSpent = (timeSpent: number) => useTasks((state) => state.tasks.filter((task) => task.timeSpent === timeSpent));
export const useGetTasksByComments = (comments: string[]) => useTasks((state) => state.tasks.filter((task) => task.comments === comments));
export const useSetTasks = () => useTasks((state) => state.setTasks);
