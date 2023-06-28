export class BaseComponent {
  [x: string]: any;
  readonly element: HTMLElement;
  readonly inputElement: HTMLInputElement;

  constructor(
    tagName: keyof HTMLElementTagNameMap = "div",
    className: string,
    innerText?: string,
    id?: string
  ) {
    this.element = document.createElement(tagName) as HTMLElement;
    this.element.className = className;
    this.inputElement =  document.createElement(tagName) as HTMLInputElement;
    if (innerText) this.element.innerText = innerText;
    if (id) this.element.id = id;
  }
}
