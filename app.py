from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load Zillow ZIP data
df = pd.read_csv("data/zhvi_zip.csv")
df["RegionName"] = df["RegionName"].astype(str)

@app.route("/zip-insight")
def zip_insight():
    zip_code = request.args.get("zip")

    if not zip_code:
        return jsonify({"error": "No ZIP provided"}), 400

    row = df[df["RegionName"] == zip_code]

    if row.empty:
        return jsonify({"error": "ZIP not found"}), 404

    # Latest ZHVI value (last non-null column)
    latest_value = row.iloc[0].dropna().iloc[-1]
    avg_value = int(latest_value)

    city = row.iloc[0].get("City", "")
    state = row.iloc[0].get("State", "")

    return jsonify({
        "zip": zip_code,
        "city": city,
        "state": state,
        "avg_home_value": avg_value
    })

if __name__ == "__main__":
    app.run(debug=True)
