from sqlalchemy import Column, Integer, String, Float, Boolean, Text, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    role = Column(String, default="farmer") # farmer, officer, government, admin
    preferred_language = Column(String, default="en")
    agristack_id = Column(String, unique=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    farms = relationship("Farm", back_populates="owner")
    disease_scans = relationship("DiseaseScan", back_populates="user")
    notifications = relationship("Notification", back_populates="user")

class Farm(Base):
    __tablename__ = "farms"
    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"))
    name = Column(String, nullable=False)
    state = Column(String, nullable=False)
    district = Column(String, nullable=False)
    village = Column(String, nullable=False)
    total_area_acres = Column(Float, default=0.0)
    primary_crop = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="farms")
    fields = relationship("Field", back_populates="farm")
    soil_records = relationship("SoilData", back_populates="farm")
    satellite_records = relationship("SatelliteData", back_populates="farm")

class Field(Base):
    __tablename__ = "fields"
    id = Column(String, primary_key=True, index=True)
    farm_id = Column(String, ForeignKey("farms.id"))
    name = Column(String, nullable=False)
    area_acres = Column(Float)
    polygon_coordinates = Column(JSON) # GeoJSON or array of lat/lng
    crop_type = Column(String)
    sowing_date = Column(DateTime)
    
    farm = relationship("Farm", back_populates="fields")
    robot_missions = relationship("RobotMission", back_populates="field")

class SoilData(Base):
    __tablename__ = "soil_data"
    id = Column(String, primary_key=True, index=True)
    farm_id = Column(String, ForeignKey("farms.id"))
    ph = Column(Float)
    moisture_percent = Column(Float)
    nitrogen_kg_ha = Column(Float)
    phosphorus_kg_ha = Column(Float)
    potassium_kg_ha = Column(Float)
    organic_carbon_percent = Column(Float)
    fertility_score = Column(Float)
    water_holding_capacity = Column(Float)
    zinc_ppm = Column(Float)
    iron_ppm = Column(Float)
    tested_at = Column(DateTime, default=datetime.utcnow)

    farm = relationship("Farm", back_populates="soil_records")

class SatelliteData(Base):
    __tablename__ = "satellite_data"
    id = Column(String, primary_key=True, index=True)
    farm_id = Column(String, ForeignKey("farms.id"))
    ndvi_avg = Column(Float)
    ndwi_avg = Column(Float)
    surface_temp_c = Column(Float)
    vigor_score = Column(Float)
    stress_zones_count = Column(Integer, default=0)
    composite_date = Column(DateTime, default=datetime.utcnow)

    farm = relationship("Farm", back_populates="satellite_records")

class DiseaseScan(Base):
    __tablename__ = "disease_scans"
    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"))
    crop_name = Column(String, nullable=False)
    disease_name = Column(String, nullable=False)
    scientific_name = Column(String)
    confidence = Column(Float)
    severity = Column(String)
    image_url = Column(String)
    symptoms = Column(JSON)
    organic_treatment = Column(JSON)
    chemical_treatment = Column(JSON)
    prevention = Column(JSON)
    scanned_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="disease_scans")

class Robot(Base):
    __tablename__ = "robots"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    model = Column(String)
    battery_percent = Column(Float, default=100.0)
    status = Column(String, default="idle")
    active_attachment = Column(String, default="sprayer")
    current_lat = Column(Float)
    current_lng = Column(Float)
    last_ping = Column(DateTime, default=datetime.utcnow)

    missions = relationship("RobotMission", back_populates="robot")
    sensor_logs = relationship("SensorLog", back_populates="robot")

class RobotMission(Base):
    __tablename__ = "robot_missions"
    id = Column(String, primary_key=True, index=True)
    robot_id = Column(String, ForeignKey("robots.id"))
    field_id = Column(String, ForeignKey("fields.id"))
    mission_type = Column(String, nullable=False)
    status = Column(String, default="planned") # planned, running, paused, completed
    coverage_percent = Column(Float, default=0.0)
    started_at = Column(DateTime)
    completed_at = Column(DateTime)
    waypoints = Column(JSON)

    robot = relationship("Robot", back_populates="missions")
    field = relationship("Field", back_populates="robot_missions")

class SensorLog(Base):
    __tablename__ = "sensor_logs"
    id = Column(Integer, primary_key=True, autoincrement=True)
    robot_id = Column(String, ForeignKey("robots.id"))
    timestamp = Column(DateTime, default=datetime.utcnow)
    soil_moisture = Column(Float)
    soil_temp = Column(Float)
    ambient_temp = Column(Float)
    humidity = Column(Float)
    solar_watts = Column(Float)
    battery_voltage = Column(Float)

    robot = relationship("Robot", back_populates="sensor_logs")

class DPIStateModel(Base):
    __tablename__ = "dpi_state_models"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    origin_state = Column(String, nullable=False)
    domain = Column(String, nullable=False)
    framework = Column(String, nullable=False)
    version = Column(String, nullable=False)
    accuracy = Column(Float)
    federated_nodes = Column(JSON)
    endpoint = Column(String)
    status = Column(String, default="active")

class MarketplaceItem(Base):
    __tablename__ = "marketplace_items"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    brand = Column(String)
    price_inr = Column(Float)
    rating = Column(Float, default=4.8)
    image_url = Column(String)
    description = Column(Text)
    is_gov_certified = Column(Boolean, default=True)
    subsidy_percent = Column(Float, default=0.0)
    vendor_name = Column(String)
    vendor_phone = Column(String)

class Notification(Base):
    __tablename__ = "notifications"
    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"))
    title = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    type = Column(String)
    priority = Column(String, default="medium")
    read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="notifications")
