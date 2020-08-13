import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { authComplete } from '../core/auth/auth.actions';

@Component({
  selector: 'rcpl-call-back',
  templateUrl: './call-back.component.html',
  styleUrls: ['./call-back.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CallBackComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(authComplete());
  }
}
