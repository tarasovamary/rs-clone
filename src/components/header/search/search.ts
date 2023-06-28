import { BaseComponent } from "../../../templates/basecomponent";

export class Search extends BaseComponent {
  constructor() {
    super('div', 'search__container')
    this.element.innerHTML = `
    <div class="search">
      <form action="#search" class="search-bar">
        <input type="text" class="search__input" placeholder="Search.." name="q"/>
        <button type="submit"> <img src=../../assets/images/search.svg></button>
      </form>
    </div>`
  }
  
  render() {
    return this.element;
  }
}