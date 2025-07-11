from flask import Flask, jsonify, request
from flask import send_from_directory

import json
import os

app = Flask(__name__)

DATA_FILE = os.path.join(os.path.dirname(__file__), 'data', 'locations.json')

# Load data once at startup
with open(DATA_FILE, 'r') as f:
    LOCATIONS = json.load(f)

@app.route("/api/business-plans")
def get_plans():
    location = request.args.get("location", "").lower()

    plans_by_location = {
        "soweto": [
            {
                "name": "Spaza Shop",
                "plan": {
                    "description": "A small shop in the community",
                    "startup_cost": "R5,000 - R10,000",
                    "requirements": ["License", "Shelves", "Stock"],
                    "potential": "Daily consistent income",
                    "pdf_file": "spaza_shop.pdf"
                }
            }
        ],
        "tembisa": [
            {
                "name": "Hair Salon",
                "plan": {
                    "description": "Affordable beauty and grooming services.",
                    "startup_cost": "R8,000",
                    "requirements": ["Hair tools", "Mirror", "Water"],
                    "potential": "Moderate to high",
                    "pdf_file": "hair_salon.pdf"
                }
            }
        ]
    }

    return jsonify({
        "businesses": plans_by_location.get(location, [])
    })

@app.route("/")
def home():
    return jsonify({"message": "BizLocator SA API is running!"})

@app.route("/pdf/<filename>")
def get_pdf(filename):
    return send_from_directory("pdfs", filename)


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
