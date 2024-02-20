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

@app.route('/YouTube - Sept 2022')
def index():
    return render_template('claire_youtube_barchart_map_v2_sept.html')

@app.route('/YouTube - Nov 2022')
def index1():
    return render_template('claire_youtube_barchart_map_v2_nov.html')

@app.route('/YouTube - Dec 2022')
def index2():
    return render_template('claire_youtube_barchart_map_v2_dec.html')

@app.route('/Claire')
def index3():
    return render_template('claire_geoplotting_AI.html')

@app.route('/Judith')
def index5():
    return render_template('Judith.html')

@app.route('/Amita')
def index6():
    return render_template('Amita.html')

@app.route('/Amita2')
<<<<<<< HEAD:Project3_Flask.py
def index7():
=======
def index():
>>>>>>> 0379980c3cf19d390bb94e1a1d0837e531838709:Flask Application/Project3_Flask.py
    return render_template('Amita2.html')

@app.route('/Sonya')
def index8():
    return 'Sonya'

@app.route('/Luo')
def index9():
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
<<<<<<< HEAD:Project3_Flask.py
    df_youtube = pd.read_csv('./Resources/Dec_clean_data_v2.csv')
=======
    df_youtube = pd.read_csv('./Resources/Dec_clean_data_v2.csv')  # Adjust path as necessary
>>>>>>> 0379980c3cf19d390bb94e1a1d0837e531838709:Flask Application/Project3_Flask.py
    country_counts = df_youtube['Country'].value_counts().reset_index()
    country_counts.columns = ['Country', 'Count']
    return jsonify(country_counts.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)