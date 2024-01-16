import Dexie from 'dexie';

export const NAME = 'stacksDb';
export const VERSION = 1;

export const db: Record<string, any> = new Dexie(NAME);

db.version(VERSION).stores({
  projects: 'id, name, description, createdAt',
  status: 'id, name, projectId, description, createdAt, severity, priority, color, category',
  tasks: 'id, projectId, statusId, title, description, dateCreated, dueDate, tags, estimatedTime, timeSpent, priority, subTask, comments, isSubTask',
  notes: 'id, projectId, parentId, content, createdAt',
});
