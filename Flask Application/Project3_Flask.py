from flask import Flask, render_template, jsonify
import json
from collections import OrderedDict
import pandas as pd

df = pd.read_csv('static/Resources/top_10_nov_dec.csv')

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

@app.route('/YouTube - Sept 2022')
def index1():
    return render_template('claire_youtube_barchart_map_v2_sept.html')

@app.route('/YouTube - Nov 2022')
def index2():
    return render_template('claire_youtube_barchart_map_v2_nov.html')

@app.route('/YouTube - Dec 2022')
def index3():
    return render_template('claire_youtube_barchart_map_v2_dec.html')

@app.route('/Claire')
def index4():
    return render_template('claire_geoplotting_AI.html')

@app.route('/Judith')
def index5():
    return render_template('Judith.html')

@app.route('/Amita')
def index6():
    return render_template('Amita.html')

@app.route('/Amita2')
def index7():
    return render_template('Amita2.html')

@app.route('/Luo')
def index8():
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
    df_youtube = pd.read_csv('static/Resources/Dec_clean_data_v2.csv')  # Adjust path as necessary
    country_counts = df_youtube['Country'].value_counts().reset_index()
    country_counts.columns = ['Country', 'Count']
    return jsonify(country_counts.to_dict(orient='records'))

@app.route('/sept_data')
def get_data5():
    # Load data from CSV file and return as JSON response
    data = pd.read_csv('static/Resources/Sept_clean_data_v2.csv').to_dict(orient='records')
    return jsonify(data)

@app.route('/nov_data')
def get_data6():
    # Load data from CSV file and return as JSON response
    data = pd.read_csv('static/Resources/Nov_clean_data_v2.csv').to_dict(orient='records')
    return jsonify(data)

@app.route('/dec_data')
def get_data7():
    # Load data from CSV file and return as JSON response
    data = pd.read_csv('static/Resources/Dec_clean_data_v2.csv').to_dict(orient='records')
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)