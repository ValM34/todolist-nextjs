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

  verifyCreateProjectForm(project: NewProjectValidation) {
    const title = this.validateTitle(project.title);
    const description = this.validateDescription(project.description);

    const projectVerified: NewProject = {
      title,
      description,
    }
  
    return { success: this.success, errorList: this.errorList, projectVerified };
  }

  verifyUpdateProjectForm(project: UpdateProjectValidation) {
    const title = this.validateTitle(project.title);
    const description = this.validateDescription(project.description);

    const projectVerified: UpdateProject = {
      _id: project._id,
      title,
      description,
    }
  
    return { success: this.success, errorList: this.errorList, projectVerified };
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
}
