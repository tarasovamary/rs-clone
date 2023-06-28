import { BaseComponent } from "../../../templates/basecomponent";

export class PlaylistImg extends BaseComponent {
  static playlists = [
    "https://images.jamendo.com/wallposts/60/960.420_315.jpg?du=1625472118",
    "https://images.jamendo.com/wallposts/59/959.420_315.jpg?du=1625471587",
    "https://images.jamendo.com/wallposts/58/958.420_315.jpg?du=1625471421",
    "https://images.jamendo.com/wallposts/57/957.420_315.jpg?du=1625470673",
    "https://images.jamendo.com/wallposts/56/956.420_315.jpg?du=1625465826",
    "https://images.jamendo.com/wallposts/55/955.420_315.jpg?du=1625465648",
    "https://images.jamendo.com/wallposts/39/939.420_315.jpg?du=1622012016",
    "https://images.jamendo.com/wallposts/37/937.420_315.jpg?du=1621320438",
    "https://images.jamendo.com/wallposts/36/936.420_315.jpg?du=1620369527",
    "https://images.jamendo.com/wallposts/34/934.420_315.jpg?du=1619505965 ",
    "https://images.jamendo.com/wallposts/32/932.420_315.jpg?du=1617086739",
    "https://images.jamendo.com/wallposts/29/929.420_315.jpg?du=1614065887",
  ];

  static playlistIds = [
    "500608490",
    "500608900",
    "500608899",
    "500608898",
    "500608471",
    "500607433",
    "500606825",
    "500605606",
    "500605176",
    "500604904",
    "500602528",
    "500599669",
  ];
  constructor(id: string, src: string) {
    super("div", "playlist__img");
    this.element.id = id;
    this.element.style.background = `url(${src})`;
    this.element.style.backgroundSize = "cover";
    this.element.style.backgroundPosition = "center";
    this.element.addEventListener("click", this.click);
  }

  render() {
    return this.element;
  }

  click() {
    const trackId:string = this.getAttribute("id")!;
    const trackImg:string = this.style.background;
    localStorage.setItem("playlistId", `${trackId}`);
    localStorage.setItem("playlistImg", `${trackImg}`)
  }
}
