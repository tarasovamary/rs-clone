import { BaseComponent } from "../../../templates/basecomponent";

export class ImgBlockPlaylist extends BaseComponent {
    constructor() {
        super("div", "block__playlist_img");

    }

    render() {
        this.element.style.background = localStorage.getItem("playlistImg")!;
        return this.element;
    }
}