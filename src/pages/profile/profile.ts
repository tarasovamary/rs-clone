import { Page } from "../../templates/pages";
import { UserInfo } from "../../templates/types";
const Parse = require("parse");

type settingsFormUser = {
  username: string;
  password: string;
  confirmPass: string;
  phone: number;
  email: string;
};

export class ProfilePage extends Page {
  mainBlock = document.createElement("div") as HTMLElement;
  errorBlock = document.createElement("div") as HTMLElement;
  title = document.createElement("div") as HTMLElement;
  form = document.createElement("form") as HTMLFormElement;
  logOutBtn = document.createElement("div") as HTMLElement;

  constructor(id: string) {
    super(id);
    this.mainBlock.className = "profile-wrapper";

    this.title.className = "userBlock__title-wrap";
    this.title.innerHTML =
      '<h2 class="userBlock__h2" id="spoiler-settings-wrap">Settings <span id="spoiler-settings">∨</span></h2>';

    this.form.className = "form";
    this.form.id = "settings-form";
  }

  public render(): HTMLElement {
    const block = this.drawUserBlock();
    this.container.append(block);
    this.showEventSettingsBlock();
    this.changeSettingsByForm();
    return this.container;
  }

  protected drawUserBlock(): HTMLElement {
    this.mainBlock.append(this.createUserInfo());
    this.mainBlock.append(this.title);
    this.mainBlock.append(this.createForm());
    this.mainBlock.append(this.errorBlock);
    return this.mainBlock;
  }

  protected createForm(): HTMLElement {
    this.form.innerHTML = `
    <span class="form-span">Change Username</span>
    <input name="username" type="text" id="settings-login" class="form-input" placeholder="Username">

    <span class="form-span">Change Password</span>
    <input name="password" type="password" id="settings-password" class="form-input" placeholder="password">

    <span class="form-span">Confirm Password</span>
    <input name="confirm-password" type="password" id="settings-confirm" class="form-input" placeholder="password">

    <span class="form-span">Change Phone Number</span>
    <input name="phone" minlength="6" type="tel" id="settings-number" class="form-input" placeholder="phone number">\

    <span class="form-span">Change email</span>
    <input name="email" type="text" id="settings-number" class="form-input" placeholder="new email">

    <input type="submit" value="Update" id="settings-form-btn">
    `;
    return this.form;
  }

  protected createUserInfo(): HTMLElement {
    const userBlock = document.createElement("div");
    const userInfo: UserInfo | undefined = this.getUserFromLocalStorage();
    userBlock.className = "userBlock__wrapper";
    userBlock.innerHTML = `
    <div class="userBlock__user-title"><h2 class="userBlock__h2">Profile</h2></div>
    <div id="profile-flex">
      <div id="profile-img"><img src="assets/images/user.svg"></div>
      <div class="userBlock">
        <div class="userBlock__user-name"><h2>${userInfo?.username}</h2></div>
        <div class="userBlock__user-email"><h2>${userInfo?.email}</h2></div>
        <div class="userBlock__user-tel"><h2>${userInfo?.phone}</h2></div>
      </div>
    </div>
      `;
    return userBlock;
  }

  private changeSettingsByForm() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(this.form);
      const userObject: settingsFormUser = {
        username: `${formData.get("username") as FormDataEntryValue}`,
        password: `${formData.get("password") as FormDataEntryValue}`,
        confirmPass: `${
          formData.get("confirm-password") as FormDataEntryValue
        }`,
        phone: Number(formData.get("phone") as FormDataEntryValue),
        email: `${formData.get("email") as FormDataEntryValue}`,
      };
      this.changeUserInfo(userObject);
    });
  }

  private showEventSettingsBlock() {
    const settingsBtn = this.title.children[0] as HTMLElement;
    const spoiler = settingsBtn.children[0] as HTMLElement;

    settingsBtn.addEventListener("click", () => {
      if (spoiler.textContent === `∨`) {
        this.form.style.display = "flex";
        spoiler.textContent = "∧";
      } else {
        this.form.style.display = "none";
        spoiler.textContent = "∨";
      }
    });
  }

  private addErrorSpan(message: string): void {
    const spanError = document.createElement("span");
    this.errorBlock.innerHTML = "";
    spanError.innerHTML = `<span class="error-span">${message}</span>`;
    this.errorBlock.append(spanError);
  }

  private async changeUserInfo(UserFromForm: settingsFormUser) {
    const User = new Parse.User();
    const query = new Parse.Query(User);
    const CurrentUser = this.getUserFromLocalStorage();
    if (UserFromForm.password === UserFromForm.confirmPass) {
      try {
        let user = await query.get(`${CurrentUser?.id}`);
        if (UserFromForm.username) user.set("username", UserFromForm.username);
        if (UserFromForm.phone) user.set("phone", UserFromForm.phone);
        if (UserFromForm.password) user.set("password", UserFromForm.password);
        if (UserFromForm.email) user.set("email", UserFromForm.email);
        try {
          let response = await user.save();
          const oldInfoBlock = this.mainBlock.firstChild;
          if (oldInfoBlock) this.mainBlock.removeChild(oldInfoBlock)
          this.mainBlock.insertBefore(
            this.createUserInfo(),
            this.mainBlock.firstChild
          );
          this.errorBlock.innerHTML = "";
          this.mainBlock.append(this.createForm());
          console.log("Updated user", response);
        } catch (error: any) {
          console.error("Error while updating user", error);
        }
      } catch (error: any) {
        console.error("Error while retrieving user", error);
      }
    } else {
      this.addErrorSpan(`Passwords don't match`);
    }
  }
}
