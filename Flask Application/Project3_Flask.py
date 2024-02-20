from flask import Flask, render_template, jsonify
import json
from collections import OrderedDict
import pandas as pd

df = pd.read_csv('./Resources/top_10_nov_dec.csv')

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
app.json.sort_keys = False

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    return render_template('Home.html')

@app.route('/Claire')
def index():
    return 'Claire'

@app.route('/Judith')
def index():
    return render_template('Judith.html')

@app.route('/Amita')
def index():
    return render_template('Amita.html')

@app.route('/Amita2')
def index():
    return render_template('Amita2.html')

@app.route('/Sonya')
def index():
    return 'Sonya'

@app.route('/Luo')
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

@app.route('/Subset_AI_Data')
def get_data4():
    # Load data from JSON file and return as JSON response
    with open('static/Resources/subset_AI.json', 'r') as f:
        data = json.load(f)
    return jsonify(data)

@app.route('/get_youtuber_data')
def get_youtuber_data():
    # Convert the DataFrame to a JSON format
    data = df.to_dict(orient='records')
    return jsonify(data)

@app.route('/Amita_data')
def data():
    df_youtube = pd.read_csv('./Resources/Dec_clean_data_v2.csv')  # Adjust path as necessary
    country_counts = df_youtube['Country'].value_counts().reset_index()
    country_counts.columns = ['Country', 'Count']
    return jsonify(country_counts.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)