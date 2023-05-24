from passlib.hash import bcrypt
from config.conexion import obtener_conexion
from model.responseModel import  response, responseErrorServer

def login(datosUsuario):
    try:
        connection = obtener_conexion()
        cursor = connection.cursor()
        query = "SELECT usuario, clave, estudiante_id, usuarioAdmin_id FROM usuarios WHERE usuario = %s"
        cursor.execute(query, (datosUsuario['usuario'],))
        usuario = cursor.fetchone()
        cursor.close()
        connection.close()
        
        if usuario : 
            if bcrypt.verify(datosUsuario['clave'], usuario[1]) :
                if usuario[2] == None:
                    data =  {"admin": "1", "estudiante": "0", "id": usuario[3]} 
                    respuesta = response(data , True, "Logeo Exitoso")    
                else :
                    if usuario[3] == None:
                        data =  {"admin": "0", "estudiante": "1", "id": usuario[2]}
                        respuesta = response(data , True, "Logeo Exitoso")
            else :
                data = {"admin": "0", "estudiante": "0"}
                respuesta = response(data , False, "Clave no valida")
        else:
                data = {"admin": "0", "estudiante": "0"}
                respuesta = response(data , False, "Usuario no valido")
        
        return respuesta
    
    except Exception as e:
        return responseErrorServer()

    