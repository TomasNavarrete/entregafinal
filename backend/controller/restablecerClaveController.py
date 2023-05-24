from datetime import timedelta
from passlib.hash import bcrypt
from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from model.restablecerClaveModel import restabelcer
from config.email import enviar_correo
from model.restablecerClaveModel import validar
from model.loginModel import login
from config.clean import sanitize_input
import json

from model.responseModel import response, responseErrorServer

restabelcerClave = Blueprint('restablecerClaveController', __name__)

@restabelcerClave.route('/api/restablecer_clave', methods=['POST'])
def restablecer_clave():
    try :
        request_data = json.loads(request.data)
        username = request_data.get('usuario')
        datosLoing = {"usuario": username}
        datos =  validar(datosLoing)
        if datos['status']==True:
            datosUsuario = datos['data']
            access_token = create_access_token(identity=datos, expires_delta=timedelta(minutes=5), additional_claims={"jti": None})
            link = "https://securereg.online/restart/"+ access_token
            res = enviar_correo(datosUsuario['usuario'],"Recupetacion de contraseña", "Hola usuario:  "+datosUsuario['usuario']+" te enviamos el siguiente link para que puedas restablecer tu contraseña link: "+link)
            return jsonify({'Mensaje': "Correo enviado con exito"}), 200
        else:
            if datos['status'] == False:
                return jsonify(datos), 400

    except Exception as e:
        return responseErrorServer(), 400
    

@restabelcerClave.route('/api/restablecer_clave_acep', methods=['POST'])
@jwt_required()
def acept_restablecer():
    try :
        establecer = get_jwt_identity()["data"]["establecer"]
        if establecer == "1" : 
            request_data = json.loads(request.data)
            password = request_data.get('clave')
            hashed_password = bcrypt.hash(password)
            usuario = get_jwt_identity()["data"]["usuario"]
            datosLoing = {"clave": hashed_password, "usuario": usuario}
            datos =  restabelcer(datosLoing)
            if datos['status']==True:
                return jsonify(datos), 200
            else:
                if datos['status'] == False:
                    return jsonify(datos), 400
        else:
           return jsonify("Acceso no valido"), 401
     
    except Exception as e:
        return responseErrorServer(), 400
    
