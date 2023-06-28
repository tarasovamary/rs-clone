import { Component } from "../../templates/components";

const Language = [
  {
    id: "en",
    text: "En",
  },
  {
    id: "ru",
    text: "Ru",
  },
]

export class Translate extends Component {
  switchLang: HTMLElement;
  static langOption = document.createElement("option");
  constructor() {
    super("div", "switch_lang");
    this.switchLang = document.createElement("select");
    this.switchLang.className = "select_lang";
    Language.forEach((lang) => {
      Translate.langOption.append(this.switchLang);
      Translate.langOption.innerText = `${lang.text}`;
      Translate.langOption.id = `${lang.id}`;
    })
  }

  public render() {
    this.container.append(this.switchLang);
    return this.container;
  }
}