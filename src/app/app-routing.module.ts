import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './utilities/interceptor.service';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [];


@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'favorites', component: FavoritesComponent },
    { path: '', redirectTo: 'favorites', pathMatch: 'full'},
  ])],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ]
})
export class AppRoutingModule { }
