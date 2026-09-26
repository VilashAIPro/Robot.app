# 🌾 ROV-BOT AI Agriculture Network (AgriNet AI)
### Production-Ready AI Digital Agriculture Platform & Autonomous Swarm Robot Network for India's Small & Marginal Farmers

> **Hall of Community Hackathon 2.0 | Digital Public Infrastructure (DPI) & AgriStack Vision**

---

## 🌟 Overview

**ROV-BOT AI Agriculture Network (AgriNet AI)** is a full-stack, enterprise-grade, hackathon-ready Digital Agriculture Platform. It unifies autonomous farming robots, AI agronomic advisory, satellite remote sensing, laboratory-grade soil health analytics, hyperlocal weather prediction, real-time IoT sensor telemetry, multilingual voice assistants (7 Indian languages), and cross-state government GIS analytics into an open Digital Public Good (DPG).

---

## 🚀 Complete 18 Core Modules + Extra Premium Features

1. **🌾 Farmer Dashboard**: Dynamic personalized greeting in 7 Indian languages, realtime health score gauges, today's actionable precision advice, live robot radar, and field task tracking.
2. **✨ AI Crop & Yield Recommendation Engine**: Multi-parameter ML engine taking State, District, Soil Type, pH, NPK, Organic Carbon, and Moisture to output optimal seed variety, growth timetable, split fertilizer schedule, and gross yield forecasts.
3. **🛰️ Satellite Intelligence (GEE & ISRO RISAT)**: Multi-spectral GIS viewer for NDVI (Canopy Vigor), NDWI (Water Stress), Land Surface Thermal Maps, Temporal Slider (2024–2026), and Field Zone Diagnostics.
4. **⛅ AI Weather & Micro-Climate Forecast**: 7-day forecast with precipitation probability, AI Spraying Window Optimizer (07:00–10:30 AM), AI Irrigation Protocol, and Sowing Window advisor.
5. **🧪 Soil Health & Rhizosphere Analytics**: Digital Soil Health Card (SHC) compliant with Indian standards, NPK balance radar & bar charts, pH dials, and automatic compost/fertilizer dosage calculation.
6. **🔬 Crop Disease & Pest Diagnosis (AI Leaf Vision)**: YOLOv11 + MobileNet vision scanner supporting 8 Indian crops (Rice, Cotton, Tomato, Wheat, Chili, Maize, Millets, Soybean) with organic bio-control prescriptions and nearby Krishi Vigyan Kendra (KVK) scientist locator.
7. **🤖 ROV-BOT Robot Digital Twin Control Center**: 3D-styled interactive Canvas digital twin displaying independent 4-wheel motor RPMs, +142W solar PV balance, LiDAR obstacle proximity, RTK GPS (2cm accuracy), and instant tool attachment switcher (Sprayer, Laser Weeder, Seeder, Plough).
8. **🗺️ Autonomous Mission & Swath Planner**: Geofenced boundary mapping, row spacing optimizer, boustrophedon zig-zag serpentine path generator, runtime & battery estimation.
9. **📡 Live IoT Multi-Depth Sensor Dashboard**: Streaming telemetry from capacitive soil moisture probes (15cm & 30cm depth), ambient humidity, solar irradiance, chassis vibration, and battery thermistors.
10. **🎙️ Kisan Vani AI Multilingual Voice Assistant**: Conversational agronomist in 7 Indian languages (Telugu, Tamil, Hindi, Kannada, Marathi, Bengali, English) with Web Speech API voice synthesis and action cards.
11. **🌿 Regenerative Farming & Carbon Sink Advisor**: Sustainability score gauge (0–100), carbon sequestration estimator (kg CO2e/acre/year), carbon credits earned (₹2,200/credit), and practice adoption toggles.
12. **🛒 Agri-Marketplace & Krishi Seva Kendra Hub**: Direct Benefit Transfer (DBT) subsidized seeds, microbial consortia, robot tools, and IoT probes with verified local KVK vendors and instant WhatsApp ordering.
13. **🏛️ Government GIS & State Macro Analytics**: Macro dashboard for District Collectors and State Directors monitoring 8 states (Telangana, Punjab, Tamil Nadu, Maharashtra, Karnataka, Uttar Pradesh, Gujarat, Assam) with CSV exports.
14. **📋 Agriculture Officer (AO) Portal**: Cluster farmer management, urgent disease alert broadcasts via SMS/WhatsApp, soil test card approvals, and field visit scheduler.
15. **⚡ Digital Public Infrastructure (DPI) & State AI Model Registry**: Federated machine learning catalog interconnecting state agricultural universities (PJTSAU, PAU, TNAU, UASB) with OpenAPI playground.
16. **🔔 Real-Time AI Alert & Notification Hub**: Prioritized alerts for severe storms, whitefly/bollworm outbreaks, robot completion, and DBT subsidy deposits.
17. **📄 Official Downloadable PDF Reports**: One-click printable Soil Health Cards, Crop Disease Pathology Certificates, Robot Telemetry Logs, and Carbon Audits.
18. **📊 Advanced Multi-Season Analytics & BI**: 5-year yield progression charts, input cost distribution pie charts, and agro-climatic resilience radars.
19. **🚁 Extra Premium Features**: Multi-Robot Fleet Swarm, Drone Aerial Scouting, Krishi Charcha Community Forum, AgriStack QR Digital ID Card, and Emergency SOS stop.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Lucide React, Recharts, Canvas 2D/3D Digital Twin, Web Speech API, canvas-confetti, jsPDF/html2canvas.
- **Backend**: Python FastAPI, SQLAlchemy, Pydantic, SQLite / PostgreSQL with PostGIS schemas.
- **AI Models & Standards**: AgriStack Open Protocol v1.4, ISRO RISAT-1A & Sentinel-2 multi-spectral remote sensing.

---

## 💻 Running Locally

### 1. Frontend Setup
```bash
# In the project root:
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Backend Setup (Optional FastAPI REST Server)
```bash
# In the project root:
pip install -r backend/requirements.txt
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```
Interactive Swagger API documentation available at [http://localhost:8000/docs](http://localhost:8000/docs).

---

## 🏆 Hackathon Demo Instructions

1. **Role Switcher**: Click the role pills at the top bar (Farmer, Agri Officer, Govt GIS, DPI Admin) to experience multi-stakeholder dashboards.
2. **Language Switcher**: Click the globe icon to switch between Telugu, Tamil, Hindi, Kannada, Marathi, Bengali, and English.
3. **Live Simulator**: Toggle the "Live Telemetry" button in the header to observe real-time robot movements, battery changes, and IoT sensor streams.
4. **Disease Scanner**: Open "Disease Scanner" and click any of the 8 crop presets or upload an image to see the YOLO AI diagnosis and organic prescription.
5. **ROV-BOT Cockpit**: Navigate to "ROV-BOT Digital Twin" to test Start, Pause, Return Home, Tool Attachment swaps, and Emergency Stop.
6. **Reports**: Go to "Downloadable Reports" and click "Print / Save Official PDF" to generate verifiable audit certificates.
