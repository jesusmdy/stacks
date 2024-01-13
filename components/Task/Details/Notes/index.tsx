import { Box, IconButton, Input, Stack, Text, useColorMode } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { TaskInterface } from '../../../../store/task';
import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import { useAddNote, useGetNotesByParent } from '../../../../store/notes';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Note from './Note';
import { db } from '../../../../db';

export const AddNoteField: FC<{
  parentId: string;
  projectId: string;
}> = ({ parentId, projectId }) => {
  const [note, setNote] = useState('');
  const addNote = useAddNote();
  
  const onAddNote = () => {
    const _note = {
      id: uuidv4(),
      parentId,
      projectId,
      content: note,
      createdAt: new Date()
    };
    db.notes.put(_note).then(() => {
      addNote(_note);
      setNote('');
    })
  }
  return (
    <Stack
      direction="row"
      border="1px solid"
      borderColor="inherit"
      borderRadius="lg"
      gap={0}
    >
      <Input
        placeholder="Add a note"
        size="sm"
        variant="ghost"
        borderLeftRadius="lg"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        onKeyDown={
          (e) => {
            if (e.key === 'Enter') {
              onAddNote();
            }
          }
        }
      />
      <IconButton
        aria-label="add-note-button"
        size="sm"
        borderRadius="lg"
        variant="ghost"
        onClick={onAddNote}
      >
        <PaperAirplaneIcon width={15} height={15} color="purple" />
      </IconButton>
    </Stack>
  )
}

export const NotesList: FC<{
  parentId: string;
}> = ({ parentId }) => {
  const notesList = useGetNotesByParent(parentId);
  return (
    <Stack mt={4}>
      {
        _.map(
          notesList,
          (note, key) => <Note key={key} note={note} />
        )
      }
    </Stack>
  )
}

const TaskNotes: FC<{
  task: TaskInterface;
}> = ({ task }) => {
  return (
    <Box>
      <Text fontSize="xs" fontWeight="bold" mb={2}>Notes</Text>
      <AddNoteField parentId={task.id} projectId={task.projectId} />
      <NotesList parentId={task.id} />
    </Box>
  )
};

export default TaskNotes;