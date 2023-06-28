import { Page } from "../../templates/pages";
import { Player } from "../../components/player/player";
import { AlbumTracks } from "./albums-page-container";
import { storeAlbumTracks } from "../../api/api";
import { SongCard } from "../categories/components-categories/song-card/song-card";
import { BaseComponent } from "../../templates/basecomponent";

export class AlbumPage extends Page {

  private albumTracks: AlbumTracks;

  constructor(id: string) {
    super(id);
    this.albumTracks = new AlbumTracks();
  }

  renderAlbumImage() {
    const albumCover = new BaseComponent('div', 'album-track_cover');
    albumCover.element.style.backgroundImage = `url(${storeAlbumTracks.image})`;

    const albumImageContainer = new BaseComponent('div', 'album-track_image');


    const albumImage = document.createElement('img') as HTMLImageElement;
    albumImage.src = `${storeAlbumTracks.image}`;
    albumImageContainer.element.append(albumImage);

    const albumTitle = document.createElement('h1');
    albumTitle.className = 'album-track_title'
    albumTitle.innerHTML = `${storeAlbumTracks.name}`;


    this.container.append(albumCover.element, albumImageContainer.element, albumTitle);

  }
  
  renderAlbumTracks() {
    let tracks = storeAlbumTracks.tracks;
    for (let i = 0; i < tracks.length; i++) {
      tracks[i].image = storeAlbumTracks.image;
      tracks[i].artist_name = storeAlbumTracks.artist_name;
    }
    Player.getArray(tracks);
    const songs = tracks.map(({id, name, audiodownload}) =>
    new SongCard(
      id,
      storeAlbumTracks.image,
      storeAlbumTracks.artist_name,
      name,
      storeAlbumTracks.releasedate,
      audiodownload
      )
      );
      
      // localStorage.setItem('albumsTrack', JSON.stringify(songs));
      // let get = localStorage.getItem('albumsTrack');
      // let trackStore = JSON.parse(get!);

        this.albumTracks.addCards(songs);
        this.container.append(this.albumTracks.element);
   }

  render(): HTMLElement {
    this.renderAlbumImage();
    this.renderAlbumTracks();
     return this.container;
  }
}