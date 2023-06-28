import { BaseComponent } from "../../../templates/basecomponent";

export class CardTrack extends BaseComponent {

  constructor(image: string, artistName: string, trackName: string, tags: string[], id: number) {
    super('div', 'recomend__track');
    const tag = tags.map((value) => `<span class="track__tag" style="background-color: ${this.setColorTag(value)}">${value}</span>`);
    this.element.innerHTML = `
    <div class="track__container">
      <div class="hover-button">
        <div class="play-button">
        <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
        </div>
        <div class="track__image" style="background-image: url(${image})"></div>
      </div>
      <div class="artist__title">${artistName}</div>
      <div class="track__title" id="${id}">${trackName}</div>
      <div class="track__tags">${tag.join('\n')}</div>
    </div>`
  }
  
  setColorTag(value: string) {
  switch(value) {
    case "pop": return "#DF809D";
    case "rock": return "#DF8080";
    case "electronic": return "#809BDF";
    case "hiphop": return "#DF80B3";
    case "jazz": return "#9380DF";
    case "indie": return "#DFC480";
    case "punk": return "#D35E5E";
    case "metal": return "#737373";
    case "chillout": return "#80B1DF";
    case "house": return "#CCDF80";
    case "folk": return "#DF80DB";
    case "blues": return "#8DDF80";
    case "lounge": return "#DFA880";
    case "rnb": return "#DC5294";
    case "funk": return "#646ECB";
    case "indiepop": return "#9380DF";
    case "ambient": return "#8DDF80";
    case "chillhop": return "#CCDF80";
    case "latin": return "#F2C655";
    case "indierock": return "#DF809D";
    case "electricguitar": return "#646ECB";
    case "trailer": return "#80DFA6";
    case "epic": return "#269299";
    case "orchestra": return "#DF8080";
    case "alternativemetal": return "#666161";
    case "love": return "#DC5294";
    case "trap": return "#269299";
    case "triphop": return "#269299";
    case "singersongwriter": return "#CCDF80";
    case "poppunk": return "#D35E5E";
    case "alternativerock": return "#666161";
    case "classical": return "#80B1DF";
    case "neoclassical": return "#80B1DF";
    case "piano": return "#80B1DF";
    case "relaxing": return "#B1DAFF";
    case "easylistening": return "#86ACD0";
    case "synthesizer": return "#A4C5E4";
      default: return "#DFC480";
    }
  }
}
