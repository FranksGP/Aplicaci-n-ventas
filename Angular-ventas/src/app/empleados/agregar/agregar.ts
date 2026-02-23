import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmpleadoServicio } from '../../services/empleado.service';
import { Empleado } from '../../empleado';

@Component({
  selector: 'app-agregar',
  imports: [FormsModule, RouterLink],
  templateUrl: './agregar.html',
})
export class AgregarComponent {

  private empleadoService = inject(EmpleadoServicio);
  private router = inject(Router);

// modelo del formulario (templeate-driven) para agregar un nuevo empleado
  empleado: Empleado = {
    idEmpleado: 0,
    nombre: '',
    departamento: '',
    sueldo: 0
  };

  guardando = false; // bandera para evitar múltiples envíos
  error = ""; // mensaje de error para mostrar al usuario


  onSubmit() {
  if (this.guardando) return; // Evitar múltiples envíos
  this.guardando = true; // Marcar como guardando para deshabilitar el botón
  this.error = "";  

  //Regla: quitar IdEpleado antes deeviar
  const { idEmpleado, ...payload } = this.empleado;
  
 
  this.empleadoService.agregarEmpleado(payload as Empleado).subscribe({
    next: () => this.router.navigate(['/empleados']), // redirigir a la lista después de agregar
    error: (e) => {
      this.error = "Error al agregar el empleado";
      console.error(e);
      this.guardando = false;
    }
  });
  }
}