import { Component } from '@angular/core';
import {ANIMALES} from '../../data/data.animales';
import {Animal} from '../../interfaces/animal.interfaces'
import { Refresher, reorderArray } from "ionic-angular";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  animales:Animal[] = [];
  audio = new Audio();
  audioTiempo: any;
  ordenando: boolean = false;

  constructor() {
    this.animales = ANIMALES.slice(0);
  }

  reproducir(animal: Animal){
    console.log(animal);
    this.pauseAudio(animal);

    if (animal.reproduciendo) {
      animal.reproduciendo = false;
      return;
    }

    this.audio.src = animal.audio;
    this.audio.load();
    this.audio.play();

    animal.reproduciendo = true;
    this.audioTiempo = setTimeout(()=> animal.reproduciendo = false, animal.duracion * 1000);

  }

  private pauseAudio(animalSeleccionado: Animal) {
    clearTimeout(this.audioTiempo);
    this.audio.pause();
    this.audio.currentTime = 0;

    for (let animal of this.animales) {
      if (animal.nombre != animalSeleccionado.nombre) {
        animal.reproduciendo = false;
      }
    }
  }

  borrarAnimal(index:number){
    this.animales.splice(index, 1);
  }

  recargarAnimales(refresher:Refresher){
    setTimeout(() => {
      this.animales = ANIMALES.slice(0);
      refresher.complete();
    }, 500);
  }

  reordenarAnimales(eventIndex:any){
    this.animales = reorderArray(this.animales, eventIndex);
  }

}
