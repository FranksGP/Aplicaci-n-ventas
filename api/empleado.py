from flask import request
from flask_restful import Resource
from extensions import db
from models import Empleado
from schemas import empleado_schema, empleados_schema

class EmpleadoListResource(Resource):

    def get(self):
        empleado = Empleado.query.all()
        return empleados_schema.dump(empleado), 200

    def post(self):
        data = request.get_json()

        nuevo_empleado = Empleado(
            nombre=data["nombre"],
            departamento=data["departamento"],
            sueldo=data["sueldo"]
        )

        db.session.add(nuevo_empleado)
        db.session.commit()

        return empleado_schema.dump(nuevo_empleado), 201


class EmpleadoResource(Resource):

    def get(self, id):
        empleado = Empleado.query.get_or_404(id)
        return empleado_schema.dump(empleado), 200

    def put(self, id):
        empleado = Empleado.query.get_or_404(id)
        data = request.get_json()

        empleado.nombre = data.get("nombre", empleado.nombre)
        empleado.departamento = data.get("departamento", empleado.departamento)
        empleado.sueldo = data.get("sueldo", empleado.sueldo)

        db.session.commit()

        return empleado_schema.dump(empleado), 200

    def delete(self, id):
        empleado = Empleado.query.get_or_404(id)
        db.session.delete(empleado)
        db.session.commit()

        return {"message": "Empleado eliminado correctamente"}, 200