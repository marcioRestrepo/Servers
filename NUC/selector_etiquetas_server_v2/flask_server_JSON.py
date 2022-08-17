from flask import Flask, json, request
from flask_cors import CORS, cross_origin

app = Flask (__name__)
#CORS(app)

@app.route('/', methods = ["GET"])
def index():
    return "values there: http://localhost:5000/values"


values = [
   {"Id": "Astrazina", "defectusosa": False, "prediccion": 0, "camara":0}
]


@app.route('/values', methods = ["GET"])
def get_values():
    return json.dumps(values, ensure_ascii = False)


@app.route("/send_values", methods = ["POST"])
def inset_values():
    data = request.get_json(force=True)
    print(data)
    values[0] = data
    print(values)
    return json.dumps({"status": True, "msg": 'Datos guardados correctamente'}, ensure_ascii=False)


if __name__ == "__main__":
    app.run(debug = True)
