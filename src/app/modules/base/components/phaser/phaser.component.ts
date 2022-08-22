import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

/**
 * TODO WARNING
 *
 * Being totally as fair as I can to the person that originally made this:
 * I did not make this originally, but, I lost the ref that I pulled it from
 * Sorry :'(
 */
@Component({
  selector: 'wrap-phaser',
  template: ``
})
export class PhaserComponent implements AfterViewInit, OnDestroy, OnInit {

  @Input() config: any;
  @Input() phaser: any;
  @Output() readonly ready = new EventEmitter();

  private game: any;

  constructor(
    private readonly _el: ElementRef,
  ) {}

  ngAfterViewInit() {
    this.game.events.once('ready', () => {
      this._el.nativeElement.appendChild(this.game.canvas);
      this._el.nativeElement.style.overflow = 'hidden';
      this.ready.emit(this.game);
    });
  }

  ngOnDestroy() {
    if (this.game && typeof this.game.destroy === 'function') {
      this.game.destroy(true);
    }
  }

  ngOnInit() {
    const PhaserModule = this.phaser || window['Phaser'];

    if (!PhaserModule) {
      throw new ReferenceError('Phaser not found.');
    } else if (!PhaserModule.Game) {
      throw new ReferenceError('Phaser.Game not found.');
    }

    this.game = new PhaserModule.Game(this.config);
  }
}
