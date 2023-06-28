import { BaseComponent } from "../../../templates/basecomponent";
import { App } from "../../../app/app";
import { Player } from "../../player/player";

export class Menu extends BaseComponent {
  public burger = document.createElement('img') as HTMLImageElement;
  public overlay = document.createElement('div') as HTMLDivElement;
  public close = document.createElement('img') as HTMLImageElement;


  constructor() {
    super('div', 'hamburger')

    this.burger.src = '../../assets/images/hamburger.svg';
    this.burger.className = 'menu';

    this.close.src = '../../assets/images/close.svg';
    this.close.className = 'close';

    this.overlay.className = 'overlay';
    this.element.append(this.burger, this.overlay, this.close);
  }

  openNavMenu() {
    const aside = document.querySelector('.aside') as HTMLElement;
    const player = Player.playerContainer;
    const click = () => {
      aside.classList.add('active');
      player.element.style.display = 'none';
      this.close.classList.add('active');
      this.overlay.classList.add('active');
      this.burger.classList.add('hidden');
      document.body.classList.add('locked');
    }
    if (this.element) {
      this.element.addEventListener('click', click);
    }
    document.addEventListener('click', (event) => {
      if(event.target === this.overlay) { 
        aside.classList.remove('active');
        player.element.style.display = 'block';
        this.close.classList.remove('active');
        this.overlay.classList.remove('active'); 
        this.burger.classList.remove('hidden');
        document.body.classList.remove('locked');
      }
      else if(event.target === this.close) { 
        aside.classList.remove('active');
        player.element.style.display = 'block';
        this.close.classList.remove('active');
        this.overlay.classList.remove('active'); 
        this.burger.classList.remove('hidden');
        document.body.classList.remove('locked');
      }
    })
  }

  render() {
    return this.element;
  }
}