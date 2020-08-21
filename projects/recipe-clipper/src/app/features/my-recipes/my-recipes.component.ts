import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'rcpl-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyRecipesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
