from flask_restful import Api
from .empleado import EmpleadoListResource, EmpleadoResource

api = Api()

def init_routes(app):
    api.init_app(app)
    api.add_resource(EmpleadoListResource, "/empleado")
    api.add_resource(EmpleadoResource, "/empleado/<int:id>")
