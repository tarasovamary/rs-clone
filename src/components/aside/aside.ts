import { Component } from "../../templates/components";
import { BaseComponent } from "../../templates/basecomponent";
import { PageIds } from "../../templates/pages";
import { Theme } from "../theme/theme"

function changeHash() {
  if (
    localStorage.getItem(
      "Parse/fHTtYX3oryuYW1MNXV6nvRxfu2xGoRXPu71vYXWH/currentUser"
    )
  ) {
    return "profile";
  } else {
    return "login";
  }
}

const Buttons = [
  {
    id: PageIds.MainPage,
    text: "Home",
  },
  {
    id: PageIds.Favorite,
    text: "Favorite",
  },
  {
    id: PageIds.Playlist,
    text: "Playlist"
  },
  {
    id: changeHash(),
    text: "Profile",
  },
  {
    id: PageIds.Categories,
    text: "Categories",
  },
];

const CategoriesButtons = [
  {
    id: PageIds.CategoriesGenre,
    text: "genre",
  },
  {
    id: PageIds.CategoriesMood,
    text: "mood",
  },
  {
    id: PageIds.CategoriesTheme,
    text: "theme",
  },
];

const Links = [
  {
    link: "https://github.com/sqwezzy33333",
    name: "Serhei Korneu",
  },
  {
    link: "https://github.com/tarasovamary",
    name: "Mariya Tarasova",
  },
  {
    link: "https://github.com/chelovek-zeml",
    name: "Alexey Andreev",
  },
];

export class Aside extends Component {
  static switcher: Theme;
  static switcherBlock: HTMLElement;
  constructor(tagName: string, className: string) {
    super(tagName, className);
    const appTitle = new BaseComponent("h1", "aside__title", "RS Music");
    this.container.append(appTitle.element);
    Aside.switcher = new Theme();
    Aside.switcherBlock = Aside.switcher.render();
  }

  renderPageBtns() {
    const navBlock = document.createElement("div");
    const navCategoriesBlock = document.createElement("div");
    navCategoriesBlock.id = "nav__categories";
    navBlock.className = "nav__wrapper";
    Buttons.forEach((el) => {
      const btn = document.createElement("a");
      btn.href = `#${el.id}`;
      btn.id = `aside-${el.text}`;
      btn.innerText = el.text;
      navBlock.append(btn);
    });
    CategoriesButtons.forEach((el) => {
      const btn = document.createElement("a");
      btn.href = `#${el.id}`;
      btn.id = `aside-${el.text}`;
      btn.innerText = `• ${el.text}`;
      btn.className = "categorie_name";
      navCategoriesBlock.append(btn);
    });
    navBlock.append(navCategoriesBlock);
    this.container.append(navBlock);
  }

  renderGithubLinks() {
    const info = document.createElement("div");
    info.className = "info";
    const linksContainer = document.createElement("div");
    linksContainer.className = "github-links";
    const titleContainer = document.createElement("div");
    titleContainer.className = "github-title";

    // const gitLogo = document.createElement("img");
    // gitLogo.src = "../../assets/images/git.png";
    // gitLogo.width = 70;
    // gitLogo.height = 48;
    // const text = document.createElement("span");
    // text.innerText = "Developers GitHub:";

    // titleContainer.append(gitLogo, text);

    Links.forEach((el) => {
      const block =  document.createElement("div");
      block.className = "block";
      const gitLogo = document.createElement("img");
      gitLogo.src = "../../assets/images/git.png";
      gitLogo.width = 50;
      gitLogo.height = 35;
      gitLogo.className = "github_image";
      const linkInfo = document.createElement("a");
      linkInfo.href = `${el.link}`;
      linkInfo.innerText = el.name;
      block.append(gitLogo, linkInfo);
      linksContainer.append(block);
    })

    const rsContainer = document.createElement("div");
    rsContainer.className = "rs";
    const linkRs = document.createElement("a");
      linkRs.href = "https://rs.school/js/";
    const rsLogo = document.createElement("img");
    rsLogo.src = "../../assets/images/rss.png";
    rsLogo.className = "rs_image";
    rsLogo.width = 80;
    const textRs = document.createElement("span");
    textRs.innerText = "2023";
    linkRs.append(rsLogo);
    rsContainer.append(linkRs, textRs);

    info.append(titleContainer, linksContainer, rsContainer);
    this.container.append(info);
  }

  render(): HTMLElement {
    this.renderPageBtns();
    this.renderGithubLinks();
    this.container.append(Aside.switcherBlock);
    return this.container;
  }

  static renderCategoriesBtns(flag: boolean) {
    const navCategories = document.getElementById("nav__categories");

    if (flag) {
      navCategories!.style.display = "flex";
    } else {
      navCategories!.style.display = "none";
    }
  }
}
