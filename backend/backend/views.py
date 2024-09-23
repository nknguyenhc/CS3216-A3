from django.http import FileResponse, HttpRequest


def index(request: HttpRequest):
    return FileResponse(open('dist/index.html', 'rb'))


def favicon(request: HttpRequest):
    return FileResponse(open('dist/favicon.ico', 'rb'))


def handler404(request: HttpRequest, exception):
    return FileResponse(open('dist/index.html', 'rb'))
