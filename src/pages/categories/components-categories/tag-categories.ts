import { Tag } from "../../../components/tag/tag";
import { TextCategories } from "../components-categories/text-categories";
import { allGenres, allMood, allTheme } from "../../../api/api";

export class TagsCategories {
  protected container: HTMLElement;
  
  constructor(id: string, className: string) {
    this.container = document.createElement("div");
    this.container.id = id;
    this.container.className = className;
  }

  render(categorie: string) {
    switch (categorie) {
      case "genre":
        this.renderTags("genre", allGenres);
        this.renderText("genre");
        break;
      case "mood":
        this.renderTags("mood", allMood);
        this.renderText("mood");
        break;
      case "theme":
        this.renderTags("theme", allTheme);
        this.renderText("theme");
        break;
    }
    return this.container;
  }

  renderTags(categorie: string, array: string[]) {
    for (let i = 0; i < array.length; i++) {
      this.container.append(
        new Tag(
          `tag_${categorie + i}`,
          "button",
          "tag",
          `${array[i]}`
        ).render()
      );
    }
  }

  renderText(categorie: string) {
    this.container.append(
      new TextCategories(`text_${categorie}`, "p", "text__categories").render()
    );
  }

  static changeColorBorderTag(categorie: string) {
    const colorBorders = document.getElementById(`tags_${categorie}`);
    const arrTags = colorBorders!.querySelectorAll("button");
    for (let i = 0; i < arrTags.length; i++) {
      arrTags[i].style.border = `2px solid white`;
    }
  }
}
