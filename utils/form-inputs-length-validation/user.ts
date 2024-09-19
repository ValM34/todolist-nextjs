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

  verifyCreateUserForm(user: NewUser) {
    this.validateEmail(user.email);
    this.validatePassword(user.password);
    this.validateFirstName(user.firstName);
    this.validateLastName(user.lastName);
    this.validateConfirmPassword(user.password, user.confirmPassword);
  
    return { success: this.success, errorList: this.errorList, user };
  }

  verifyUpdateProfilForm(user: UpdateUser) {
    this.validateFirstName(user.firstName);
    this.validateLastName(user.lastName);
  
    return { success: this.success, errorList: this.errorList, user };
  }

  verifyAuthUserForm(user: AuthUser) {
    this.validateEmail(user.email);
    this.validatePassword(user.password);
  
    return { success: this.success, errorList: this.errorList, user };
  }

  validateEmail(email: string | null) {
    const emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
    if(email && !emailRegex.test(email)) {
      this.errorList.email = "L'email est invalide";
      this.success = false;
    }
  }

  validatePassword(password: string | null) {
    const passwordRegex = new RegExp("^[a-zA-Z0-9_-]{10,}$");
    if(password && !passwordRegex.test(password)) {
      this.errorList.password = "Le mot de passe doit contenir entre 10 et 100 caractères. Caractères valides : lettres minuscules, lettres majuscules, chiffres, tirets ( - ) et underscores ( _ ).";
      this.success = false;
    }
  }

  validateFirstName(firstName: string | null) {
    if(firstName && (firstName.length < 2 || firstName.length > 50)) {
      this.errorList.firstName = "Le prénom doit contenir entre 2 et 50 caractères";
      this.success = false;
    }
  }

  validateLastName(lastName: string | null) {
    if(lastName && (lastName.length < 2 || lastName.length > 100)) {
      this.errorList.lastName = "Le nom doit contenir entre 2 et 100 caractères";
      this.success = false;
    }
  }

  validateConfirmPassword(confirmPassword: string | null, password: string | null) {
    if(confirmPassword && password !== confirmPassword) {
      this.errorList.confirmPassword = "Les mots de passe sont différents";
      this.success = false;
    }
  }
}
