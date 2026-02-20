from flask import Flask
from flask_cors import CORS
from extensions import db, migrate, ma
from api import init_routes

def create_app():
    app = Flask(__name__)

    # Configuración MySQL
    app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:admin@localhost/ventas_bd"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Inicializar extensiones
    db.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app) 

    CORS(app)
    
    @app.route("/")
    def home():

        return {"message": "API Ventas funcionando correctamente"}

    # Registrar rutas
    init_routes(app)

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True) 
