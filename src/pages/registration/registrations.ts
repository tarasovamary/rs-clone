import { Page } from "../../templates/pages";
import { UserInfo } from "../../templates/types";
const Parse = require("parse");

export class RegistrationPage extends Page {
  mainBlock = document.createElement("div");
  errorBlock = document.createElement("div");
  registrationSpan = document.createElement("span");
  title = document.createElement("div");
  form = document.createElement("form");
  constructor(id: string) {
    super(id);
    this.mainBlock.className = "profile-wrapper";
    this.title.innerHTML = '<h2 class="h2">Registration</h2>';
    this.registrationSpan.innerHTML = `<span class="registration-span">have an account? <a href="#login" style="color: green;">please Login</a></span>`;
    this.form.className = "form";
    this.form.id = "registr-form";
  }

  protected drawRegistrationBlock(): HTMLElement {
    this.form.innerHTML = `
    <span class="form-span">Email</span>
    <input name="email" type="text" id="registr-email" class="form-input" placeholder="login">

    <span class="form-span">Username</span>
    <input name="username" type="text" id="registr-login" class="form-input" placeholder="login">

    <span class="form-span">Password</span>
    <input name="password" type="password" id="registr-password" class="form-input" placeholder="password">

    <span class="form-span">Confirm Password</span>
    <input name="confirm-password" type="password" id="registr-confirm" class="form-input" placeholder="password">

    <span class="form-span">Change Phone Number</span>
    <input name="phone" type="tel" id="registr-phone" class="form-input" placeholder="phone number">

    <input type="submit" value="Sign in" id="regist-form-btn">
    `;
    this.mainBlock.append(this.title);
    this.mainBlock.append(this.form);
    this.mainBlock.append(this.errorBlock);
    this.mainBlock.append(this.registrationSpan);

    return this.mainBlock;
  }

  public render(): HTMLElement {
    const block = this.drawRegistrationBlock();
    this.container.append(block);
    this.addEvent();
    return this.container;
  }

  private async registrationUser(userObject: UserInfo) {
    const user = new Parse.User();
    try {
      if (userObject.password === userObject.confirmPass) {

        const { confirmPass: _, ...userObjectWitoutConfirm } = userObject;

        const userValues = Object.entries(userObjectWitoutConfirm);

        userValues.forEach((el) => {
          user.set(`${el[0]}`, `${el[1]}`);
        });
        
        let userResult = await user.signUp();
        console.log('succsess: ',userResult);
        window.location.hash = "profile";
        const profileLink = document.getElementById(
          "aside-Profile"
        ) as HTMLLinkElement;
        profileLink.href = "#profile";
      } else this.addErrorSpan({"message": "passwords don't match"});
    } catch (error: any) {
      this.addErrorSpan(error);
      console.error("Error while signing up user", error);
    }
  }

  private addErrorSpan(error: { message: string; }) {
    const spanError = document.createElement("span");
    this.errorBlock.innerHTML = "";
    spanError.innerHTML = `<span class="error-span">${error.message}</span>`;
    this.errorBlock.append(spanError);
  }

  public addEvent() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(this.form);

      const userObject = {
        email: `${formData.get("email") as FormDataEntryValue}`,
        username: `${formData.get("username") as FormDataEntryValue}`,
        password: `${formData.get("password") as FormDataEntryValue}`,
        confirmPass: `${
          formData.get("confirm-password") as FormDataEntryValue
        }`,
        phone: Number(formData.get("phone") as FormDataEntryValue),
      };
      this.registrationUser(userObject);
    });
  }
}
