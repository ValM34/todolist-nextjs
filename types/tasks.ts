interface Task {
  id: string;
  title: string;
  status: string;
  emergency: Emergency;
  importance: Importance;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
  description: string | null;
  score: number | undefined;
}

enum Emergency {
  HIGHT = "HIGHT",
  AVERAGE = "AVERAGE",
  LOW = "LOW",
}

enum Importance {
  HIGHT = "HIGHT",
  AVERAGE = "AVERAGE",
  LOW = "LOW",
}

// @TODO revoir cette interface
// Exemple de ce qui serait peut-être mieux : interface TasksList extends Array<Task> {}
interface TasksList {
  tasks: Task[];
}

interface TasksListProps {
  tasks: Task[];
  emergencyFilter: {
    HIGHT: boolean,
    AVERAGE: boolean,
    LOW: boolean,
  }
  statusFilter: {
    aFaire: boolean,
    enCours: boolean,
    terminee: boolean,
  }
  importanceFilter: {
    HIGHT: boolean,
    AVERAGE: boolean,
    LOW: boolean,
  }
}

interface EmergencyFilter {
  [key: string]: boolean;
  HIGHT: boolean;
  AVERAGE: boolean;
  LOW: boolean;
}

interface StatusFilter {
  [key: string]: boolean;
  aFaire: boolean;
  enCours: boolean;
  terminee: boolean;
}

interface ImportanceFilter {
  [key: string]: boolean;
  HIGHT: boolean;
  AVERAGE: boolean;
  LOW: boolean;
}

interface TaskFormProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

interface NewTask {
  title: string;
  description: string;
  status: string;
  emergency: string;
  importance: string;
  projectId: string;
}

interface NewTaskValidation {
  title: string | undefined;
  description: string | undefined;
  status: string | undefined;
  emergency: string | undefined;
  importance: string | undefined;
  project: string | undefined;
}

interface UpdateTask {
  id: string;
  title: string;
  description: string;
  status: string;
  emergency: string;
  importance: string;
  projectId: string;
  score: number | undefined;
}

interface UpdateTaskValidation {
  id: string;
  title: string | undefined;
  description: string | undefined;
  status: string | undefined;
  emergency: string | undefined;
  importance: string | undefined;
  projectId: string | undefined;
}
