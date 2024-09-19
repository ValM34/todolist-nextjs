interface Task {
  _id: string;
  title: string;
  completed: string;
  emergency: string;
  importance: string;
  project: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  score: number;
  user: string;
}

// @TODO revoir cette interface
// Exemple de ce qui serait peut-être mieux : interface TasksList extends Array<Task> {}
interface TasksList {
  tasks: Task[];
}

interface TasksListProps {
  tasks: Task[];
  emergencyFilter: {
    forte: boolean,
    moyenne: boolean,
    faible: boolean,
  }
  completedFilter: {
    aFaire: boolean,
    enCours: boolean,
    terminee: boolean,
  }
  importanceFilter: {
    forte: boolean,
    moyenne: boolean,
    faible: boolean,
  }
}

interface EmergencyFilter {
  [key: string]: boolean;
  forte: boolean;
  moyenne: boolean;
  faible: boolean;
}

interface CompletedFilter {
  [key: string]: boolean;
  aFaire: boolean;
  enCours: boolean;
  terminee: boolean;
}

interface ImportanceFilter {
  [key: string]: boolean;
  forte: boolean;
  moyenne: boolean;
  faible: boolean;
}

interface TaskFormProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

interface NewTask {
  title: string;
  description: string;
  completed: string;
  emergency: string;
  importance: string;
  project: string;
}

interface NewTaskValidation {
  title: string | undefined;
  description: string | undefined;
  completed: string | undefined;
  emergency: string | undefined;
  importance: string | undefined;
  project: string | undefined;
}

interface UpdateTask {
  _id: string;
  title: string;
  description: string;
  completed: string;
  emergency: string;
  importance: string;
  project: string;
}

interface UpdateTaskValidation {
  _id: string;
  title: string | undefined;
  description: string | undefined;
  completed: string | undefined;
  emergency: string | undefined;
  importance: string | undefined;
  project: string | undefined;
}
