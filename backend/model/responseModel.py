def response(datos, status, mensaje):
    rep = {"data": datos, "status": status, "Mensaje" : mensaje}
    return rep

def responseErrorServer():
    rep = {"data": {}, "status": False, "Mensaje" : "Error no esperado contacte con el administrador"}
    return rep