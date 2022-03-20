import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // creamos la propiedad y la iniciamos vacía
  heroes: HeroeModel[] = [];

  // creamos una propiedad "cargando"
  cargando = false;

  // inyectamos el Servicio de HeroesService
  constructor( private heroesService: HeroesService ) { }

  ngOnInit(): void {

    this.cargando = true;

    // llamamos al método que muestra los heroes
    this.heroesService.getHeroes()
      .subscribe ( resp => {
        this.heroes = resp;
        this.cargando = false;
      });
  }

  // creamos el método para borrar un Héroe
  borrarHeroe( heroe: any, i: number ) {

    // usamos SweetAlert para el mensaje
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Está seguro que desea eliminar a ${heroe.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then( resp => {
      if( resp.value) {

        this.heroes.splice(i, 1);
        this.heroesService.borrarHeroe(heroe.id).subscribe();
      }
    });
  }
}
