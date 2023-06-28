import { CardTrack } from "./card-track";
import { BaseComponent } from "../../../templates/basecomponent";

export class Recomend extends BaseComponent {
  private cards: CardTrack[] = [];
  
  constructor() {
    super('div', 'recomend__container');
  }

  clear() {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: CardTrack[]) {
    this.cards = cards;
    this.cards.forEach((card) => this.element.append(card.element))
  }
}