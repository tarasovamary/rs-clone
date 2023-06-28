import { AlbumCard } from "./card-album";
import { BaseComponent } from "../../../templates/basecomponent";
import { getAlbumsTracks } from "../../../api/api";

export class Album extends BaseComponent {
  private cards: AlbumCard[] = [];
  
  constructor() {
    super('div', 'albums__container keen-slider');
  }

  clear() {
    this.cards = [];
    this.element.innerHTML = '';
  }
 
  addCards(cards: AlbumCard[]) {
    this.cards = cards;
    this.cards.forEach((card) => this.element.append(card.element))
  }

  openAlbum(cards: AlbumCard[]) {
    this.cards = cards;
    this.cards.forEach((card) => {
      card.element.addEventListener('click', async () => {
        const idAlbum = card.element.children[0].id;
        await getAlbumsTracks(idAlbum);
        window.location.hash = "#album";
        })
      })
  }
}