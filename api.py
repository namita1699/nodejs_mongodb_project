import flask
from flask import jsonify,request
import pymongo 
import json
app=flask.Flask(__name__)
app.config["Debug"]=True

@app.route('/', methods=['GET'])
def home():
    client = pymongo.MongoClient("mongodb://localhost:27017/") 
    db = client["movies"] 
    col = db["mymovies"] 
    y=[]
    x = col.find() 
    for q in x:
        y.append({'name':q["name"],'image':q["img"],'summary':q["summary"]})
    return jsonify(y)

@app.route('/Find', methods=['GET'])
def api_id():
    client = pymongo.MongoClient("mongodb://localhost:27017/") 
    db = client["movies"] 
    col = db["mymovies"] 
    if 'name' in request.args:
        name = request.args['name']
    else:
        return "Error: No name field provided. Please specify an name."
    results = []
    x=col.find({"name":name})
    for q in x:
        results.append({'name':q["name"],'image':q["img"],'summary':q["summary"]})
    return jsonify(results)
app.run()
