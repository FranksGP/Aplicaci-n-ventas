import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Empleado } from '../../empleado';
import { EmpleadoServicio } from '../../services/empleado.service';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './editar.html'
})
export class EditarComponent {
  private empleadoServicio = inject(EmpleadoServicio);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id = 0;
  cargando = true;
  guardando = false;
  error = '';

  empleado: Empleado = {
    idEmpleado: 0,
    nombre: '',
    departamento: '',
    sueldo: 0
  };

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = Number(idParam);
    if (!this.id) {
      this.error = 'ID inválido en la ruta.';
      this.cargando = false;
      return;
    }

    this.empleadoServicio.obtenerEmpleadoPorId(this.id).subscribe({
      next: (emp) => {
        this.empleado = { ...emp };
        this.cargando = false;
      },
      error: (e) => {
        console.error(e);
        this.error = 'No se pudo cargar el empleado. Verifica el backend.';
        this.cargando = false;
      }
    });
  }

  onSubmit() {
    if (this.guardando || !this.id) return;
    this.guardando = true;
    this.error = '';

    // En edición enviamos el objeto completo (regla del prompt)
    const { idEmpleado, ...payload } = this.empleado;
    this.empleadoServicio.editarEmpleado(this.id,payload as Empleado).subscribe({
      next: () => this.router.navigate(['/empleados']),
      error: (e) => {
        console.error(e);
        this.error = 'No se pudo guardar. Revisa el backend o los datos.';
        this.guardando = false;
      }
    });
  }
}
