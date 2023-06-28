import { UserInfo } from "./types";

export const enum PageIds {
  MainPage = "home",
  Favorite = "favorite",
  Playlist = "playlist",
  PlaylistTrack = "playlist-tracks",
  Profile = "profile",
  Login = "login",
  Categories = "categories",
  Registration = "registration",
  CategoriesGenre = "genre",
  CategoriesMood = "mood",
  CategoriesTheme = "theme",
  Search = "search",
  Album = "album",
}

export abstract class Page {
  protected container: HTMLElement;
  static TextObject = {};
  static currentUser: string =
    "Parse/fHTtYX3oryuYW1MNXV6nvRxfu2xGoRXPu71vYXWH/currentUser";

  constructor(id: string) {
    this.container = document.createElement("div");
    this.container.id = id;
  }
  protected createHeaderTitle(text: string, className?: string): HTMLElement {
    const headerTitle = document.createElement("h1");
    headerTitle.innerText = text;
    if (className) headerTitle.className = className;
    return headerTitle;
  }

  protected getUserFromLocalStorage(): UserInfo | undefined {
    let userParse = localStorage.getItem(`${Page.currentUser}`);
    if (userParse) {
      let objectParsed = JSON.parse(userParse);

      let User: UserInfo = {
        email: objectParsed.email,
        username: objectParsed.username,
        phone: objectParsed.phone,
        id: objectParsed.objectId,
      };
      return User;
    }
  }

  render(): HTMLElement {
    return this.container;
  }
}
