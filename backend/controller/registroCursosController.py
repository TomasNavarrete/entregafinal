import json
from flask import Blueprint, jsonify,request
from flask_jwt_extended import get_jwt_identity, jwt_required,current_user
from model.registrosCursosModel import obtenerRegistrosCursos, obtenerRegistrosEstudiante, registrarCurso
from model.responseModel import response, responseErrorServer
from config.clean import sanitize_input
registroCursosController = Blueprint('registroCursosController', __name__)

@registroCursosController.route('/api/registrar_cursos/<int:id>', methods=['GET'])
@jwt_required()
def obtener_cursos_list(id):
    
    try :
        admin = get_jwt_identity()["data"]["admin"]
        if(admin == "1"):
            cursos = obtenerRegistrosCursos(id)
            if cursos['status'] == True :
                return jsonify(cursos), 200
            else :
                return jsonify(cursos), 400
        else :
                id = get_jwt_identity()["data"]["id"]  
                cursos =  obtenerRegistrosEstudiante(id)
                if cursos['status'] == True :
                    return jsonify(cursos), 200
                else :
                    return jsonify(cursos), 400
    except Exception as e:
        return responseErrorServer(), 400

@registroCursosController.route('/api/registrar_cursos_estudiante/<int:id>', methods=['GET'])
@jwt_required()
def obtener_cursos_list_estudiante(id):
    
    try :
        admin = get_jwt_identity()["data"]["admin"]
        if(admin == "1"):
            cursos = obtenerRegistrosEstudiante(id)
            if cursos['status'] == True :
                return jsonify(cursos), 200
            else :
                return jsonify(cursos), 400
        else :
              return jsonify({"mensaje": "Acceso no valido", "status": False}), 400
    except Exception as e:
        return responseErrorServer(), 400
    


@registroCursosController.route('/api/registro_cursos', methods=['POST'])
@jwt_required()
def registrar_curso():

    try :
        request_data = json.loads(request.data)
        idCurso = sanitize_input(request_data.get('idCurso'))
        idEstudiante = get_jwt_identity()["data"]["id"]
        datosCurso = {"idCurso": idCurso, "idEstudiante": idEstudiante}
        estudiante = get_jwt_identity()["data"]["estudiante"]
        if estudiante == "1":     
            resp = registrarCurso(datosCurso)
            if resp['status'] == True :
                return jsonify(resp), 200
            else :
                return jsonify(resp), 400
        else: 
             return response({},False,"Acceso no autorizado"),401
    except Exception as e:
      return responseErrorServer(), 400    

