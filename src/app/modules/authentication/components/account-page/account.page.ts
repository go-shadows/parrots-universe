import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'account-page',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountPage {

}
