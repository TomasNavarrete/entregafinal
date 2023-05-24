import bleach
from html import escape

def sanitize_input(input_data):
    escaped_data = escape(input_data)
    sanitized_data = bleach.clean(escaped_data, tags=[], attributes={}, protocols=[], strip=True)
    return sanitized_data