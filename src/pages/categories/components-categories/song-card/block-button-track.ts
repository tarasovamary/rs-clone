import { BaseComponent } from "../../../../templates/basecomponent";
import { LikeTrack } from "./like-track";
import { PlayTrack } from "./play-track";
import { DownloadTrack } from "./download-track";

export class BlockButtonTrack extends BaseComponent {
  constructor() {
    super("div", "song__icons");
  }

  render(id: string, link: string) {
    this.element.append(new PlayTrack(id).render());
    this.element.append(new DownloadTrack().render(link));
    this.element.append(new LikeTrack().render());
    return this.element;
  }
}
