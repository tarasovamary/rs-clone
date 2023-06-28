import { BaseComponent } from "../../templates/basecomponent";
import { SongCard } from "../categories/components-categories/song-card/song-card";

export class AlbumTracks extends BaseComponent {
  private cards: SongCard[] = [];

  constructor () {
    super('div', 'albums-tracks__container');
  }

  addCards(cards: SongCard[]) {
    this.cards = cards;
    this.cards.forEach((card) => this.element.append(card.element))
  }
}