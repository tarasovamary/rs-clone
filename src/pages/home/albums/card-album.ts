import { BaseComponent } from "../../../templates/basecomponent";

export class AlbumCard extends BaseComponent {
  constructor(image: string, albumName: string, id: string) {
    super('div', 'album keen-slider__slide') 
    this.element.innerHTML = `
    <div class="album__container" id=${id}>
    <img class="album__image" src=${image} alt="album_image">
    <div class="album__title">${albumName}</div>
    </div>
    `
  }
}