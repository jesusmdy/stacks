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
  subTask?: TaskInterface[];
  comments?: string[];
}

export interface TaskStoreInterface {
  tasks: TaskInterface[];
  setTasks: (tasks: TaskInterface[]) => void;
  addTask: (task: TaskInterface) => void;
  removeTask: (id: string) => void;
  updateTask: (task: TaskInterface) => void;
}

export const useTasks = create<TaskStoreInterface>((set) => ({
  tasks: [],
  setTasks: (tasks) => set(() => ({ tasks })),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  removeTask: (id) =>
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
  updateTask: (task) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    })),
}));

export const useTaskList = () => useTasks((state) => state.tasks);
export const useTask = (id: string) => useTasks((state) => state.tasks.find((task) => task.id === id));
export const useAddTask = () => useTasks((state) => state.addTask);
export const useRemoveTask = () => useTasks((state) => state.removeTask);
export const useUpdateTask = () => useTasks((state) => state.updateTask);
export const useGetTasksByProjectId = (projectId: string) => useTasks((state) => state.tasks.filter((task) => task.projectId === projectId));
export const useGetTasksByStatusId = (statusId: string) => useTasks((state) => state.tasks.filter((task) => task.statusId === statusId));
export const useGetTasksByTag = (tag: string) => useTasks((state) => state.tasks.filter((task) => task.tags.includes(tag)));
export const useGetTasksByPriority = (priority: number) => useTasks((state) => state.tasks.filter((task) => task.priority === priority));
export const useGetTasksByEstimatedTime = (estimatedTime: number) => useTasks((state) => state.tasks.filter((task) => task.estimatedTime === estimatedTime));
export const useGetTasksByTimeSpent = (timeSpent: number) => useTasks((state) => state.tasks.filter((task) => task.timeSpent === timeSpent));
export const useGetTasksBySubTask = (subTask: TaskInterface[]) => useTasks((state) => state.tasks.filter((task) => task.subTask === subTask));
export const useGetTasksByComments = (comments: string[]) => useTasks((state) => state.tasks.filter((task) => task.comments === comments));
export const useSetTasks = () => useTasks((state) => state.setTasks);
