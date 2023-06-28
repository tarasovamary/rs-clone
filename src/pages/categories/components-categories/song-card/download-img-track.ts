import { BaseComponent } from "../../../../templates/basecomponent";

export class DownloadImg extends BaseComponent {
  constructor() {
    super("img", "song__btn_play");
    let src: string = "../../assets/images/download-track.svg";
    this.element.setAttribute("src", src);
}

  render() {
    return this.element;
  }
}