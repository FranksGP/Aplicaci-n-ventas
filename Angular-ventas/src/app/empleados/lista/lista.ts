import { Component, inject, signal } from '@angular/core';
import { EmpleadoServicio } from '../../services/empleado.service';
import { Empleado } from '../../empleado';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lista.html',
})
export class ListaComponent {

  empleados = signal<Empleado[]>([]);
  private empleadoService = inject(EmpleadoServicio);

  eliminandoId = signal<number | null>(null); // ID del empleado que se está eliminando (para mostrar spinner)

  constructor() {
    this.cargar();
  }

  cargar() {
    this.empleadoService.obtenerEmpleados().subscribe({
      next: (data) => this.empleados.set(data),
      error: (err) => console.error('Error cargando empleados', err)

    });
  }
   eliminar(id: number) {
    const empleado = this.empleados().find(e => e.idEmpleado === id);
    const nombre = empleado ? empleado.nombre : `ID ${id}`;
    if (!confirm(`¿Seguro que deseas eliminar al empleado: ${nombre}?`)) {
      return;
    }

    this.eliminandoId.set(id);
    this.empleadoService.eliminarEmpleado(id).subscribe({
      next: () => {
        // Refrescar la lista tras eliminar
        this.cargar();
        this.eliminandoId.set(null);
      },
      error: (e) => {
        console.error('No se pudo eliminar', e);
        this.eliminandoId.set(null);
        alert('No se pudo eliminar. Verifica el backend y los permisos/CORS.');
      }
    });

      } 
    
   }

function eliminar(id: any, number: any) {
  throw new Error('Function not implemented.');
}
  