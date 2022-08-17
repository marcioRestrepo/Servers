from flask import Flask, json, request
from flask_cors import CORS, cross_origin

app = Flask (__name__)
#CORS(app)

@app.route('/', methods = ["GET"])
def index():
    return "values there: http://localhost:5000/values"


values = [
   {"Id": "Astrazina", "defectusosa": True, "prediccion": 0, "camara":1},
   {"Id": "Astrazina", "defectusosa": False, "prediccion": 0, "camara":2}
]


@app.route('/values', methods = ["GET"])
def get_values():
    return json.dumps(values, ensure_ascii = False)


@app.route("/send_values1", methods = ["POST"])
def inset_values1():
    data1 = request.get_json(force=True)
    print(data1)
    values[0] = data1
    print(values)
    return json.dumps({"status": True, "msg": 'Datos guardados correctamente'}, ensure_ascii=False)


@app.route("/send_values2", methods = ["POST"])
def inset_values2():
    data2 = request.get_json(force=True)
    print(data2)
    values[1] = data2
    print(values)
    return json.dumps({"status": True, "msg": 'Datos guardados correctamente'}, ensure_ascii=False)


if __name__ == "__main__":
    app.run(debug = True)
