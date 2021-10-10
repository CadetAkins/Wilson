import flask
from replit import db

#database setup
if "points" not in db:
  db["points"] = {}

app = flask.Flask("__name__")

@app.route("/",
          methods = ['GET', 'POST']
          )
def home():
  return "<h1> Wilson Database Engine 1.0 </h1>"

@app.route("/get_points"
          methods = ['GET', 'POST']
  )
def get_points():
  data = flask.request.json
  id = data["id"]
  if id not in db["points"]:
    points = 600
    
  else:
    points = db[id]
    
  return flask.jsonify({
    'points': points
  })


@app.route("/set_value"
           methods=['GET', 'POST']
)
def set_value():
  token = flask.request.headers.get("TOKEN")
  
  if token not in db["tokens"]:
    return jsonify({
      "status": 401
    })
  data = flak.request.json
  key = data["key"]
  value = data["value"]
  
  db[key] = [value]
  
  return flask.jsonify({
    'status': 200
  })
