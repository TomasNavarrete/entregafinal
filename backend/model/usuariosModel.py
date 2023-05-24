from config.conexion import obtener_conexion
from model.responseModel import response, responseErrorServer

def crearUsuario(datosUsuario):
    try:
        connection = obtener_conexion()
        cursor = connection.cursor()
        query = "INSERT INTO usuarios (usuario, clave,estudiante_id, usuarioAdmin_id) VALUES (%s, %s, %s, %s)"
        values = (datosUsuario['usuario'], datosUsuario['clave'],datosUsuario['estudiante_id'],datosUsuario['usuarioAdmin_id'])
        cursor.execute(query, values)
        # Confirma los cambios en la base de datos
        connection.commit()
        cursor.close()
        connection.close()
    except Exception as e:
        return responseErrorServer()

def verificarUsuario(usuario):
    try:
        connection = obtener_conexion()
        cursor = connection.cursor()
        query = "SELECT usuario FROM usuarios WHERE usuario = %s"
        cursor.execute(query, (usuario,))
        usuario = cursor.fetchone()
        # Confirma los cambios en la base de datos
        cursor.close()
        connection.close()
        if usuario :
         repn = response({},False,"Usuario ya creado anteriormente") 
         return  repn
        else:
          repn = response({},True,"") 
          return  repn
    except Exception as e:
        return responseErrorServer()


def eliminar_usuario_estudiante(id):
    try:
        connection = obtener_conexion()
        cursor = connection.cursor()
        query = "DELETE FROM usuarios WHERE estudiante_id = %s"
        cursor.execute(query, (id,))
        connection.commit()
        cursor.close()
        connection.close()
        return response({},True,"Usuario Eliminado")
    except Exception as e:
        return  responseErrorServer()

    
    