import { BaseComponent } from "../../../templates/basecomponent";

export class TextCategories extends BaseComponent {
  constructor(
    id: string,
    tagName: keyof HTMLElementTagNameMap,
    className: string,
    innerText?: string
  ) {
    super(tagName, className, innerText);
    this.element.id = id;
  }

  render() {
    this.element.innerText = `This is a music recommendation with the genre that you can listen to and download for free. (Free Music List only links and creates alternative links from copyright-free music on the internet)`;
    return this.element;
  }
}

