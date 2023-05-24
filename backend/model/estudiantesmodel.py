from config.conexion import obtener_conexion
from model.responseModel import response, responseErrorServer
from model.usuariosModel import crearUsuario, eliminar_usuario_estudiante, verificarUsuario

def obtener_estudiantes():
    try:
        connection = obtener_conexion()
        cursor = connection.cursor()
        query = "SELECT es.id, es.documento, es.nombre, es.apellido1, es.apellido2, us.usuario FROM estudiantes es JOIN usuarios us ON es.id = us.estudiante_id"
        cursor.execute(query)
        estudiantes = cursor.fetchall()
        cursor.close()
        connection.close()

        if estudiantes: 
            respuesta = response(estudiantes, True, "Listado estudiantes")
            return respuesta
        else:
            respuesta = response({}, True, "Listado estudiantes")
            return respuesta

    except Exception as e:
        return responseErrorServer()
    
def obtener_estudiante_por_id(estudiante_id):
    try:    
        connection = obtener_conexion()
        cursor = connection.cursor()
        query = "SELECT es.id, es.documento, es.nombre, es.apellido1, es.apellido2, us.usuario FROM estudiantes es  JOIN usuarios us ON es.id = us.estudiante_id WHERE es.id = %s"
        cursor.execute(query, (estudiante_id,))
        estudiante = cursor.fetchone()
        cursor.close()
        connection.close()
        if estudiante: 
            respuesta = response(estudiante,True, "Listado estudiante")
            return respuesta
        else:
            respuesta =response({},True, "Listado estudiante")
            return respuesta
    except Exception as e:
        return  responseErrorServer()

def crear_estudiante(estudiante):
    try:
        connection = obtener_conexion()
        cursor = connection.cursor()
        resp = verificarUsuario(estudiante["correo"])
        if resp['status'] == True :
            query = "INSERT INTO estudiantes (documento, nombre,apellido1, apellido2) VALUES (%s, %s, %s, %s)"
            cursor.execute(query, (estudiante['documento'], estudiante['nombre'],estudiante['apellido1'],estudiante['apellido2'],))
            id = cursor.lastrowid
            connection.commit()
            cursor.close()
            connection.close()
            datosUsuario = {"usuario": estudiante["correo"],"clave": estudiante["clave"],"estudiante_id": id, "usuarioAdmin_id" : None}
            crearUsuario(datosUsuario)
            resp = response(id,True,"Usuario creado con exito")
            return resp
        else : 
            return  resp
           
    except Exception as e:
        return  responseErrorServer()

def actualizar_estudiante(estudiante):
    try:
        connection = obtener_conexion()
        cursor = connection.cursor()
        query = "UPDATE estudiantes SET documento = %s, nombre = %s, apellido1 = %s, apellido2 = %s WHERE id = %s" 
        cursor.execute(query, (estudiante['documento'], estudiante['nombre'],estudiante['apellido1'],estudiante['apellido2'],estudiante['id']))
        connection.commit()
        cursor.close()
        connection.close()
        return response({},True,"Estudiante actualizado con exito")
    except Exception as e:
        return  responseErrorServer()


def eliminar_estudiante(estudiante_id):
    try:
        res = eliminar_usuario_estudiante(estudiante_id)
        if res["status"] ==True : 
            connection = obtener_conexion()
            cursor = connection.cursor()
            query = "DELETE FROM estudiantes WHERE id = %s"
            cursor.execute(query, (estudiante_id,))
            connection.commit()
            cursor.close()
            connection.close()
            return response({},True,"Estudiante eliminado")
        else:
            return res
    except Exception as e:
        return  responseErrorServer()