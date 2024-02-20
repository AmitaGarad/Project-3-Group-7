from flask import Flask, render_template, jsonify
import pandas as pd

app = Flask(__name__)

# Load the dataset
df = pd.read_csv('./Resources/top_10_nov_dec.csv')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_youtuber_data')
def get_youtuber_data():
    # Convert the DataFrame to a JSON format
    data = df.to_dict(orient='records')
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)