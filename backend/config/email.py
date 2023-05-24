import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def enviar_correo(destinatario, asunto, mensaje):
    # Configuración del servidor SMTP
    servidor_smtp = ''
    puerto_smtp = 111
    usuario_smtp = ''
    contraseña_smtp = ''

    # Crear objeto de mensaje MIME
    mensaje_mime = MIMEMultipart()
    mensaje_mime['From'] = usuario_smtp
    mensaje_mime['To'] = destinatario
    mensaje_mime['Subject'] = asunto

    # Agregar el cuerpo del mensaje
    mensaje_mime.attach(MIMEText(mensaje, 'plain'))

    try:
        # Establecer conexión con el servidor SMTP utilizando SSL
        with smtplib.SMTP_SSL(servidor_smtp, puerto_smtp) as servidor:
            # Iniciar sesión en el servidor SMTP
            servidor.login(usuario_smtp, contraseña_smtp)

            # Enviar el mensaje
            servidor.send_message(mensaje_mime)

        print('El correo ha sido enviado exitosamente.')

    except Exception as e:
        print('Error al enviar el correo:')
