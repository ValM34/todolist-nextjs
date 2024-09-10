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
}

// @TODO revoir cette interface
// Exemple de ce qui serait peut-être mieux : interface TasksList extends Array<Task> {}
interface TasksList {
  tasks: Task[];
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
