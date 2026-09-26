from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
from datetime import datetime

app = FastAPI(
    title="ROV-BOT AI Agriculture Network API",
    description="Digital Public Infrastructure for Precision Agriculture, Autonomous Robotics, and Crop Intelligence in India",
    version="2.0.0"
)

# Enable CORS for Next.js / Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Schemas ---
class CropRecommendRequest(BaseModel):
    state: str
    district: str
    village: Optional[str] = None
    soil_type: str
    ph: float
    nitrogen: float
    phosphorus: float
    potassium: float
    organic_carbon: float
    moisture: float
    temperature: float
    rainfall: float
    previous_crop: str

class RobotCommandRequest(BaseModel):
    robot_id: str
    command: str  # start, pause, return_home, emergency_stop, switch_tool
    attachment: Optional[str] = None

class DiseaseDiagnosisRequest(BaseModel):
    crop_name: str
    image_base64: Optional[str] = None
    symptoms_text: Optional[str] = None

# --- API Endpoints ---

@app.get("/")
def read_root():
    return {
        "platform": "ROV-BOT AI Agriculture Network (AgriNet AI)",
        "status": "online",
        "version": "2.0.0",
        "dpi_registry": "AgriStack Open Protocol v1.4",
        "docs_url": "/docs"
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "database": "connected",
        "telemetry_stream": "active"
    }

@app.post("/api/ai/crop-recommendation")
def recommend_crop(req: CropRecommendRequest):
    # Simulated Agronomic ML Engine (Random Forest / XGBoost Model)
    if "clay" in req.soil_type.lower() or req.moisture > 65:
      return {
          "recommended_crop": "Super Fine Paddy (Telangana Sona RNR-15048)",
          "category": "Cereal & Grain",
          "seed_variety": "RNR-15048 Foundation Seed",
          "expected_yield_quintals_per_acre": 26.0,
          "market_price_range_inr": "₹2,320 – ₹2,800",
          "confidence_score": 0.968,
          "growth_duration_days": 125,
          "fertilizer_schedule": [
              {"stage": "Basal", "fertilizer": "DAP 40kg + MOP 15kg", "timing": "Day 0"},
              {"stage": "Vegetative", "fertilizer": "Neem Coated Urea 25kg", "timing": "Day 25"},
              {"stage": "Panicle", "fertilizer": "Urea 20kg + Potash Spray", "timing": "Day 55"}
          ],
          "irrigation_plan": "Alternate Wetting & Drying (AWD) to conserve 30% groundwater",
          "sustainability_bonus": "Eligible for ₹4,000/acre Direct Benefit Transfer (DBT)"
      }
    elif req.ph > 7.5 or req.rainfall < 600:
      return {
          "recommended_crop": "Pearl Millet (Bajra) / Sorghum (Jowar)",
          "category": "Nutri-Cereal Millet",
          "seed_variety": "ICMV 221 / CSH 24MF",
          "expected_yield_quintals_per_acre": 18.0,
          "market_price_range_inr": "₹2,500 – ₹3,200",
          "confidence_score": 0.952,
          "growth_duration_days": 95,
          "fertilizer_schedule": [
              {"stage": "Basal", "fertilizer": "Compost 500kg + DAP 25kg", "timing": "Day 0"},
              {"stage": "Tillering", "fertilizer": "Bio-NPK Consortium Spray", "timing": "Day 30"}
          ],
          "irrigation_plan": "Rainfed with 2 supplemental micro-sprinkler passes",
          "sustainability_bonus": "High drought tolerance index (0.92)"
      }
    else:
      return {
          "recommended_crop": "Cotton (Bt Hybrid BG-II)",
          "category": "Commercial Cash Crop",
          "seed_variety": "RCH-659 BG-II / Mallika",
          "expected_yield_quintals_per_acre": 14.5,
          "market_price_range_inr": "₹7,200 – ₹8,400",
          "confidence_score": 0.974,
          "growth_duration_days": 150,
          "fertilizer_schedule": [
              {"stage": "Basal", "fertilizer": "DAP 40kg + MOP 15kg + Zinc 5kg", "timing": "Day 0"},
              {"stage": "First Split", "fertilizer": "Urea 25kg + Bio-NPK", "timing": "Day 30"},
              {"stage": "Square Formation", "fertilizer": "Potassium Nitrate Spray", "timing": "Day 60"}
          ],
          "irrigation_plan": "Drip fertigation every 5 days (45 minutes cycle)",
          "sustainability_bonus": "Intercrop with pigeonpea to trap bollworm"
      }

@app.post("/api/robot/command")
def send_robot_command(cmd: RobotCommandRequest):
    return {
        "robot_id": cmd.robot_id,
        "acknowledged": True,
        "command": cmd.command,
        "attachment": cmd.attachment,
        "timestamp": datetime.utcnow().isoformat(),
        "status": "executing",
        "telemetry_link": f"/api/robot/{cmd.robot_id}/telemetry"
    }

@app.get("/api/robot/{robot_id}/telemetry")
def get_robot_telemetry(robot_id: str):
    return {
        "robot_id": robot_id,
        "battery_percent": 88.4,
        "voltage": 48.6,
        "solar_watts": 145,
        "speed_kmh": 3.4,
        "status": "running",
        "gps": {"lat": 17.9792, "lng": 79.5964, "altitude": 268.4},
        "imu": {"pitch": 1.2, "roll": -0.8, "yaw": 44.5},
        "lidar_distance_m": 14.8,
        "ultrasonic_distance_cm": 22.4,
        "active_tool": "sprayer",
        "swath_coverage_percent": 64.2
    }

@app.post("/api/disease/diagnose")
def diagnose_disease(req: DiseaseDiagnosisRequest):
    # Simulated YOLOv11 + MobileNet Classifier
    return {
        "crop": req.crop_name,
        "diagnosis": "Early Blight (Alternaria solani)",
        "confidence": 0.974,
        "severity": "Moderate",
        "organic_treatment": [
            "Foliar spray of Trichoderma harzianum @ 5g/liter",
            "Neem oil 10,000 ppm emulsion @ 3ml/liter at dawn"
        ],
        "chemical_treatment": [
            "Mancozeb 75% WP @ 2.5g/liter",
            "Or Azoxystrobin 23% SC @ 1ml/liter"
        ],
        "nearby_kvk": {
            "center": "Krishi Vigyan Kendra Warangal (PJTSAU)",
            "distance_km": 6.4,
            "helpline": "+91 870 245 9921"
        }
    }

@app.get("/api/dpi/state-models")
def get_dpi_registry():
    return {
        "federation_network": "India AgriStack DPI Network",
        "total_nodes": 8,
        "active_models": [
            {"id": "DPI-TS-01", "name": "Telangana Cotton Pest Vision", "state": "Telangana", "accuracy": 97.8},
            {"id": "DPI-PB-02", "name": "Punjab Wheat Yield XGBoost", "state": "Punjab", "accuracy": 96.4},
            {"id": "DPI-TN-03", "name": "Cauvery Delta Soil Inversion", "state": "Tamil Nadu", "accuracy": 95.1},
            {"id": "DPI-KA-04", "name": "Deccan Drought LSTM Forecaster", "state": "Karnataka", "accuracy": 94.7}
        ]
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
