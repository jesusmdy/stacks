import { FC } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { ProjectOverview, ProjectTags } from '../../../../components/ProjectPage/Overview';
import { ProjectTaskStatus } from '../../../../components/ProjectPage/Overview/ProjectStatus';

const Project: FC = () => {
  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={4} p={4}>
      <GridItem colSpan={6} display="flex" flexDir="column" gap={4}>
        <ProjectOverview />
        <ProjectTaskStatus />
      </GridItem>
      <GridItem colSpan={3}>
        <ProjectTags />
      </GridItem>
    </Grid>
  );
};

export default Project;