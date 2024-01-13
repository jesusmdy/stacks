import { create } from 'zustand';

export interface NoteInterface {
  id: string;
  projectId: string;
  parentId: string;
  content: string;
  createdAt: Date;
}

interface NotesStoreInterface {
  notes: NoteInterface[];
  setNotes: (notes: NoteInterface[]) => void;
  addNote: (note: NoteInterface) => void;
  deleteNote: (id: string) => void;
}

export const useNotesStore = create<NotesStoreInterface>((set) => ({
  notes: [],
  setNotes: (notes) => set(() => ({ notes })),
  addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
  deleteNote: (id) => set((state) => ({ notes: state.notes.filter((note) => note.id !== id) })),
}));

export const useNotes = () => useNotesStore((state) => state.notes);
export const useSetNotes = () => useNotesStore((state) => state.setNotes);
export const useAddNote = () => useNotesStore((state) => state.addNote);
export const useDeleteNote = () => useNotesStore((state) => state.deleteNote);
export const useGetNotesByParent = (parentId: string) => useNotesStore((state) => state.notes.filter((note) => note.parentId === parentId));
export const useGetNote = (id: string) => useNotesStore((state) => state.notes.find((note) => note.id === id));