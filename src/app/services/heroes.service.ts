/* Servicio creado para manejar toda la información de los Héroes */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HeroeModel } from '../models/heroe.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  // creamos las propiedades 
  private url = 'https://heroesapp-crud-3d25c-default-rtdb.firebaseio.com' // porción de Firebase que es igual para los distintos métodos (Post, Put, Get, Delete)


  // inyectamos el servicio del HttpClientModule (para poder trabajar con la Api de Firebase)
  constructor( private http: HttpClient ) { }

  // método que realiza el INSERT (recibe por parámetro el objeto Heroe)
  crearHeroe( heroe: HeroeModel ) {

    // retornamos el POST (con "map" evitamos la duplicación del insert)
    return this.http.post(`${this.url}/heroes.json`, heroe)
      .pipe(
        map( (resp: any) => {
          heroe.id = resp.name;
          return heroe;
        })
      );
  }

  // método que realiza el UPDATE (recibe por parámetro el objeto Heroe)
  actualizarHeroe( heroe: HeroeModel ) {

    // replicamos el Objeto Hereo y eliminamos el ID (para no crearlo nuevamente)
    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    // retornamos el PUT (agregamos el id del heroe a modificar)
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  // método que realiza el DELETE (recibe por parámetro el id del Heroe)
  borrarHeroe( id: string ) {
    
    // retornamos el DELETE (agregamos el id del heroe a modificar)
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  // método que realiza el READ por ID (muestra sólo el Heroe seleccionado)
  getHeroe( id: string ) {

    // retornamos el GET
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  // método que realiza el READ (muestra la lista de Heroes)
  getHeroes() {

    // retornamos el GET (usamos pipe para crear un Arreglo para retornar un modelo que pueda leer el Html)
    return this.http.get(`${this.url}/heroes.json`)
      .pipe(
        map( this.crearArreglo ) 
      );
  }

  // creamos el arreglo para usar en el GET (mostrar los heroes)
  private crearArreglo( heroesObj: any ) {

    const heroes: HeroeModel[] = [];

    if( heroesObj === null ) { return []; }

    Object.keys( heroesObj ).forEach( key => {

      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push(heroe);
    });

    return heroes;
  }

}
