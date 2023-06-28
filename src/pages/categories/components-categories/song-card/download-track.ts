import { BaseComponent } from "../../../../templates/basecomponent";
import { DownloadImg } from "./download-img-track";

export class DownloadTrack extends BaseComponent {

  constructor() {
    super("a", "song__btn_download");
}

  render(link: string) {
    this.element.setAttribute("href", `${link}`)
    this.element.setAttribute("download", "");
    this.element.append(new DownloadImg().render());
    return this.element;
  }

}