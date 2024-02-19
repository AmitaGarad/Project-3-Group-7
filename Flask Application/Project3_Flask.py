from flask import Flask, render_template, jsonify
import json

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    return render_template('Home.html')

@app.route('/part1')
def index():
    return render_template('Luo.html')

@app.route('/AI_Info')
def get_data1():
    # Load data from JSON file and return as JSON response
    with open('static/Resources/output.json', 'r') as f:
        data = json.load(f)
    return jsonify(data)

@app.route('/AI_200_Info')
def get_data2():
    # Load data from JSON file and return as JSON response
    with open('static/Resources/AI_Influencer_200.json', 'r') as f:
        data = json.load(f)
    return jsonify(data)

@app.route('/Category_Data')
def get_data3():
    # Load data from JSON file and return as JSON response
    with open('static/Resources/Category_Summary.json', 'r') as f:
        data = json.load(f)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)