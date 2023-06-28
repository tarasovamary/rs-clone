import { getTracks, storeTracks } from "../../../api/api";
import { Player } from "../../../components/player/player";
import { BaseComponent } from "../../../templates/basecomponent";

export class PlayPlaylist extends BaseComponent {
  constructor() {
    super("div", "play__playlist");
    this.element.innerHTML = `<img src=${"../../assets/images/play-track.svg"}><span>Play</span>`;
    this.element.addEventListener("click", async (e) => {
      let imgElement = e.currentTarget as HTMLElement;
      let wrapperImg = imgElement.parentNode;
      if (wrapperImg !== null) {
        let songBlock = wrapperImg.parentNode as HTMLElement;
        if (songBlock) Player.borderSongBlock(songBlock);
      }

      let id = `${document
        .getElementsByClassName("song__btn_play")[0]
        .getAttribute("id")}`;
      storeTracks.trackId = Number(id);
      let dataForPlay = await getTracks([storeTracks.trackId]);
      Player.currentTrackIndex = 0;
      Player.startTrack(dataForPlay.results, id);
    });
  }
}
