#extencion.py
from flask_sqlalchemy import SQLAlchemy 
from flask_migrate import Migrate 
from flask_marshmallow import Marshmallow 

#Iniciamos los objetos de las extensiones
db = SQLAlchemy()   #para insetar informacion y ecuperar informacion
migrate = Migrate() #para manejar las migraciones de la base de datos
ma = Marshmallow() #para serializar y deserializar objetos de la base de datos en formato JSON