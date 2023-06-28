import { BaseComponent } from "../../templates/basecomponent";
import { Component } from "../../templates/components";
import { UserInfo } from "../../templates/types";
import { RootObject } from "../../templates/types";
const Parse = require("parse");

export class Player extends Component {
  static playOrPauseBlock: BaseComponent;
  static audio: HTMLAudioElement = new Audio();
  static imageBlock = document.createElement("div") as HTMLElement;
  static aboutBlock = document.createElement("div") as HTMLElement;
  static currentTrackIndex: number;
  static arrayOfTracks: any;
  static borderedSongBlock: HTMLElement;
  static arrayOfUser: string[] = [];
  static currentTrackId: string;
  static playerContainer: BaseComponent;
  static likeImg: HTMLImageElement = document.createElement("img");

  private progressBar: BaseComponent;
  private player: BaseComponent;
  private infoBlock: BaseComponent;
  private likeBlock: BaseComponent;
  private panel: BaseComponent;
  private sound: BaseComponent;
  private previous: BaseComponent;
  private next: BaseComponent;
  private volume: BaseComponent;
  private volumeWrapp: BaseComponent;
  private wrapperForPanel: BaseComponent;

  constructor(tagName: string, className: string) {
    super(tagName, className);
    Player.playerContainer = new BaseComponent("div", "player__container");
    this.progressBar = new BaseComponent("div", "progress");
    this.player = new BaseComponent("div", "player");
    this.infoBlock = new BaseComponent("div", "player__info-block");
    this.likeBlock = new BaseComponent("div", "player__like");
    this.panel = new BaseComponent("div", "player__panel");
    this.sound = new BaseComponent("div", "player__sound");
    Player.playOrPauseBlock = new BaseComponent(
      "div",
      "panel__btn",
      "",
      "play"
    );
    this.previous = new BaseComponent("div", "panel__btn", "", "previos");
    this.next = new BaseComponent("div", "panel__btn", "", "next");
    this.volume = new BaseComponent("input", "player__volume", "", "volume");
    this.wrapperForPanel = new BaseComponent("div", "player__panel-wrap");
    this.volumeWrapp = new BaseComponent("div", "player__volume");
  }

  public render(): HTMLElement {
    this.createPlayer();
    this.player.element.append(this.progressBar.element);
    this.player.element.append(this.wrapperForPanel.element);
    Player.playerContainer.element.append(this.player.element);
    this.container.append(Player.playerContainer.element);
    this.soundEvents();
    return this.container;
  }

  private createPlayer(): void {
    this.createInfoBlock();
    this.createProgress();
    this.createLikeBlock();
    this.createPanelBlock();
    this.createSoundBlock();
    this.wrapperForPanel.element.append(this.infoBlock.element);
    this.wrapperForPanel.element.append(this.likeBlock.element);
    this.wrapperForPanel.element.append(this.panel.element);
    this.wrapperForPanel.element.append(this.sound.element);
    this.changeProgress();
    this.uploadProgress();
    this.startTrack();
    this.changeVolume();
    this.volumeBtnEvents();
    this.onloadProgress();
    this.nextTrack();
    this.previousTrack();
  }

  private createLikeBlock(): void {
    let array: string[] = this.getArrayOfTracks();
    let src: string = "../../assets/images/noLike.svg";

    Player.likeImg.src = src;
    this.likeBlock.element.append(Player.likeImg);
    this.likeBlock.element.addEventListener("click", () => {
      const likeSvg = Player.borderedSongBlock.children[2]
        .children[2] as HTMLImageElement;

      Player.likeImg.classList.toggle("liked");

      if (Player.likeImg.classList.contains("liked")) {
        array.push(Player.currentTrackId);
        Player.likeImg.src = "../../assets/images/like.svg";
        Player.arrayOfUser = array;
        Player.onloadTrackList(Player.arrayOfUser);
        likeSvg.src = "../../assets/images/like.svg";
      } else {
        Player.likeImg.src = src;
        let indexOfUnLikedTrack = array.findIndex(
          (el) => el === Player.currentTrackId
        );

        if (indexOfUnLikedTrack !== -1) {
          array.splice(indexOfUnLikedTrack, 1);
          Player.onloadTrackList(array);
        }
        likeSvg.src = "../../assets/images/noLike.svg";
      }
    });
  }

  private getArrayOfTracks(): string[] {
    let userParse = localStorage.getItem(
      "Parse/fHTtYX3oryuYW1MNXV6nvRxfu2xGoRXPu71vYXWH/currentUser"
    );
    if (userParse) {
      let objectParsed = JSON.parse(userParse);

      let User: string[] = objectParsed.tracks;
      return User;
    }
    return [""];
  }

  static getUserId(): string {
    let id: string = "";
    let userString = localStorage.getItem(
      "Parse/fHTtYX3oryuYW1MNXV6nvRxfu2xGoRXPu71vYXWH/currentUser"
    );
    if (userString) {
      id = JSON.parse(userString).objectId;
    }

    return id;
  }

  static async onloadTrackList(arrayOfTracks: string[]) {
    let id: string = Player.getUserId();
    const User = new Parse.User();
    const query = new Parse.Query(User);
    try {
      let user = await query.get(id);
      user.set("tracks", arrayOfTracks);
      try {
        let response = await user.save();
        console.log("OK");
      } catch (error: any) {
        console.error("Error while updating user", error);
      }
    } catch (error: any) {
      console.error("Error while retrieving user", error);
    }
  }

  private nextTrack() {
    this.next.element.addEventListener("click", (e) => {
      let nextTrackId = Player.arrayOfTracks[Player.currentTrackIndex + 1].id;
      let nextSongBlock = Player.borderedSongBlock
        .nextElementSibling as HTMLElement;
      if (nextSongBlock !== null) Player.borderSongBlock(nextSongBlock);
      Player.startTrack(Player.arrayOfTracks, nextTrackId);
    });
  }

  private previousTrack() {
    this.previous.element.addEventListener("click", (e) => {
      let previousTrackId =
        Player.arrayOfTracks[Player.currentTrackIndex - 1].id;
      let previousSongBlock = Player.borderedSongBlock
        .previousElementSibling as HTMLElement;
      if (previousSongBlock !== null) Player.borderSongBlock(previousSongBlock);
      Player.startTrack(Player.arrayOfTracks, previousTrackId);
    });
  }

  private createProgress(): void {
    const progressBar = document.createElement("div") as HTMLElement;
    progressBar.className = "progress__bar";
    this.progressBar.element.append(progressBar);
  }

  private createInfoBlock(): void {
    this.infoBlock.element.classList.add("info-block");
    Player.imageBlock = document.createElement("div") as HTMLElement;
    Player.aboutBlock = document.createElement("div") as HTMLElement;
    Player.aboutBlock.className = "info-block__about-wrapp";
    Player.imageBlock.className = "info-block__image";
    Player.aboutBlock.innerHTML = `
                            <span class="info-block__song-name"></span>
                            <div class="info-block__author"></div>
    `;
    Player.imageBlock.innerHTML = `<img src="../../assets/images/music-album.png" alt="">`;
    this.infoBlock.element.append(Player.imageBlock);
    this.infoBlock.element.append(Player.aboutBlock);
  }

  private createPanelBlock(): void {
    Player.playOrPauseBlock.element.classList.add("pause");
    let srcPauseOrPlay: string = `<img src="../../assets/images/panel/play.svg" alt="#">`;
    this.previous.element.innerHTML = `<img src="../../assets/images/panel/previos.svg" alt="#">`;
    Player.playOrPauseBlock.element.innerHTML = srcPauseOrPlay;
    this.next.element.innerHTML = `<img src="../../assets/images/panel/next.svg" alt="#">`;
    this.panel.element.append(this.previous.element);
    this.panel.element.append(Player.playOrPauseBlock.element);
    this.panel.element.append(this.next.element);
  }

  private createSoundBlock() {
    this.sound.element.innerHTML = `<img src="../../assets/images/panel/sound.svg" alt="#">`;
  }

  private soundEvents(): void {
    let volumeValue: string | null = localStorage.getItem("volume-value");
    this.volume.inputElement.type = "range";
    this.volume.inputElement.min = "0";
    this.volume.inputElement.max = "10";
    if (volumeValue)
      this.volume.inputElement.value = (Number(volumeValue) * 10).toString();
    Player.audio.volume = Number(volumeValue);
    if (localStorage.getItem("sound") !== "on") {
      this.volume.inputElement.value = "0";
    }
    this.volumeWrapp.element.append(this.volume.inputElement);
    this.player.element.append(this.volumeWrapp.element);
    this.sound.element.addEventListener("mouseover", () => {
      this.volumeWrapp.element.style.visibility = "visible";
    });
    this.sound.element.addEventListener("mouseout", () => {
      setTimeout(() => {
        this.volumeWrapp.element.style.visibility = "hidden";
      }, 1500);
    });
    this.volume.inputElement.addEventListener("mouseover", () => {
      this.volumeWrapp.element.style.visibility = "visibility";
    });
  }

  private onloadProgress() {
    Player.audio.addEventListener("canplaythrough", () => {
      const progresLine = this.progressBar.element.children[0] as HTMLElement;
      let whidthOfPlayer: number = this.player.element.offsetWidth;
      let currentTimeFromStorage = localStorage.getItem("currentTime");
      if (currentTimeFromStorage) {
        progresLine.style.width =
          (whidthOfPlayer / Player.audio.duration) *
            Number(currentTimeFromStorage) +
          "px";
      }
    });
  }

  private changeProgress(): void {
    const progresLine = this.progressBar.element.children[0] as HTMLElement;
    this.progressBar.element.addEventListener("click", (e) => {
      const infoAboutProgress = progresLine.getBoundingClientRect();
      let whidthOfPlayer: number = this.player.element.offsetWidth;
      let clickX: number = e.pageX - infoAboutProgress.left;
      let percentOfSong: number = (clickX / whidthOfPlayer) * 100;
      progresLine.style.width = clickX + "px";
      Player.audio.currentTime =
        (clickX / whidthOfPlayer) * Player.audio.duration;
      localStorage.setItem("currentTime", `${Player.audio.currentTime}`);
    });
  }

  private uploadProgress(): void {
    const progresLine = this.progressBar.element.children[0] as HTMLElement;
    Player.audio.addEventListener("timeupdate", (e) => {
      let whidthOfPlayer: number = this.player.element.offsetWidth;
      progresLine.style.width =
        (whidthOfPlayer / Player.audio.duration) * Player.audio.currentTime +
        "px";
      localStorage.setItem("currentTime", `${Player.audio.currentTime}`);
    });
  }

  private startTrack(): void {
    const img = Player.playOrPauseBlock.element.children[0] as HTMLImageElement;
    let playImgSrc: string = `../../assets/images/panel/play.svg`;
    let pauseImgSrc: string = `../../assets/images/panel/pause.svg`;
    localStorage.setItem("currentTrackUrl", "../../assets/yamakasi.mp3");
    localStorage.setItem("isPlay", "false");
    Player.playOrPauseBlock.element.addEventListener("click", () => {
      if (localStorage.getItem("isPlay") === "false") {
        img.src = pauseImgSrc;
        localStorage.setItem("isPlay", "true");
        let currentTimeFromStorage = localStorage.getItem("currentTime");
        Player.audio.currentTime = Number(currentTimeFromStorage);
        if (localStorage.getItem("sound") === "off") Player.audio.volume = 0;
        Player.audio.play();
      } else {
        img.src = playImgSrc;
        localStorage.setItem("isPlay", "false");
        Player.audio.pause();
      }
    });
  }

  private changeVolume(): void {
    this.volume.inputElement.addEventListener("change", () => {
      Player.audio.volume = Number(this.volume.inputElement.value) / 10;
      localStorage.setItem("volume-value", `${Player.audio.volume}`);
    });
  }

  private volumeBtnEvents(): void {
    let img = this.sound.element.children[0] as HTMLImageElement;

    if (localStorage.getItem("sound") === "on") {
      img.src = "../../assets/images/panel/sound.svg";
    } else if (localStorage.getItem("sound") === "off") {
      img.src = "../../assets/images/panel/noSound.svg";
    }

    this.sound.element.addEventListener("click", () => {
      let volumeValue: string | null = localStorage.getItem("volume-value");
      let soundPlay: string | null = localStorage.getItem("sound");
      if (soundPlay === "on") {
        img.src = "../../assets/images/panel/noSound.svg";
        localStorage.setItem("sound", "off");
        Player.audio.volume = 0;
        this.volumeWrapp.element.innerHTML = `
        <input type="range" min="0" max="10" value="0">
        `;
      } else if (soundPlay === "off") {
        img.src = "../../assets/images/panel/sound.svg";
        localStorage.setItem("sound", "on");
        if (volumeValue) Player.audio.volume = Number(volumeValue);
        if (volumeValue) {
          this.volumeWrapp.element.innerHTML = `
        <input type="range" min="0" max="10" value="${
          Number(volumeValue) * 10
        }">
        `;
        } else {
          Player.audio.volume = 1;
        }
      }
    });
  }

  static startTrack(data: any, id: string): void {
    Player.likeImg.classList.remove("liked");
    Player.currentTrackId = id;
    const currentTrackData = data.filter((el: any) => el.id == id);
    let currentTrackIndex: number = Player.arrayOfTracks.findIndex(
      (el: any) => el.id === id
    );
    Player.currentTrackIndex = currentTrackIndex;
    const imgTrack = Player.imageBlock.children[0] as HTMLImageElement;
    const imgPause = Player.playOrPauseBlock.element
      .children[0] as HTMLImageElement;
    imgTrack.src = currentTrackData[0].image;
    Player.audio.src = currentTrackData[0].audio;
    let pauseImgSrc: string = `../../assets/images/panel/pause.svg`;
    imgPause.src = pauseImgSrc;
    Player.aboutBlock.innerHTML = `
                            <span class="info-block__song-name">${currentTrackData[0].name}</span>
                            <div class="info-block__author">${currentTrackData[0].artist_name}</div>
    `;
    localStorage.setItem("isPlay", "true");
    Player.audio.play();
    Player.likeCheck();
  }

  static getArray(array?: any) {
    Player.arrayOfTracks = array;
  }

  static borderSongBlock(element: HTMLElement) {
    Player.borderedSongBlock = element;
    let collectionOfTrackBlocks = document.querySelectorAll(".song");
    collectionOfTrackBlocks.forEach((el) => {
      el.classList.remove("current-track");
    });

    element.classList.add("current-track");
  }

  static likeCheck() {
    if (Player.arrayOfUser.find((el) => el == Player.currentTrackId)) {
      Player.likeImg.src = "../../assets/images/like.svg";
      Player.likeImg.classList.add("liked");
    } else {
      Player.likeImg.src = "../../assets/images/noLike.svg";
    }
  }
}
