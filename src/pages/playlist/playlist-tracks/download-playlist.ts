import { BaseComponent } from "../../../templates/basecomponent";

export class DownloadPlaylist extends BaseComponent {
    constructor(src: string) {
        super("div", "download__playlist");
        this.element.innerHTML = `<a href=${src} download=""><img src=${"../../assets/images/download-track.svg"}><span>Download</span></a>`;
    }
}