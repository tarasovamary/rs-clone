import { Page } from "../../templates/pages";
import { App } from "../../app/app";
import { Player } from "../../components/player/player";
import { getMoreTracks } from "../../api/api";
import { SongCard } from "../categories/components-categories/song-card/song-card";
import { RootObject } from "../../templates/types";

export class FavoritePage extends Page {
  static resultsFromServer: RootObject[];
  static arrayOfCards: SongCard[];
  static TextObject = {
    MainTitle: "Favorite tracks",
  };

  constructor(id: string) {
    super(id);
  }

  render(): HTMLElement {
    if (
      localStorage.getItem(
        "Parse/fHTtYX3oryuYW1MNXV6nvRxfu2xGoRXPu71vYXWH/currentUser"
      )
    ) {
      setTimeout(FavoritePage.renderTracks, 0);
    }

    const title = this.createHeaderTitle(
      FavoritePage.TextObject.MainTitle,
      "favorites__title"
    );
    this.container.append(title);
    return this.container;
  }

  static renderTracks = async () => {
    const serachBlock = App.mainWrapper.children[1] as HTMLElement;
    let findTracksIds: string[] = Player.arrayOfUser.join(",").split("");
    findTracksIds.forEach((el) => {
      if (el === ",") {
        findTracksIds[findTracksIds.indexOf(el)] = "+";
      }
    });
    if (findTracksIds.length > 0) {
      let requestAnswer = await getMoreTracks(findTracksIds.join(""));
      let results = requestAnswer.results;
      let arrayOfElements: SongCard[] = [];
      FavoritePage.resultsFromServer = results;
      results.map((el: RootObject) => {
        let card = new SongCard(
          el.id,
          el.image,
          el.artist_name,
          el.name,
          el.releasedate,
          el.audiodownload
        );
        console.log(card);
        arrayOfElements.push(card);
      });
      FavoritePage.arrayOfCards = arrayOfElements;
      Player.getArray(results);
      createCard(FavoritePage.arrayOfCards, serachBlock);
      FavoritePage.deleteTrack();
    }
  };

  static deleteTrack() {
    FavoritePage.arrayOfCards.forEach((el) => {
      const likeImage = el.element.children[2].children[2] as HTMLElement;
      likeImage.addEventListener("click", () => {
        const card = likeImage.parentElement?.parentElement as HTMLElement;
        let currentId: string | null = card.getAttribute("data-item-id");
        let indexOfTrack: number;
        if (currentId) {
          indexOfTrack = Player.arrayOfUser.findIndex((el) => el === currentId);
          Player.arrayOfUser.splice(1, indexOfTrack);
          Player.onloadTrackList(Player.arrayOfUser);
          card.style.display = "none";
        }
      });
    });
  }
}

function createCard(array: SongCard[], serachBlock: HTMLElement) {
  let count: number = 0;
  array.forEach((el) => {
    el.element.setAttribute(
      "data-item-id",
      FavoritePage.resultsFromServer[count].id
    );
    const likeBlock = el.element.children[2].children[2] as HTMLImageElement;
    let infoBlock = el.element.children[1] as HTMLElement;
    let panelBlock = el.element.children[2] as HTMLElement;
    panelBlock.classList.add("favorite__panel");
    infoBlock.style.flex = "1 0 auto";
    likeBlock.src = "../../assets/images/like.svg";
    //likeBlock.style.display = "none";
    el.element.classList.add("favorite__card");
    serachBlock.append(el.element);
    count++;
  });
}
