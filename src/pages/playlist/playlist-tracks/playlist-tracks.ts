import { Page } from "../../../templates/pages";
import { getPlaylist, storeTracks, getTracks } from "../../../api/api";
import { BaseComponent } from "../../../templates/basecomponent";
import { SongCard } from "../../categories/components-categories/song-card/song-card";
import { Player } from "../../../components/player/player";
import { ImgBlockPlaylist } from "./block-playlist-img";
import { InfoBlockPlaylist } from "./block-playlist-info";

export class PlaylistTrack extends Page {
  
  playlistTracksContainer: BaseComponent;
  blockPlaylist: BaseComponent;
  constructor(id: string) {
    super(id);
    this.playlistTracksContainer = new BaseComponent("div", "playlist__tracks_container");
    this.blockPlaylist = new BaseComponent("div", "block__playlist");
  }

  render() {
    const id = localStorage.getItem("playlistId")!;
    this.getPlaylist(id);
    this.container.append(this.blockPlaylist.element);
    this.container.append(this.playlistTracksContainer.element);
    return this.container;
  }

  async getPlaylist(id: string) {
    const data = await getPlaylist(id);
    this.newTracksPlaylist();
  }

  newTracksPlaylist() {
    let playlist = storeTracks.playlist;
    
    
    playlist.map((el) => 
    {
      this.blockPlaylist.element.append(new ImgBlockPlaylist().render());
      this.blockPlaylist.element.append(new InfoBlockPlaylist().render(el.name, el.id, el.zip));
      Player.getArray(el.tracks);
      el.tracks.map((tr) =>
       {
        this.playlistTracksContainer.element.append(new SongCard(`${tr.id}`, tr.image, tr.artist_name, tr.name, tr.playlistadddate, tr.audiodownload).element);
       })
      });
      
  }
}
