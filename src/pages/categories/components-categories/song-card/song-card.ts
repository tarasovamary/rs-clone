import { BaseComponent } from "../../../../templates/basecomponent";
import { BlockButtonTrack } from "./block-button-track";
import { Player } from "../../../../components/player/player";

export class SongCard extends BaseComponent {
  constructor(
    id: string,
    image: string,
    artistName: string,
    songName: string,
    releaseDate: string,
    link: string
  ) {
    super("div", "song");
    this.element.innerHTML = `
      <div class="song__image" style="background-image: url(${image})"></div>
      <div class="song__info" data-item-id="${id}">
      <div class="song__name_artist">${artistName}</div>
      <div class="song__name_track">${songName}</div>
      <div class="song__releasedate">${releaseDate}</div>
      </div>
    `;
    this.element.append(new BlockButtonTrack().render(id, link));
    const infoBlock = this.element.children[1] as HTMLElement;
    const likeBlock = infoBlock.nextElementSibling
      ?.children[2] as HTMLImageElement;
    let idOfCard: string | null = infoBlock?.getAttribute("data-item-id");
    if (idOfCard) {
      if (Player.arrayOfUser) {
        let likedTrackByUser: string | undefined = Player.arrayOfUser.find(
          (el) => {
            return el === idOfCard?.toString();
          }
        );
        if (likedTrackByUser) {
          likeBlock.src = "../../../../assets/images/like.svg";
        }
      }
    }
  }
}
