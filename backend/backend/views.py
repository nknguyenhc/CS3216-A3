from django.http import FileResponse, HttpRequest


def index(request: HttpRequest):
    return FileResponse(open('dist/index.html', 'rb'))


def favicon(request: HttpRequest):
    return FileResponse(open('dist/favicon.ico', 'rb'))
