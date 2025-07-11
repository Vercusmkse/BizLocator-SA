from flask import Flask, jsonify, request
import json
import os

app = Flask(__name__)

DATA_FILE = os.path.join(os.path.dirname(__file__), 'data', 'locations.json')

# Load data once at startup
with open(DATA_FILE, 'r') as f:
    LOCATIONS = json.load(f)

@app.route("/")
def home():
    return jsonify({"message": "BizLocator SA API is running!"})

@app.route("/recommend", methods=["GET"])
def recommend():
    location = request.args.get("location", "").lower()
    for loc in LOCATIONS:
        if loc["name"].lower() == location:
            # return full business plan info
            return jsonify({
                "location": loc["name"],
                "businesses": loc["recommended_businesses"]
            })
    return jsonify({"error": "Location not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
