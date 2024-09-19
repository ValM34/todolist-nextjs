export class ProjectValidationForm {
  constructor(
    public success = true,
    public errorList = {
      title: null as string | null,
      description: null as string | null,
    }
  ) {
    this.success = success;
    this.errorList = errorList;
  }

  verifyCreateProjectForm(project: NewProject) {
    this.validateTitle(project.title);
    this.validateDescription(project.description);
  
    return { success: this.success, errorList: this.errorList, project };
  }

  verifyUpdateProjectForm(project: UpdateProject) {
    this.validateTitle(project.title);
    this.validateDescription(project.description);
  
    return { success: this.success, errorList: this.errorList, project };
  }

  validateTitle(title: string | null) {
    if(title && (title.length < 3 || title.length > 100)) {
      this.errorList.title = "Le titre doit contenir entre 3 et 100 caractères";
      this.success = false;
    }
  }

  validateDescription(description: string | null) {
    if(description && (description.length < 10 || description.length > 500)) {
      this.errorList.description = "La description doit contenir entre 10 et 500 caractères";
      this.success = false;
    }
  }
}
