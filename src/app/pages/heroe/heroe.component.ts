import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  // creamos una propiedad del tipo HeroeModel y lo instanciamos
  heroe: HeroeModel = new HeroeModel();

  // inyectamos el Servicio de HeroesService y ActivatedRoute (este sirve para obtener el argumento que recibo por parámetro, en este caso el ID)
  constructor( private heroesService: HeroesService, 
               private route: ActivatedRoute) { }

  ngOnInit(): void {

    // creamos una propiedad para obtener el parámetro por URL (en este caso el ID)
    const id = this.route.snapshot.paramMap.get('id') || "";

    if( id !== 'nuevo' ) {
      this.heroesService.getHeroe(id)
        .subscribe( (resp: any) => {
          this.heroe = resp;
          this.heroe.id = id;
        });
    }
  }

  // creamos el método para guardar el Formulario
  guardar(form: NgForm) {

    // validamos si el formulario es válido 
    if(form.invalid) {
      console.log('Formulario inválido')
      return;
    }

    // Utilizamos SweetAlert2 para los mensajes (instalado mediante npm)
    Swal.fire({
      title: 'Espere',
      text: 'Guardando Información',
      icon: 'info',
      allowOutsideClick: false
    });

    // Utilizamos SweetAlert2 para un loading (instalado mediante npm)
    Swal.showLoading();

    let peticion: Observable<any>;

    // llamamos desde el HeroesService el método (para INSERT o UPDATE preguntamos si ID = nulo)
    if(this.heroe.id) {

      // UPDATE
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {

      // INSERT
      peticion = this.heroesService.crearHeroe(this.heroe);
    }

    // mensaje de Actualización correcta (SweetAlert2)
    peticion.subscribe( resp =>{

      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente',
        icon: 'success',
      })
    });
  }
}
