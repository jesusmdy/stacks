'use client'
import { redirect } from 'next/navigation';
import { FC, useEffect } from 'react';

const Project: FC<{ params: { projectId: string } }> = ({ params }) => {

  useEffect(() => {
    redirect(`/projects/${params.projectId}/list`);
  }, []);

  return null;
};

export default Project;