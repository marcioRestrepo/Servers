from flask import Flask, render_template, json
from flask_cors import CORS, cross_origin
from flask import url_for
from flask import request
import http.server
import socketserver

app = Flask (__name__)
CORS(app)

Handler = http.server.SimpleHTTPRequestHandler

@app.route('/')
def index():
    return render_template('index.html') 



"""
@app.route('/model.json', methods=['GET', 'POST'])
def get_model():
    if request.method == 'GET':
        return render_template('model.json')
    else:
        return render_template('model.json')


@app.route('/weights.bin', methods=['GET', 'POST'])
def get_weights():
    if request.method == 'GET':
        return url_for('static', filename = 'weights.bin')
    else:
        return render_template('metadata.json')


@app.route('/metadata.json', methods = ['GET', 'POST'])
@cross_origin()
def get_metadata():
    return url_for('static', filename = 'metadata.json')


@app.route('/weights.bin')
@cross_origin()
def get_weights():
    return url_for('static', filename = 'weights.bin')



@app.route('/model.json', methods = ['GET', 'POST'])
@cross_origin()
def get_model():
    return render_template('model.json')


@app.route('/model.json', methods = ['GET', 'POST'])
def get_model():
    return url_for('static', filename = 'model.json')
"""
"""
@app.route('/metadata.json', methods = ['GET', 'POST'])
def get_metadata():
    return render_template('metadata.json')
"""



if __name__ == "__main__":
    app.run(debug=True)

