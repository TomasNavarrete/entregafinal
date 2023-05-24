from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from controller.estudiantesController import estudiantes_bp
from controller.login import auth_bp
from controller.adminController import adminController
from controller.cursosController import cursosController
from controller.registroCursosController import registroCursosController
from controller.restablecerClaveController import restabelcerClave
# Crea una instancia de la aplicación Flask
app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'tu_clave_secreta_aqui'  # Cambia esto con tu clave secreta
jwt = JWTManager(app)
# Registra los Blueprints en la aplicación
app.register_blueprint(estudiantes_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(adminController) 
app.register_blueprint(cursosController)
app.register_blueprint(registroCursosController)
app.register_blueprint(restabelcerClave)


@app.after_request
def agregar_encabezados_cors(response):
    response.headers.add('Access-Control-Allow-Origin', '*')  # Permitir solicitudes desde cualquier dominio
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')  # Permitir encabezados personalizados
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')  # Permitir métodos permitidos
    return response


def pagina_no_encontrada(error):
    return "<h1>Página no encontrada</h1>", 404
# Inicia el servidor Flask
if __name__ == '__main__':
    app.register_error_handler(404, pagina_no_encontrada)
    app.run(debug=False)
