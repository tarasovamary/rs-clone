import { SongCard } from "./song-card";
import { BaseComponent } from "../../../../templates/basecomponent";

export class RecomendCategorie extends BaseComponent {
    private cards: SongCard[] = [];

    
    constructor() {
      super('div', 'recomend__cotegorie_container');
    }
  
    clear() {
      this.cards;
      this.element.innerHTML = '';
    }
  
    addCards(cards: SongCard[], categ: string[]) {
      this.cards = cards;
      let titleCategorie = ""
      categ.map((el) => titleCategorie = titleCategorie + " • "+ el);
       this.element.innerHTML = `<div class="title__categorie">${titleCategorie} •</div>`;
      this.cards.forEach((card) => this.element.append(card.element))
    }
  }