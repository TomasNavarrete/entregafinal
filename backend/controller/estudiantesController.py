from flask import Blueprint, jsonify,request
import json
from passlib.hash import bcrypt
from model.estudiantesmodel import obtener_estudiantes,obtener_estudiante_por_id,crear_estudiante, actualizar_estudiante,eliminar_estudiante
from flask_jwt_extended import get_jwt_identity, jwt_required,current_user
from flask_jwt_extended import get_jwt_identity, jwt_required,current_user
from model.responseModel import response, responseErrorServer
from config.clean import sanitize_input
from model.responseModel import responseErrorServer

estudiantes_bp = Blueprint('estudiantesController', __name__)

@estudiantes_bp.route('/api/estudiantes_list', methods=['GET'])
@jwt_required()
def obtener_estudiantes_controller():
    try :
        admin = get_jwt_identity()["data"]["admin"]
        if admin == "1":
            estudiantes = obtener_estudiantes()
            if estudiantes['status'] == True :
                return jsonify(estudiantes), 200
            else :
                return jsonify(estudiantes), 400
        else: 
             return responseErrorServer({},False,"Acceso no autorizado"),401
    except Exception as e:
        return responseErrorServer()
    


@estudiantes_bp.route('/api/estudiantes_id/<int:id>', methods=['GET'])
@jwt_required()
def obtener_estudiante_por_id_controller(id):
    try :
        admin = get_jwt_identity()["data"]["admin"]
        if admin == "1":
            request_data = json.loads(request.data)
            estudiante = obtener_estudiante_por_id(id)
            if estudiante['status'] == True :
                return jsonify(estudiante), 200
            else :
                return jsonify(estudiante), 400
        else:
            id = get_jwt_identity()["data"]["id"]  
            estudiante = obtener_estudiante_por_id(id)
            if estudiante['status'] == True :
                return jsonify(estudiante), 200
            else :
                return jsonify(estudiante), 400
              
    except Exception as e:
        return responseErrorServer()


@estudiantes_bp.route('/api/estudiantes',  methods=['POST'])
@jwt_required()
def crear_estudianteController():
    try :
        request_data = json.loads(request.data)
        correo = sanitize_input(request_data.get('correo'))
        nombre = sanitize_input(request_data.get('nombre'))
        apellido1 = sanitize_input(request_data.get('apellido1'))
        apellido2 = sanitize_input(request_data.get('apellido2'))
        documento = sanitize_input(request_data.get('documento'))
        password = request_data.get('clave')
        password = password
        hashed_password = bcrypt.hash(password)
        datosEstudiante = {"correo": correo, "clave": hashed_password, "nombre": nombre, "apellido1": apellido1, "apellido2": apellido2, "documento":documento}
        admin = get_jwt_identity()["data"]["admin"]
        if admin == "1":     
            res = crear_estudiante(datosEstudiante)
            if res['status'] == True :
                return jsonify(res), 200
            else :
                return jsonify(res), 400
        else: 
             return response({},False,"Acceso no autorizado"),401
    except Exception as e:
       return responseErrorServer() 


@estudiantes_bp.route('/api/estudiantes/', methods=['PUT'])
@jwt_required()
def actualizar_estudiante_controller():
        request_data = json.loads(request.data)
        id = sanitize_input(request_data.get('id'))
        nombre = sanitize_input(request_data.get('nombre'))
        apellido1 = sanitize_input(request_data.get('apellido1'))
        apellido2 = sanitize_input(request_data.get('apellido2'))
        documento = sanitize_input(request_data.get('documento'))
        datosEstudiante = {"id": id,  "nombre": nombre, "apellido1": apellido1, "apellido2": apellido2, "documento":documento }
        admin = get_jwt_identity()["data"]["admin"]
        if admin == "1":     
            resp = actualizar_estudiante(datosEstudiante)
            if resp['status'] == True :
                return jsonify(resp), 200
            else :
                return jsonify(resp), 400
        else: 
             return response({},False,"Acceso no autorizado"),401
    

@estudiantes_bp.route('/api/estudiantes/<int:id>', methods=['DELETE'])
@jwt_required()
def eliminar_estudiante_controller(id):
    #token = current_user
    try :
        admin = get_jwt_identity()["data"]["admin"]
        if admin == "1":
            res = eliminar_estudiante(id)
            if res['status'] == True :
                return jsonify(res), 200
            else :
                return jsonify(res), 400
        else:
            return response({},False,"Acceso no autorizado"),401
    except Exception as e:
        return responseErrorServer(), 400

