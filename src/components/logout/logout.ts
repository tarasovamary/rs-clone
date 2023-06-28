import { BaseComponent } from "../../templates/basecomponent";

export class LogOut extends BaseComponent {
  constructor() {
    super("div", "button__logout");
    this.element.innerHTML = `
    <a href="#home"><input type="submit" value="Log In" id="logOut-form-btn"></a>`;
  }

  render() {
    return this.element;
  }

  public logOut() {
    const asideProfileBtn = document.getElementById(
      "aside-Profile"
    ) as HTMLLinkElement;
    this.element.addEventListener("click", (e) => {
      e.preventDefault();

      window.location.hash = "#login";
      localStorage.removeItem(
        "Parse/fHTtYX3oryuYW1MNXV6nvRxfu2xGoRXPu71vYXWH/currentUser"
      );
      asideProfileBtn.href = "#login";
      LogOut.changeBtnLogOut()
    });
  }

public checkLogin() {
  this.element.addEventListener("click", (e) => {
    // console.log('click');
    if(localStorage.getItem(
      "Parse/fHTtYX3oryuYW1MNXV6nvRxfu2xGoRXPu71vYXWH/currentUser"
    )) {
      // console.log('true');
      LogOut.changeBtnLogIn();
    } else if (localStorage.getItem(
      "Parse/fHTtYX3oryuYW1MNXV6nvRxfu2xGoRXPu71vYXWH/currentUser"
    ) === null) {
      // console.log('false');
      LogOut.changeBtnLogOut();
    }
  })
  }

  static changeBtnLogIn() {
    const btn = document.querySelector('#logOut-form-btn') as HTMLInputElement;
    btn.value = 'Log Out';
    btn.style.backgroundColor = 'rgb(233, 112, 104)';
  }

  static changeBtnLogOut() {
    const btn = document.querySelector('#logOut-form-btn') as HTMLInputElement;
    btn.value = 'Log In';
    btn.style.backgroundColor = 'rgb(135, 207, 101)';
  }
}