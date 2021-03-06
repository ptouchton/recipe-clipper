import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import {
  routeAnimations,
  selectIsAuthenticated
} from '../../../core/core.module';

import { State } from '../examples.state';

@Component({
  selector: 'rcpl-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  examples = [
    { link: 'todos', label: 'rcpl.examples.menu.todos' },
    { link: 'stock-market', label: 'rcpl.examples.menu.stocks' },
    { link: 'theming', label: 'rcpl.examples.menu.theming' },
    { link: 'crud', label: 'rcpl.examples.menu.crud' },
    {
      link: 'simple-state-management',
      label: 'rcpl.examples.menu.simple-state-management'
    },
    { link: 'form', label: 'rcpl.examples.menu.form' },
    { link: 'notifications', label: 'rcpl.examples.menu.notifications' },
    { link: 'elements', label: 'rcpl.examples.menu.elements' },
    { link: 'authenticated', label: 'rcpl.examples.menu.auth', auth: true }
  ];

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }
}
