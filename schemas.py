from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from models import Empleado

class EmpleadoSchema(SQLAlchemyAutoSchema):
    
    sueldo = fields.Float()
    
    class Meta:
        model = Empleado
        load_instance = True

empleado_schema = EmpleadoSchema()
empleados_schema = EmpleadoSchema(many=True)