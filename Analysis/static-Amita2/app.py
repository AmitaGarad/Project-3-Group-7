from flask import Flask, render_template, jsonify
import pandas as pd
import plotly.express as px


app = Flask(__name__, static_url_path='/static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data')
def data():
    df_youtube = pd.read_csv('./Resources/Dec_clean_data_v2.csv')  # Adjust path as necessary
    country_counts = df_youtube['Country'].value_counts().reset_index()
    country_counts.columns = ['Country', 'Count']
    return jsonify(country_counts.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)