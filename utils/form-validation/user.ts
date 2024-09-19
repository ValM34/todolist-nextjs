export class UserValidationForm {
  constructor(
    public success = true,
    public errorList = {
      email: null as string | null,
      password: null as string | null,
      firstName: null as string | null,
      lastName: null as string | null,
      confirmPassword: null as string | null
    }
  ) {
    this.success = success;
    this.errorList = errorList;
  }

  verifyCreateUserForm(user: NewUserValidation) {
    const firstName = this.validateFirstName(user.firstName);
    const lastName = this.validateLastName(user.lastName);
    const email = this.validateEmail(user.email);
    const password = this.validatePassword(user.password);
    const confirmPassword = this.validateConfirmPassword(user.password, user.confirmPassword);

    const userVerified: NewUser = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    }
  
    return { success: this.success, errorList: this.errorList, userVerified };
  }

  verifyUpdateProfilForm(user: UpdateUserValidation) {
    const firstName = this.validateFirstName(user.firstName);
    const lastName = this.validateLastName(user.lastName);

    const userVerified: UpdateUser = {
      firstName,
      lastName
    }
  
    return { success: this.success, errorList: this.errorList, userVerified };
  }

  verifyAuthUserForm(user: AuthUserValidation) {
    const email = this.validateEmail(user.email);
    const password = this.validatePassword(user.password);

    const userVerified: AuthUser = {
      email,
      password
    }
  
    return { success: this.success, errorList: this.errorList, userVerified };
  }

  validateEmail(email: string | undefined) : string {
    if(!email) {
      this.errorList.email = "L'email est obligatoire";
      this.success = false;
      return email = "";
    }

    const emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
    if(email && !emailRegex.test(email)) {
      this.errorList.email = "L'email est invalide";
      this.success = false;
    }

    return email;
  }

  validatePassword(password: string | undefined) : string {
    if(!password) {
      this.errorList.password = "Le mot de passe est obligatoire";
      this.success = false;
      return password = "";
    }

    const passwordRegex = new RegExp("^[a-zA-Z0-9_-]{10,}$");
    if(password && !passwordRegex.test(password)) {
      this.errorList.password = "Le mot de passe doit contenir entre 10 et 100 caractères. Caractères valides : lettres minuscules, lettres majuscules, chiffres, tirets ( - ) et underscores ( _ ).";
      this.success = false;
    }

    return password;
  }

  validateFirstName(firstName: string | undefined): string {
    if(!firstName){
      this.errorList.firstName = "Le prénom est obligatoire";
      this.success = false;
      return firstName = "";
    }

    if(firstName.length < 2 || firstName.length > 50) {
      this.errorList.firstName = "Le prénom doit contenir entre 2 et 50 caractères";
      this.success = false;
    }

    return firstName;
  }

  validateLastName(lastName: string | undefined) : string {
    if(!lastName){
      this.errorList.lastName = "Le nom est obligatoire";
      this.success = false;
      return lastName = "";
    }

    if(lastName.length < 2 || lastName.length > 100) {
      this.errorList.lastName = "Le nom doit contenir entre 2 et 100 caractères";
      this.success = false;
    }

    return lastName;
  }

  validateConfirmPassword(confirmPassword: string | undefined, password: string | undefined) : string {
    if(!confirmPassword) {
      this.errorList.confirmPassword = "La confirmation du mot de passe est obligatoire";
      this.success = false;
      return confirmPassword = "";
    }

    if(password !== confirmPassword) {
      this.errorList.confirmPassword = "Les mots de passe sont différents";
      this.success = false;
    }

    return confirmPassword;
  }
}
