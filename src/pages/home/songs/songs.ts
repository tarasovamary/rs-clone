import { SongCard } from "../../categories/components-categories/song-card/song-card";
import { BaseComponent } from "../../../templates/basecomponent";

export class Songs extends BaseComponent {
    private cards: SongCard[] = [];

    
    constructor() {
      super('div', 'songs__container');
    }
  
    clear() {
      this.cards;
      this.element.innerHTML = '';
    }
  
    addCards(cards: SongCard[]) {
      this.cards = cards;
      this.cards.forEach((card) => this.element.append(card.element))
    }
  }