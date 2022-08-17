import socketserver
import http.server

PORT = 8600

Handler = http.server.SimpleHTTPRequestHandler
#Handler = http.server.BaseHTTPRequestHandler
#Handler = http.server.CGIHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()