import { Page } from "../../../templates/pages";
import { Aside } from "../../../components/Aside/aside";
import { TagsCategories } from "../components-categories/tag-categories";
import { SongCard } from "../components-categories/song-card/song-card";
import { RecomendCategorie } from "../components-categories/song-card/recomend-categories";
import { getTracksByTag } from "../../../api/api";
import { storeTrackCategorie } from "../../../api/api";
import { Player } from "../../../components/player/player";

export class CategoriesThemePage extends Page {
  private readonly recomendCategorieContainer: RecomendCategorie;
  tagsCateg: TagsCategories;

  static TextObject = {
    MainTitle: "THEME",
  };

  constructor(id: string) {
    super(id);
    this.recomendCategorieContainer = new RecomendCategorie();
    this.tagsCateg = new TagsCategories("tags_theme", "tags__categories");
    this.container.addEventListener("click", (e) => {
      if ((<HTMLInputElement>e.target).classList.contains("tag")) {
        // TagsCategories.changeColorBorderTag("theme");
        // (<HTMLInputElement>e.target).style.border = `2px solid white`;
        const arrGenre = [];
        const titleCateg = [];
        const categorie = (<HTMLInputElement>e.target).innerText;
        titleCateg.push(categorie);
        arrGenre.push(this.selectionTag(categorie));
        this.getRecomendationGenre(arrGenre, titleCateg);
      }
    });
  }

  render(): HTMLElement {
    Aside.renderCategoriesBtns(true);
    const title = this.createHeaderTitle(
      CategoriesThemePage.TextObject.MainTitle
    );
    this.container.append(title);
    this.container.append(this.tagsCateg.render("theme"));
    this.getRecomendationGenre(["Vlog"], ["Music for Vlog"]);
    this.container.append(this.recomendCategorieContainer.element);
    return this.container;
  }

  async getRecomendationGenre(categ: string[], titleCateg: string[]) {
    const data = await getTracksByTag(categ, 12);
    this.newRecomendation(titleCateg);
  }

  newRecomendation(titleCateg: string[]) {
    let tracks = storeTrackCategorie.tracks;
    Player.getArray(tracks);
    const cards = tracks.map(
      (el) =>
        new SongCard(
          el.id,
          el.image,
          el.artist_name,
          el.name,
          el.releasedate,
          el.audiodownload
        )
    );
    this.recomendCategorieContainer.clear();
    this.recomendCategorieContainer.addCards(cards, titleCateg);
  }

  selectionTag(categorie: string) {
    let tempCategorie: string = "";
    switch (categorie) {
      case "Music for Vlog":
        tempCategorie = "Vlog";
        break;
      case "Music for Film":
        tempCategorie = "Film";
        break;
      case "Cinematic Music":
        tempCategorie = "Cinematic";
        break;
      case "Music for Podcast":
        tempCategorie = "Podcast";
        break;
      case "Background Music":
        tempCategorie = "Background";
        break;
    }
    return tempCategorie;
  }
}
