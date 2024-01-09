import { create } from 'zustand';

export interface ProjectProps {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
};

interface ProjectsStore {
  projects: ProjectProps[];
  addProject: (project: ProjectProps) => void;
  setProjects: (projects: ProjectProps[]) => void;
  removeProject: (id: string) => void;
  updateProject: (id: string, project: ProjectProps) => void;
};

export const useProjectsStore = create<ProjectsStore>((set) => ({
  projects: [],
  setProjects: (projects) => set(() => ({ projects })),
  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  removeProject: (id) => set((state) => ({ projects: state.projects.filter((project) => project.id !== id) })),
  updateProject: (id, project) => set((state) => ({ projects: state.projects.map((project) => project.id === id ? project : project) })),
}));

export const useProjects = () => useProjectsStore((state) => state.projects);
export const useSetProjects = () => useProjectsStore((state) => state.setProjects);
export const useAddProject = () => useProjectsStore((state) => state.addProject);
export const useRemoveProject = () => useProjectsStore((state) => state.removeProject);
export const useUpdateProject = () => useProjectsStore((state) => state.updateProject);

// getters
export const useGetProject = (id: string) => useProjectsStore((state) => state.projects.find((project) => project.id === id));
