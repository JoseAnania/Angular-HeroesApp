import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HeroesComponent } from './pages/heroes/heroes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroeComponent,
    HeroesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // importamos el Módulo de las Rutas
    FormsModule, // importamos el Módulo de Formularios
    HttpClientModule // importamos el Módulo que nos permitirá trabajar con Apis Rest
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
