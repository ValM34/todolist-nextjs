export class TaskValidationForm {
  constructor(
    public success = true,
    public errorList = {
      title: null as string | null,
      description: null as string | null,
      completed: null as string | null,
      emergency: null as string | null,
      importance: null as string | null,
      project: null as string | null
    }
  ) {
    this.success = success;
    this.errorList = errorList;
  }

  verifyCreateTaskForm(task: NewTaskValidation) {
    const title = this.validateTitle(task.title);
    const description = this.validateDescription(task.description);
    const completed = this.validateCompleted(task.completed);
    const emergency = this.validateEmergency(task.emergency);
    const importance = this.validateImportance(task.importance);
    const project = this.validateProject(task.project);

    const taskVerified: NewTask = {
      title,
      description,
      completed,
      emergency,
      importance,
      project,
    }
  
    return { success: this.success, errorList: this.errorList, taskVerified };
  }

  verifyUpdateTaskForm(task: UpdateTaskValidation) {
    const title = this.validateTitle(task.title);
    const description = this.validateDescription(task.description);
    const completed = this.validateCompleted(task.completed);
    const emergency = this.validateEmergency(task.emergency);
    const importance = this.validateImportance(task.importance);
    const project = this.validateProject(task.project);

    const taskVerified: UpdateTask = {
      _id: task._id,
      title,
      description,
      completed,
      emergency,
      importance,
      project,
    }
  
    return { success: this.success, errorList: this.errorList, taskVerified };
  }

  validateTitle(title: string | undefined): string {
    if(!title){
      this.errorList.title = "Le titre est obligatoire";
      this.success = false;
      return title = "";
    }
    
    if(title.length < 3 || title.length > 100) {
      this.errorList.title = "Le titre doit contenir entre 3 et 100 caractères";
      this.success = false;
    }

    return title;
  }

  validateDescription(description: string | undefined): string {
    if(!description){
      return description = "";
    }

    if(description.length > 500) {
      this.errorList.description = "La description doit contenir au maximum 500 caractères";
      this.success = false;
    }

    return description;
  }

  validateCompleted(completed: string | undefined): string {
    if(!completed){
      this.errorList.completed = "Le statut est obligatoire";
      this.success = false;
      return completed = "";
    }

    return completed;
  }

  validateEmergency(emergency: string | undefined): string {
    if(!emergency){
      this.errorList.emergency = "L'urgence est obligatoire";
      this.success = false;
      return emergency = "";
    }

    return emergency;
  }

  validateImportance(importance: string | undefined): string {
    if(!importance){
      this.errorList.importance = "L'importance est obligatoire";
      this.success = false;
      return importance = "";
    }

    return importance;
  }

  validateProject(project: string | undefined): string {
    if(!project){
      this.errorList.project = "Le projet est obligatoire";
      this.success = false;
      return project = "";
    }

    return project;
  }
}
