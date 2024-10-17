interface Project {
  id: string;
  title: string;
  description: string | null;
  ownerId: string;
  updatedAt: Date;
  createdAt: Date;
}

interface Projects extends Array<Project> {}

interface ModaleProps {
  handleOpenModale: (boolean: boolean) => void;
  openModale: boolean;
  projectToDelete: Project | null;
  handleDeleteProject: (projectId: string) => void;
}

interface NewProject {
  title: string;
  description: string;
}

interface NewProjectValidation {
  title: string | undefined;
  description: string | undefined;
}

interface UpdateProject {
  _id: string;
  title: string;
  description: string;
}
