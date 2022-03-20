/* Módulo creado para manejar las rutas de las páginas (heroe y heroes) (Si es que no usamos la creación de rutas automáticas)*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { HeroeComponent } from './pages/heroe/heroe.component';

// definimos la constante para las rutas y la iniciamos como un arreglo
const routes: Routes = [
  {path: 'heroes', component: HeroesComponent},
  {path: 'heroe/:id', component: HeroeComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'heroes'},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes) // inyectamos la importación de las rutas
  ],
  // creamos las exportaciones para permitir usar las rutas en todos los módulos
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
