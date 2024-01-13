import _ from 'lodash';
import { create } from 'zustand';


export const SEVERITY: Record<string, string> = {
  error: 'error',
  warning: 'warning',
  info: 'info',
  success: 'success',
};

export const PRIORITY: Record<string, string> = {
  low: 'low',
  medium: 'medium',
  high: 'high',
};

type SeverityType = (keyof typeof SEVERITY);
type PriorityType = (keyof typeof PRIORITY);

export interface StatusItem {
  id: string;
  projectId: string;
  name: string;
  description: string;
  createdAt: Date;
  severity: SeverityType;
  priority: PriorityType;
}

interface StatusStore {
  status: StatusItem[];
  addStatus: (status: StatusItem) => void;
  removeStatus: (id: string) => void;
  updateStatus: (status: StatusItem) => void;
  setStatus: (status: StatusItem[]) => void;
}

export const useStatus = create<StatusStore>((set) => ({
  status: [],
  addStatus: (status: StatusItem) => set((state) => ({ status: [...state.status, status] })),
  removeStatus: (id: string) => set((state) => ({ status: state.status.filter((status) => status.id !== id) })),
  updateStatus: (status: StatusItem) => set((state) => ({ status: state.status.map((s) => (s.id === status.id ? status : s)) })),
  setStatus: (status: StatusItem[]) => set(() => ({ status })),
}));

export const useSetStatus = () => useStatus((state) => state.setStatus);
export const useAddStatus = () => useStatus((state) => state.addStatus);
export const useRemoveStatus = () => useStatus((state) => state.removeStatus);
export const useStatusList = () => useStatus((state) => state.status);
export const useUpdateStatus = () => useStatus((state) => state.updateStatus);
export const useGetStatusByProjectId = (projectId: string) => useStatus((state) => _.filter(_.flatten(state.status), { projectId }));
export const useGetStatusByID = (id: string) => useStatus((state) => _.find(_.flatten(state.status), { id }));
