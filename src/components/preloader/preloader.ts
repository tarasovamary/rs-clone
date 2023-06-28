import { BaseComponent } from "../../templates/basecomponent";

export class Preloader extends BaseComponent {
  constructor() {
    super('div', 'preloader')
    this.element.innerHTML = `<div class="preloader__item"><div></div>
    <div></div><div></div><div></div><div></div><div></div><div></div>
    <div></div><div></div><div></div><div></div><div></div></div>`
  }
  render() {
    return this.element;
  }
}