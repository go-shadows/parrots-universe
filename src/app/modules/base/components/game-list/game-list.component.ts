import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {SupabaseClientService} from '../../../../models/services/supabase-client.service';

@Component({
  selector: 'game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameListComponent implements OnInit {

  readonly highScores$ = new BehaviorSubject([])

  constructor(
    private readonly _router: Router,
    private readonly _supa: SupabaseClientService,
  ) {}

  ngOnInit() {
    this._supa.raw.from('score-submission')
      .select('score, created_at, uid')
      .eq('game', 'Simple Supa Collector')
      .order('score', { ascending: false })
      .limit(10)
      .then((res) => {
        console.info('res', res)
        if (res.error) {
          console.error('uuh', res.error)
          return
        }

        this._supa.raw.from('profiles')
          .select('id, tag_name')
          .in('id', res.data.map(d => d.uid))
          .then((uRes) => {
            console.info('uRes', uRes)
            if (uRes.error) {
              console.error('uuh', uRes.error)
              return
            }

            this.highScores$.next(res.data.map(d => ({ ...d, ...uRes.data.find(u => u.id === d.uid) })))
          })
      })
  }

  trySimpleSupaCollector() {
    this._router.navigate(['g', 'simple-star-collector'])
  }

}
