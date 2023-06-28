import { BaseComponent } from "../../templates/basecomponent";

export class Tag extends BaseComponent {
  constructor(
    id: string,
    tagName: keyof HTMLElementTagNameMap,
    className: string,
    innerText?: string
  ) {
    super(tagName, className, innerText);
    this.element.id = id;
    this.element.style.background = this.randomColor();
  }

  render() {
    return this.element;
  }

  randomColor() {
    const red = Tag.randomInt(140, 255);
    const green = Tag.randomInt(50, 250);
    const blue = Tag.randomInt(0, 240);
    return "rgb(" + red + "," + green + "," + blue + ")";
  }

  static randomInt(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}
