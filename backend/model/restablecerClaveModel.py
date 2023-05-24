from passlib.hash import bcrypt
from config.conexion import obtener_conexion
from model.responseModel import  response, responseErrorServer

def validar(datosUsuario):
    try:
        connection = obtener_conexion()
        cursor = connection.cursor()
        query = "SELECT usuario FROM usuarios WHERE usuario = %s"
        cursor.execute(query, (datosUsuario['usuario'],))
        usuario = cursor.fetchone()
        cursor.close()
        connection.close()
        
        if usuario : 
                data =  {"usuario": usuario[0],"establecer": "1"} 
                respuesta = response(data , True, "Si es un usuario registrado le llegara un correo")    
        else:
                data = {}
                respuesta = response(data , False, "Si es un usuario registrado le llegara un correo")
        
        return respuesta
    
    except Exception as e:
        return responseErrorServer()
    
def restabelcer(datosUsuario):
    try:
        connection = obtener_conexion()
        cursor = connection.cursor()
        query = "UPDATE usuarios SET clave = %s WHERE usuario = %s"
        cursor.execute(query, (datosUsuario['clave'],datosUsuario['usuario'],))
        connection.commit()
        cursor.close()
        connection.close()
        
        respuesta = response({} , True, "clave actualizada con exito") 
        return   respuesta
 
    except Exception as e:
        return responseErrorServer()