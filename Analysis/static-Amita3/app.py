from flask import Flask, render_template, jsonify
import pandas as pd

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_youtube_subscribers_data')
def get_youtube_subscribers_data():
    # Simulate loading and processing data
    df_youtube = pd.read_csv('./Resources/Dec_clean_category_data.csv')
    df_youtube['Subscribers'] = df_youtube['Subscribers'].str.replace('M', '').astype(float) / 1e6
    agg_data = df_youtube.groupby(['Category', 'Country'])['Subscribers'].sum().reset_index()
    pivot_data = agg_data.pivot_table(index="Category", columns="Country", values="Subscribers", aggfunc="sum", fill_value=0)
    
    # Convert pivot table to a format that can be easily used in JavaScript
    data = pivot_data.reset_index().to_dict(orient='records')
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
