import { Player } from "../../../../components/player/player";
import { BaseComponent } from "../../../../templates/basecomponent";

export class LikeTrack extends BaseComponent {
  constructor() {
    super("img", "song__like");
    let src: string = "../../assets/images/noLike.svg";
    this.element.setAttribute("src", src);

    this.element.addEventListener("click", (e) => {
      const like = e.target as HTMLElement;
      const panelBlock = like.parentElement?.previousElementSibling;
      const id: string | undefined | null = panelBlock?.getAttribute(
        "data-item-id"
      );
      let el = this.element.getAttribute("src");
      if (el === "../../assets/images/noLike.svg") {
        this.element.setAttribute("src", "../../assets/images/like.svg");
        Player.likeImg.src = "../../assets/images/like.svg";
        Player.likeImg.classList.toggle("liked");
        if (id) {
          console.log(id)
          console.log(Player.arrayOfUser)
          Player.arrayOfUser.push(id);
          console.log(id);
          Player.onloadTrackList(Player.arrayOfUser);
        }
      } else {
        this.element.setAttribute("src", "../../assets/images/noLike.svg");
        let index = Player.arrayOfUser.findIndex((el) => {
          return el === id;
        });
        Player.arrayOfUser.splice(index, 1);
        Player.onloadTrackList(Player.arrayOfUser);
        Player.likeImg.src = "../../assets/images/noLike.svg";
      }
    });
  }

  render() {
    return this.element;
  }
}
