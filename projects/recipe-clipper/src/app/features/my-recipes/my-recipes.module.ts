import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyRecipesRoutingModule } from './my-recipes-routing.module';
import { MyRecipesComponent } from './my-recipes.component';



@NgModule({
  declarations: [MyRecipesComponent],
  imports: [
    CommonModule,
    MyRecipesRoutingModule
  ]
})
export class MyRecipesModule { }
