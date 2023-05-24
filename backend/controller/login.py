from datetime import timedelta
from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required
from model.loginModel import login
from config.clean import sanitize_input
import json

from model.responseModel import response, responseErrorServer

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/api/login', methods=['POST'])
def login_controller():
    try :
        request_data = json.loads(request.data)
        username = request_data.get('usuario')
        password = request_data.get('clave')
        datosLoing = {"usuario": username, "clave": password}
        datos =  login(datosLoing)
        if datos['status']==True:
            #access_token = create_access_token(identity=username,expires_delta=60*60)
            access_token = create_access_token(identity=datos, expires_delta=timedelta(days=1), additional_claims={"jti": None})
            return jsonify({'access_token': access_token}), 200
        else:
            if datos['status'] == False:
                return jsonify(datos['Mensaje']), 401

    except Exception as e:
        return responseErrorServer(), 400