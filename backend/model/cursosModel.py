from config.conexion import obtener_conexion
from model.responseModel import  response, responseErrorServer
from model.usuariosModel import crearUsuario, verificarUsuario
def obtener_lista_cursos():
    try: 
        connection = obtener_conexion()
        cursor = connection.cursor()

        query = "SELECT c.id, c.codigo, c.nombre, c.creditos, c.descripcion FROM cursos c"
        cursor.execute(query)
        cursos = cursor.fetchall()
        cursor.close()
        connection.close()
        if cursos: 
            respuesta =response(cursos,True, "Listado cursos")
        else:
            respuesta =response({},True, "Listado cursos")

        return respuesta
    
    except Exception as e:
        return  responseErrorServer()
    
def obtener_lista_cursos_nogistrados(id):
    try: 
        connection = obtener_conexion()
        cursor = connection.cursor()

        query = "SELECT c.id, c.codigo, c.nombre, c.creditos, c.descripcion FROM cursos c WHERE  0 = (SELECT COUNT(*) FROM registro_cursos rc WHERE rc.idCurso = c.id AND rc.idEstudiante = %s)"
        cursor.execute(query, (id,))
        cursos = cursor.fetchall()
        cursor.close()
        connection.close()
        if cursos: 
            respuesta =response(cursos,True, "Listado cursos")
        else:
            respuesta =response({},True, "Listado cursos")

        return respuesta
    
    except Exception as e:
        return  responseErrorServer()


def obtener_curso(id):
    try: 
        connection = obtener_conexion()
        cursor = connection.cursor()
        query = "SELECT id, codigo, nombre, creditos, descripcion FROM cursos WHERE id = %s"
        cursor.execute(query, (id,))
        curso = cursor.fetchone()
        cursor.close()
        connection.close()
        if curso: 
            respuesta =response(curso,True, "curso")
        else:
            respuesta =response({},True, "curso")

        return respuesta
    
    except Exception as e:
        return  responseErrorServer()
    
def crearCurso(datos):
    try: 
        connection = obtener_conexion()
        cursor = connection.cursor()
        query = "INSERT INTO cursos(codigo, nombre, creditos, descripcion) VALUES (%s,%s,%s,%s)"
        cursor.execute(query, (datos["codigo"],datos["nombre"],datos["creditos"],datos["descripcion"],))
        id = cursor.lastrowid
        connection.commit()
        cursor.close()
        connection.close()
        return response(id,True,"Curso creado con exito")
    except Exception as e:
        return  responseErrorServer()
    
def actualizarCurso(datos):
    try: 
        connection = obtener_conexion()
        cursor = connection.cursor()
        query = "UPDATE cursos SET codigo = %s, nombre = %s, creditos = %s, descripcion = %s WHERE id = %s"
        cursor.execute(query, (datos["codigo"],datos["nombre"],datos["creditos"],datos["descripcion"],datos["id"],))
        id = cursor.lastrowid
        connection.commit()
        cursor.close()
        connection.close()
        resp = response(id,True,"Curso actualizado con exito")
        return resp
    except Exception as e:
        return  responseErrorServer()

def eliminar_curso(id):
    try:
            connection = obtener_conexion()
            cursor = connection.cursor()
            query = "DELETE FROM cursos WHERE id = %s"
            cursor.execute(query, (id,))
            connection.commit()
            cursor.close()
            connection.close()
            return response({},True,"Curdo elminiado")
    except Exception as e:
        return  responseErrorServer()