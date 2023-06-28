import { BaseComponent } from "../../../templates/basecomponent";
import { LikeTrack } from "../../categories/components-categories/song-card/like-track";
import { DownloadPlaylist } from "./download-playlist";
import { PlayPlaylist } from "./play-playlist";

export class InfoBlockPlaylist extends BaseComponent {
    playlistManager: BaseComponent;
    playlistLike: BaseComponent;
    constructor() {
        super("div", "block__playlist_info");
        this.playlistManager = new BaseComponent("div", "manager__playlist");
        this.playlistLike = new BaseComponent("div", "like__playlist");
    }

    render(name: string, id: string, link: string) {
        this.element.innerHTML = `<div class="title__playlist">PLAYLIST<p class="">${name}</p></div>`;
        this.playlistManager.element.append(new PlayPlaylist().element);
        this.playlistManager.element.append(new DownloadPlaylist(link).element);
        this.playlistLike.element.append(new LikeTrack().element);
        this.playlistManager.element.append(this.playlistLike.element);
        this.element.append(this.playlistManager.element);
        return this.element;
    }
}