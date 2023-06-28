import { Page } from "../../templates/pages";
import { CategoriesGenrePage } from "./categories-genre/categories-genre";

export class CategoriesPage extends Page {
  constructor(id: string) {
    super(id);
  }

  render(): HTMLElement {
    this.container.append(new CategoriesGenrePage("genre").render());
    return this.container;
  }
}
