from config.conexion import obtener_conexion
from model.responseModel import  response, responseErrorServer
from model.usuariosModel import crearUsuario, verificarUsuario
def obtener_lista_admin():
    try: 
        connection = obtener_conexion()
        cursor = connection.cursor()

        query = "SELECT id, nombre, correo FROM admin"
        cursor.execute(query)
        admins = cursor.fetchall()
        cursor.close()
        connection.close()
        if admins: 
            respuesta =response(admins,True, "Listado admins")
        else:
            respuesta =response({},True, "Listado admins")

        return respuesta
    
    except Exception as e:
        return  responseErrorServer()

def obtener_admin(id):
    try: 
        connection = obtener_conexion()
        cursor = connection.cursor()
        query = "SELECT id, nombre, correo FROM admin WHERE id = %s"
        cursor.execute(query, (id,))
        admin = cursor.fetchone()
        cursor.close()
        connection.close()
        if admin: 
            respuesta =response(admin,True, "admin")
        else:
            respuesta =response({},True, "admin")

        return respuesta
    
    except Exception as e:
        return  responseErrorServer()
    
def crearAdmin(datos):
    try: 
        connection = obtener_conexion()
        cursor = connection.cursor()
        resp = verificarUsuario(datos["correo"])
        if resp['status'] == True :
            query = "INSERT INTO admin(nombre, correo) VALUES (%s,%s)"
            cursor.execute(query, (datos["nombre"],datos["correo"],))
            id = cursor.lastrowid
            connection.commit()
            cursor.close()
            connection.close()
            datosUsuario = {"usuario": datos["correo"],"clave": datos["clave"],"estudiante_id": None, "usuarioAdmin_id" : id}
            crearUsuario(datosUsuario)
            resp = response(id,True,"Usuario creado con exito")
        
        return resp
    
    except Exception as e:
        return  responseErrorServer()
    
def actualizarAdmin(datos):
    try: 
        connection = obtener_conexion()
        cursor = connection.cursor()
        query = "UPDATE admin SET nombre = %s WHERE id = %s"
        cursor.execute(query, (datos["nombre"],datos["id"],))
        id = cursor.lastrowid
        connection.commit()
        cursor.close()
        connection.close()
        resp = response(id,True,"Usuario actualizado con exito")
        return resp
    except Exception as e:
        return  responseErrorServer()