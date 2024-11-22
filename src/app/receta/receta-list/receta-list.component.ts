import { Component, OnInit } from '@angular/core';
import { Receta } from '../receta';
import { RecetaService } from '../receta.service';

@Component({
  selector: 'app-receta-list',
  templateUrl: './receta-list.component.html',
  styleUrls: ['./receta-list.component.css']
})
export class RecetaListComponent implements OnInit {
  recetas: Array<Receta> = [];
  promedio: number = 0;

  selectedReceta!: Receta;
  selected: Boolean = false;

  constructor(private recetaService: RecetaService) {}

  getRecetas(): void {
    this.recetaService.getRecetas().subscribe((recetas) => {
      this.recetas = recetas;
      this.promedioCalificacion();
    });
  }

  promedioCalificacion(): void {
    const totalCalificaciones = this.recetas.reduce((suma, receta) => suma + receta.estrellas, 0);
      const promedioSinRedondear = totalCalificaciones / this.recetas.length;
      this.promedio = parseFloat(promedioSinRedondear.toFixed(2));
    }
  

  totalOpiniones(): number {
    return this.recetas.reduce((suma, receta) => suma + receta.cantidadOpiniones, 0);
  }

  

  ngOnInit() {
    this.getRecetas();
  }

  onSelected(receta: Receta): void {
    this.selected = true;
    this.selectedReceta = receta;
  }
}
