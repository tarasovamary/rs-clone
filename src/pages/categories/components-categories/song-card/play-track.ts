import { BaseComponent } from "../../../../templates/basecomponent";
import { getTracks } from "../../../../api/api";
import { storeTracks } from "../../../../api/api";
import { Player } from "../../../../components/player/player";

export class PlayTrack extends BaseComponent {
  constructor(id: string) {
    super("img", "song__btn_play");
    this.element.id = id;
    let src: string = "../../assets/images/play-track.svg";
    this.element.setAttribute("src", src);
    this.element.addEventListener("click", async (e) => {
      let imgElement = e.currentTarget as HTMLElement;
      let wrapperImg = imgElement.parentNode;
      if (wrapperImg !== null) {
        let songBlock = wrapperImg.parentNode as HTMLElement;
        if (songBlock) Player.borderSongBlock(songBlock);
      }

      storeTracks.trackId = Number(id);
      let dataForPlay = await getTracks([storeTracks.trackId]);
      Player.startTrack(dataForPlay.results, id);
    });
  }

  render() {
    return this.element;
  }
}
