import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { FavoritesComponent } from './favorites/favorites.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { RecipeData } from './services/recipe-data';
import { RecipeCategoryDisplayPipe } from './pipes/recipe-category-display.pipe';
import { RecipeDetailComponent } from './recipes/recipe-detail.component';
import { PingApiComponent } from './utilities/ping-api/ping-api.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FavoritesComponent,
    RecipeCategoryDisplayPipe,
    RecipeDetailComponent,
    PingApiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule,
    HttpClientModule,
    MatMenuModule,
    MatCardModule,
    HttpClientInMemoryWebApiModule.forRoot(RecipeData, {
      passThruUnknownUrl: true
     })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
