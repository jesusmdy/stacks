import { FC, Fragment } from 'react';
import { Box, Text, Card, CardBody, CardFooter, Stack, Flex, IconButton } from '@chakra-ui/react';
import { TrashIcon } from '@heroicons/react/20/solid';
import { NoteInterface, useDeleteNote } from '../../../store/notes';
import { db } from '../../../db';

const Note: FC<{
  note: NoteInterface;
}> = ({ note }) => {
  const date = new Date(note.createdAt).toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' });
  const deleteNote = useDeleteNote();

  const handleDeleteNote = () => {
    db.notes.delete(note.id).then(() => {
      deleteNote(note.id)
    })
  };

  return (
    <Box>
      <Card size="sm" variant="inherit" borderRadius="lg">
        <CardBody padding={2}>
          <Flex alignItems="center">
            <Box flex={1}>
              <Text fontSize="xs">{note.content}</Text>
            </Box>
            <IconButton aria-label="delete-note-button" size="xs" onClick={handleDeleteNote}>
              <TrashIcon width={15} height={15} />
            </IconButton>
          </Flex>
        </CardBody>
      </Card>
      <Stack direction="row" fontSize="xs" justifyContent="end" mt={0.5}>
        <Text fontSize="xs" color="gray.500">{date}</Text>
      </Stack>
    </Box>
  )
}

export default Note;