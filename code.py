from flask import Flask,jsonify, request
import json

task_constructor = Flask(__name__)

contacts = [
    {
        'id': 1,
        'Name': u'Raju',
        'Contact': u'9987644456', 
        'done': False
    },
    {
        'id': 2,
        'Name': u'Rahul',
        'Contact': u'9876543222', 
        'done': False
    }
]

@task_constructor.route("/")
def hello_world():
    return "Hello World!"

@task_constructor.route("/add-data", methods=["POST"])
def add_task():
    if not request.json:
        return jsonify({
            "status":"error",
            "message": "Please provide the data!"
        },400)

    task = {
        'id': contacts[-1]['id'] + 1,
        'Name': request.json['Name'],
        'Contact': request.json.get('Contact', ""),
        'done': False
    }
    contacts.append(task)
    return jsonify({
        "status":"success",
        "message": "Contact added succesfully!"
    })
    

@task_constructor.route("/get-data")
def get_task():
    return jsonify({
        "data" : contacts
    }) 

if (__name__ == "__main__"):
    task_constructor.run(debug = True)