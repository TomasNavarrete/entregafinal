import json
from passlib.hash import bcrypt
from flask import Blueprint, jsonify,request
from model.adminModel import actualizarAdmin, crearAdmin, obtener_admin, obtener_lista_admin
from flask_jwt_extended import get_jwt_identity, jwt_required,current_user
from model.responseModel import response, responseErrorServer
from config.clean import sanitize_input

adminController = Blueprint('adminController', __name__)

@adminController.route('/api/admin_list', methods=['GET'])
@jwt_required()
def obtener_admis_controller():
    
    try :
        admin = get_jwt_identity()["data"]["admin"]
        if admin == "1":     
            adminlist = obtener_lista_admin()
            if adminlist['status'] == True :
                return jsonify(adminlist), 200
            else :
                return jsonify(adminlist), 400
        else: 
             return response({},False,"Acceso no autorizado"),401
    except Exception as e:
        return responseErrorServer(), 400

@adminController.route('/api/admin_id', methods=['GET'])
@jwt_required()
def obtener_admin_controller():
    
    try :
        admin = get_jwt_identity()["data"]["admin"]
        id = get_jwt_identity()["data"]["id"]
        if admin == "1":     
            adminlist = obtener_admin(id)
            if adminlist['status'] == True :
                return jsonify(adminlist), 200
            else :
                return jsonify(adminlist), 400
        else: 
             return response({},False,"Acceso no autorizado"),401
    except Exception as e:
        return responseErrorServer(), 400
    


@adminController.route('/api/admin', methods=['POST'])
@jwt_required()
def crear_admin():

    try :
        request_data = json.loads(request.data)
        correo = sanitize_input(request_data.get('correo'))
        nombre = sanitize_input(request_data.get('nombre'))
        password = request_data.get('clave')
        password = password
        hashed_password = bcrypt.hash(password)
        datosAdmin = {"correo": correo, "clave": hashed_password, "nombre": nombre}
        admin = get_jwt_identity()["data"]["admin"]
        if admin == "1":     
            resp = crearAdmin(datosAdmin)
            if resp['status'] == True :
                return jsonify(resp), 200
            else :
                return jsonify(resp), 400
        else: 
             return response({},False,"Acceso no autorizado"),401
    except Exception as e:
      return responseErrorServer(), 400    

@adminController.route('/api/admin', methods=['PUT'])
@jwt_required()
def actualizar_admin():
    try :
        request_data = json.loads(request.data)
        nombre = sanitize_input(request_data.get('nombre'))
        id = request_data.get('id')
        datosAdmin = {"nombre": nombre, "id": id}
        admin = get_jwt_identity()["data"]["admin"]
        if admin == "1":     
            resp = actualizarAdmin(datosAdmin)
            if resp['status'] == True :
                return jsonify(resp), 200
            else :
                return jsonify(resp), 400
        else: 
             return response({},False,"Acceso no autorizado"),401
    except Exception as e:
      return responseErrorServer(), 400 