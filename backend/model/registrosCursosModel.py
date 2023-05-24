
from config.conexion import obtener_conexion
from model.responseModel import response, responseErrorServer


def obtenerRegistrosEstudiante(idEstudiante):
    try: 
        connection = obtener_conexion()
        cursor = connection.cursor()
        query = "SELECT rc.idCurso, rc.idEstudiante, c.codigo, c.nombre FROM registro_cursos rc LEFT JOIN cursos c ON rc.idCurso = c.id WHERE rc.idEstudiante = %s"
        cursor.execute(query, (idEstudiante,))
        cursos = cursor.fetchall()
        cursor.close()
        connection.close()
        return response(cursos,True,"Listado cursos registrados")
    except Exception as e:
        return  responseErrorServer()
    
def obtenerRegistrosCursos(idCurso):
    try: 
        connection = obtener_conexion()
        cursor = connection.cursor()
        query = "SELECT rc.idCurso, rc.idEstudiante, c.codigo, c.nombre, es.nombre, es.documento, es.apellido1, es.apellido2 FROM registro_cursos rc LEFT JOIN cursos c ON rc.idCurso = c.id LEFT JOIN estudiantes es ON rc.idEstudiante = es.id WHERE rc.idCurso = %s"
        cursor.execute(query, (idCurso,))
        cursos = cursor.fetchall()
        cursor.close()
        connection.close()
        return response(cursos,True,"estudiantes por curso")
    except Exception as e:
        return  responseErrorServer()

def registrarCurso(datos):
    try: 
        connection = obtener_conexion()
        cursor = connection.cursor()
        query = "INSERT INTO registro_cursos(idCurso, idEstudiante) VALUES (%s,%s)"
        cursor.execute(query, (datos["idCurso"],datos["idEstudiante"],))
        id = cursor.lastrowid
        connection.commit()
        cursor.close()
        connection.close()
        return response(id,True,"Registro de curso exitoso")
    except Exception as e:
        return  responseErrorServer()