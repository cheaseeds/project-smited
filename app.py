from flask import Flask, jsonify, request
from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
import socket
import os

app = Flask(__name__)

#add_cors_headers and isOpen is needed for requests to interact with React front end
@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'OPTIONS, POST, GET, PUT, DELETE'
    return response

def isOpen(ip, port):
   test = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
   try:
      test.connect((ip, int(port)))
      test.shutdown(1)
      return True
   except:
      return False

def fakeLoadBalancer():
    ips = []
    port = 9042
    for ip in os.environ.get('CASSANDRA_SEEDS').split(','):
        if isOpen(ip, port):
            ips.append(ip)
    return ips

@app.route('/',methods = ['GET'])
def cassandra():
    #setup the cluser and connect to the session
    cluster = Cluster(fakeLoadBalancer(), port=9042, auth_provider=PlainTextAuthProvider(username='cassandra', password=os.environ.get('CASSANDRA_PASSWORD')))
    session = cluster.connect('sampledata', wait_for_all_pools=False)
    session.execute('USE sampledata')
    result = session.execute('SELECT * FROM patient')
    rows = []
    for row in result:
        row_data = {
            "disease": row.disease,
            "fever": row.fever,
            "cough": row.cough,
            "fatigue": row.fatigue,
            "difficulty_breathing": row.difficulty_breathing,
            "age": row.age,
            "gender": row.gender,
            "blood_pressure": row.blood_pressure,
            "cholesterol_level": row.cholesterol_level,
            "outcome_variable": row.outcome_variable,
        }
        rows.append(row_data)
    app.logger.info(rows)
    print(rows)
    return jsonify(rows)

@app.route('/submit', methods=['POST'])
def submit_form():
    #setup the cluser and connect to the session

    cluster = Cluster(fakeLoadBalancer(), port=9042, auth_provider=PlainTextAuthProvider(username='cassandra', password=os.environ.get('CASSANDRA_PASSWORD')))
    session = cluster.connect('sampledata', wait_for_all_pools=False)
    session.execute('USE sampledata')
    data = request.get_json()

    #query to execute within cassandra
    #%s are values retrieve from the form request made to the flask server
    session.execute(
        """
        INSERT INTO sampledata.patient
        (patient_id, disease, fever, cough, fatigue, difficulty_breathing, age, gender, blood_pressure, cholesterol_level, outcome_variable)
        VALUES (uuid(), %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """,
        (
            data['disease'],
            data['fever'],
            data['cough'],
            data['fatigue'],
            data['difficultyBreathing'],
            int(data['age']),
            data['gender'],
            data['bloodPressure'],
            data['cholesterolLevel'],
            data['outcomeVariable'],
        ),
    )
    app.logger.info(data)
    return jsonify({"success": True}), 200
    
@app.route('/query',methods = ['POST']) 
def query_db():
    #setup the cluser and connect to the session
    cluster = Cluster(fakeLoadBalancer(), port=9042, auth_provider=PlainTextAuthProvider(username='cassandra', password=os.environ.get('CASSANDRA_PASSWORD')))
    session = cluster.connect('sampledata', wait_for_all_pools=False)
    session.execute('USE sampledata')
    result = session.execute('SELECT * FROM patient')
    form_data = request.get_json()
    target_disease = form_data.get('disease', '') #set filter for diseases (can be readjusted to any column of choice)

    rows = []
    for row in result:
        if row.disease == target_disease:
            row_data = {
                "disease": row.disease,
                "fever": row.fever,
                "cough": row.cough,
                "fatigue": row.fatigue,
                "difficulty_breathing": row.difficulty_breathing,
                "age": row.age,
                "gender": row.gender,
                "blood_pressure": row.blood_pressure,
                "cholesterol_level": row.cholesterol_level,
                "outcome_variable": row.outcome_variable,
            }
            rows.append(row_data) #add row to rows list 
            
    app.logger.info(rows)
    print(rows)
    return jsonify(rows)


if __name__=='__main__':
      app.run(debug=True,host='0.0.0.0',port=5555)
