import { HomePage } from "../pages/home/home";
import { Page } from "../templates/pages";
import { PageIds } from "../templates/pages";
import { Aside } from "../components/Aside/aside";
import { FavoritePage } from "../pages/favorite/favorite";
import { CategoriesPage } from "../pages/categories/categories";
import { CategoriesGenrePage } from "../pages/categories/categories-genre/categories-genre";
import { CategoriesMoodPage } from "../pages/categories/categories-mood/categories-mood";
import { CategoriesThemePage } from "../pages/categories/categories-theme/categories-theme";
import { PlaylistPage } from "../pages/playlist/playlist";
import { LoginPage } from "../pages/logIn/logIn";
import { RegistrationPage } from "../pages/registration/registrations";
import { ProfilePage } from "../pages/profile/profile";
import { Header } from "../components/header/header";
import { Player } from "../components/player/player";
import { Theme } from "../components/theme/theme";
import { SearchPage } from "../pages/search/search-page";
import { PlaylistTrack } from "../pages/playlist/playlist-tracks/playlist-tracks";
import { AlbumPage } from "../pages/albums/albums-page";

export class App {
  static container: HTMLElement = document.createElement("div");
  static mainWrapper: HTMLElement = document.createElement("section");
  private homePage: HomePage;
  static aside: Aside;
  private player: Player;
  private playlistTrack: PlaylistTrack;
  private favoritePage: FavoritePage;
  private categoriesPage: CategoriesPage;
  private categoriesGenrePage: CategoriesGenrePage;
  private categoriesMoodPage: CategoriesMoodPage;
  private categoriesThemePage: CategoriesThemePage;
  private playlistPage: PlaylistPage;
  private loginPage: LoginPage;
  private registrationPage: RegistrationPage;
  private profilePage: ProfilePage;
  private header: Header;
  private searchPage: SearchPage;
  private albumPage: AlbumPage;
  private currentUser: string =
    "Parse/fHTtYX3oryuYW1MNXV6nvRxfu2xGoRXPu71vYXWH/currentUser";

  constructor() {
    this.homePage = new HomePage("home-page");
    App.aside = new Aside("aside", "aside");
    this.playlistTrack = new PlaylistTrack("playlist-track");
    this.favoritePage = new FavoritePage("favorite");
    this.categoriesPage = new CategoriesPage("categories");
    this.categoriesGenrePage = new CategoriesGenrePage("categorie-genre");
    this.categoriesMoodPage = new CategoriesMoodPage("categorie-mood");
    this.categoriesThemePage = new CategoriesThemePage("categorie-theme");
    this.playlistPage = new PlaylistPage("playlist");
    this.loginPage = new LoginPage("login");
    this.registrationPage = new RegistrationPage("registration");
    this.profilePage = new ProfilePage("profile");
    this.header = new Header();
    this.player = new Player("div", "player__wrapper");
    this.searchPage = new SearchPage("search");
    this.albumPage = new AlbumPage("album");
  }

  fillMainWrapper() {
    App.mainWrapper.id = "main-wrap";
    if (window.location.hash) {
      this.renderNewPage(window.location.hash.slice(1));
    } else {
      App.mainWrapper.append(this.loginPage.render());
    }
  }

  renderNewPage(idPage: string) {
    App.mainWrapper.innerHTML = "";

    let page: Page | null = null;

    if (idPage === PageIds.MainPage) {
      page = new HomePage(idPage);
      Aside.renderCategoriesBtns(false);
    } else if (idPage === PageIds.PlaylistTrack) {
      page = new PlaylistTrack(idPage);
      Aside.renderCategoriesBtns(false);
    } else if (idPage === PageIds.Favorite) {
      page = new FavoritePage(idPage);
      Aside.renderCategoriesBtns(false);
    } else if (idPage === PageIds.Categories) {
      page = new CategoriesPage(idPage);
      Aside.renderCategoriesBtns(true);
    } else if (idPage === PageIds.Playlist) {
      page = new PlaylistPage(idPage);
      Aside.renderCategoriesBtns(false);
    } else if (idPage === PageIds.Login) {
      page = new LoginPage(idPage);
      Aside.renderCategoriesBtns(false);
    } else if (idPage === PageIds.Registration) {
      page = new RegistrationPage(idPage);
      Aside.renderCategoriesBtns(false);
    } else if (idPage === PageIds.Profile) {
      page = new ProfilePage(idPage);
      Aside.renderCategoriesBtns(false);
    } else if (idPage === PageIds.CategoriesGenre) {
      page = new CategoriesGenrePage(idPage);
    } else if (idPage === PageIds.CategoriesMood) {
      page = new CategoriesMoodPage(idPage);
    } else if (idPage === PageIds.CategoriesTheme) {
      page = new CategoriesThemePage(idPage);
    } else if (idPage === PageIds.Search) {
      page = new SearchPage(idPage);
    } else if (idPage === PageIds.Album) {
      page = new AlbumPage(idPage);
    }

    if (page) {
      const pageHTML = page.render();
      const header = this.header.render();
      App.mainWrapper.append(header, pageHTML);
    }
  }

  private enableRouteChange() {
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash;

      if (location.hash) {
        history.replaceState({}, "", hash);
      }

      this.renderNewPage(hash.slice(1));
    });
  }

  private runDarkTheme() {
    localStorage.setItem("theme", "ligth");
    Aside.switcherBlock.classList.toggle("light");
    const aside = App.mainWrapper.previousSibling as HTMLElement;
    const player = Player.playerContainer.element.children[0] as HTMLElement;
    Theme.textSpan.innerHTML = `Light`;
    document.body.style.background = "none";
    App.mainWrapper.classList.toggle("dark");
    if (aside) aside.classList.toggle("dark");
    player.classList.toggle("dark-player");
    document.body.style.background = "black";
  }

  run() {
    let userTracks = LoginPage.getArrayOfTracks();
    App.container.className = "container";
    App.container.id = "container";

    document.body.append(App.container);

    App.container.append(App.aside.render());

    this.fillMainWrapper();

    App.mainWrapper.className = "main-wrapper";

    App.container.append(App.mainWrapper);

    App.container.append(this.player.render());

    this.enableRouteChange();

    Player.arrayOfTracks = [];

    if (userTracks) Player.arrayOfUser = LoginPage.getArrayOfTracks();

    if (localStorage.getItem("theme") === "dark") {
      this.runDarkTheme();
    }
  }
}
