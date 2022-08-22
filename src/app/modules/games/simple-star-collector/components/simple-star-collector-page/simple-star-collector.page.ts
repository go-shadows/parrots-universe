import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'simple-star-collector-page',
  templateUrl: './simple-star-collector.page.html',
  styleUrls: ['./simple-star-collector.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleStarCollectorPage {

  constructor(
    private readonly _router: Router,
  ) {}

  quit() {
    this._router.navigate([''])
  }

}
