import os
import joblib
import pickle
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for React communication

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load pre-trained models
sentiment_model_path = os.path.join(BASE_DIR, 'models', 'sentiment_model.pkl')
clustering_model_path = os.path.join(BASE_DIR, 'models', 'clustering_model.pkl')
engagement_model_path = os.path.join(BASE_DIR, 'models', 'engagement_model.pkl')

sentiment_analyzer = SentimentIntensityAnalyzer()
vectorizer = TfidfVectorizer()
kmeans = KMeans(n_clusters=5, random_state=42, n_init=10)
rf_model = pickle.load(open(engagement_model_path, "rb")) if os.path.exists(engagement_model_path) else None

@app.route('/predict_sentiment', methods=['POST'])
def predict_sentiment():
    data = request.json
    text = data.get("text", "")
    sentiment_score = sentiment_analyzer.polarity_scores(text)["compound"]
    sentiment_label = "Positive" if sentiment_score > 0.05 else ("Negative" if sentiment_score < -0.05 else "Neutral")
    return jsonify({"sentiment_score": sentiment_score, "sentiment_label": sentiment_label})

@app.route('/predict_hashtag_cluster', methods=['POST'])
def predict_hashtag_cluster():
    data = request.json
    hashtags = data.get("hashtags", "").strip()
    X = vectorizer.transform([hashtags])
    cluster = kmeans.predict(X)[0]
    return jsonify({"cluster": int(cluster)})

@app.route('/predict_engagement', methods=['POST'])
def predict_engagement():
    data = request.json
    likes = float(data.get("likes", 0))
    shares = float(data.get("shares", 0))
    comments = float(data.get("comments", 0))
    
    if rf_model:
        predicted_engagement = rf_model.predict(np.array([[likes, shares, comments]]))[0]
        return jsonify({"predicted_engagement": float(predicted_engagement)})
    
    return jsonify({"error": "Model not loaded"}), 500

if __name__ == '__main__':
    app.run(debug=True)
