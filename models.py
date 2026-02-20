from extensions import db #importamo el objeto db desde el archivo extensions.py para definir nuestro modelo de datos
from sqlalchemy import Numeric

class Empleado(db.Model):
    __tablename__ = 'empleados' # se declaa demanera explicita la table (opcional se puede adecucuar)

    idEmpleado = db.Column(db.Integer, primary_key=True, autoincrement=True) #Se pude crear automatica la llave primaria, per en caso de que se quiera crear manualmente este es el codigo.
    nombre = db.Column(db.String(100), nullable=False)#
    departamento = db.Column(db.String(100), nullable=False)
    sueldo = db.Column(db.Numeric(10, 2), nullable=False)

    def __repr__(self):
        return f"<Empleado {self.idEmpleado} - {self.nombre}>" # se imprime