import json
from passlib.hash import bcrypt
from flask import Blueprint, jsonify,request
from flask_jwt_extended import get_jwt_identity, jwt_required,current_user
from model.cursosModel import actualizarCurso, crearCurso, eliminar_curso, obtener_curso, obtener_lista_cursos, obtener_lista_cursos_nogistrados
from model.responseModel import response, responseErrorServer
from config.clean import sanitize_input
cursosController = Blueprint('cursosController', __name__)

@cursosController.route('/api/cursos', methods=['GET'])
@jwt_required()
def obtener_cursos_list():
    
    try :
        admin = get_jwt_identity()["data"]["admin"]
        if(admin == "1"):
            cursos = obtener_lista_cursos()
            if cursos['status'] == True :
                return jsonify(cursos), 200
            else :
                return jsonify(cursos), 400
        else :
                id = get_jwt_identity()["data"]["id"]  
                cursos =  obtener_lista_cursos_nogistrados(id)
                if cursos['status'] == True :
                    return jsonify(cursos), 200
                else :
                    return jsonify(cursos), 400
    except Exception as e:
        return responseErrorServer(), 400

@cursosController.route('/api/cursos/<int:id>', methods=['GET'])
@jwt_required()
def obtener_cursos(id):
    
    try :  
            curso = obtener_curso(id)
            if curso['status'] == True :
                return jsonify(curso), 200
            else :
                return jsonify(curso), 400
    except Exception as e:
        return responseErrorServer(), 400
    


@cursosController.route('/api/cursos', methods=['POST'])
@jwt_required()
def crear_cursos():

    try :
        request_data = json.loads(request.data)
        codigo = sanitize_input(request_data.get('codigo'))
        nombre = sanitize_input(request_data.get('nombre'))
        creditos = sanitize_input(request_data.get('creditos'))
        descripcion = sanitize_input(request_data.get('descripcion'))
        datosCurso = {"codigo": codigo, "creditos": creditos, "nombre": nombre , "descripcion": descripcion}
        admin = get_jwt_identity()["data"]["admin"]
        if admin == "1":     
            resp = crearCurso(datosCurso)
            if resp['status'] == True :
                return jsonify(resp), 200
            else :
                return jsonify(resp), 400
        else: 
             return response({},False,"Acceso no autorizado"),401
    except Exception as e:
      return responseErrorServer(), 400    

@cursosController.route('/api/cursos', methods=['PUT'])
@jwt_required()
def actualizar_curso():
    #try :
        request_data = json.loads(request.data)
        id = sanitize_input(request_data.get('id'))
        codigo = sanitize_input(request_data.get('codigo'))
        nombre = sanitize_input(request_data.get('nombre'))
        creditos = sanitize_input(request_data.get('creditos'))
        descripcion = sanitize_input(request_data.get('descripcion'))
        datosCurso = {"id": id,"codigo": codigo, "creditos": creditos, "nombre": nombre , "descripcion": descripcion}
        admin = get_jwt_identity()["data"]["admin"]
        if admin == "1":     
            resp = actualizarCurso(datosCurso)
            if resp['status'] == True :
                return jsonify(resp), 200
            else :
                return jsonify(resp), 400
        else: 
             return response({},False,"Acceso no autorizado"),401
    #except Exception as e:
    #  return responseErrorServer(), 400

@cursosController.route('/api/cursos/<int:id>', methods=['DELETE'])
@jwt_required()
def eliminar_estudiante_controller(id):
    
    try :
        admin = get_jwt_identity()["data"]["admin"]
        if admin == "1":
            res = eliminar_curso(id)
            if res['status'] == True :
                return jsonify(res), 200
            else :
                return jsonify(res), 400
        else:
            return response({},False,"Acceso no autorizado"),401
    except Exception as e:
        return responseErrorServer(), 400