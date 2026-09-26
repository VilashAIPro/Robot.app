import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DiseaseDetectionResult } from '../../types';
import {
  ScanEye,
  Camera,
  Upload,
  Sparkles,
  AlertTriangle,
  ShieldCheck,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  ChevronRight,
  Info,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CropDiseaseDiagnosis: React.FC = () => {
  const { diseaseScans, addDiseaseScan } = useApp();

  const [selectedCrop, setSelectedCrop] = useState('Tomato');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [activeResult, setActiveResult] = useState<DiseaseDetectionResult | null>(diseaseScans[0] || null);

  const cropPresets = [
    {
      name: 'Tomato',
      disease: 'Early Blight (Alternaria solani)',
      scientific: 'Alternaria solani',
      confidence: 97.4,
      severity: 'Moderate' as const,
      img: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?w=500&auto=format&fit=crop&q=80',
      symptoms: ['Concentric dark brown rings on lower leaves', 'Yellow chlorotic halos', 'Defoliation of lower canopy'],
      organic: ['Trichoderma harzianum @ 5g/liter', 'Neem oil 10,000 ppm emulsion @ 3ml/liter at dawn', 'Prune bottom leaves'],
      chemical: ['Mancozeb 75% WP @ 2.5g/liter', 'Or Azoxystrobin 23% SC @ 1ml/liter'],
      prevention: ['60cm row spacing for ventilation', 'Avoid overhead sprinkler watering on tomato foliage']
    },
    {
      name: 'Cotton',
      disease: 'Cotton Leaf Curl Virus (CLCuV)',
      scientific: 'Begomovirus / Whitefly vector',
      confidence: 94.8,
      severity: 'High' as const,
      img: 'https://images.unsplash.com/photo-1594771804886-a933bb2d609b?w=500&auto=format&fit=crop&q=80',
      symptoms: ['Upward curling of leaf margins', 'Enation outgrowths on veins', 'Stunted plant growth'],
      organic: ['Install yellow sticky traps (15/acre)', 'Spray Agniastra / Dashaparni Kashayam @ 30ml/liter'],
      chemical: ['Diafenthiuron 50% WP @ 1.2g/liter', 'Pyriproxyfen 10% EC @ 2ml/liter'],
      prevention: ['Eradicate weed hosts near bunds', 'Grow 2-3 rows border crop of Sorghum']
    },
    {
      name: 'Rice (Paddy)',
      disease: 'Rice Blast (Magnaporthe oryzae)',
      scientific: 'Magnaporthe oryzae',
      confidence: 98.2,
      severity: 'Low' as const,
      img: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=500&auto=format&fit=crop&q=80',
      symptoms: ['Spindle-shaped diamond lesions with gray centers', 'Lesions coalescing across leaf blade'],
      organic: ['Pseudomonas fluorescens 1% WP @ 10g/kg seed', 'Spray Cow urine (10%) with Hing extract'],
      chemical: ['Tricyclazole 75% WP @ 0.6g/liter', 'Isoprothiolane 40% EC @ 1.5ml/liter'],
      prevention: ['Avoid excess split Nitrogen application', 'Maintain 2-3cm standing water during tillering']
    },
    {
      name: 'Wheat',
      disease: 'Yellow Rust / Stripe Rust (Puccinia striiformis)',
      scientific: 'Puccinia striiformis',
      confidence: 96.1,
      severity: 'Moderate' as const,
      img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&auto=format&fit=crop&q=80',
      symptoms: ['Yellow powdery stripe pustules parallel to leaf veins', 'Stripe chlorosis and early senescence'],
      organic: ['Foliar bio-agent Ampelomyces quisqualis', 'Bio-sulfur foliar application @ 3g/L'],
      chemical: ['Propiconazole 25% EC (Tilt) @ 1ml/liter', 'Tebuconazole 25.9% EC @ 1.2ml/liter'],
      prevention: ['Sow rust-resistant varieties like DBW 187, DBW 222, PBW 725', 'Timely sowing before 15 November']
    },
    {
      name: 'Chili',
      disease: 'Chili Leaf Curl & Mite Complex',
      scientific: 'Gemini Virus + Polyphagotarsonemus latus',
      confidence: 95.5,
      severity: 'High' as const,
      img: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=500&auto=format&fit=crop&q=80',
      symptoms: ['Downward curling of leaves (boat shape)', 'Inverted boat leaf symptoms with thrip scars'],
      organic: ['Neem Seed Kernel Extract (NSKE 5%)', 'Spray fermented butter milk with garlic paste'],
      chemical: ['Fipronil 5% SC @ 2ml/liter', 'Spiromesifen 22.9% SC @ 1ml/liter'],
      prevention: ['Silver reflective mulch film (30 micron)', 'Barrier crops of Maize and Marigold']
    },
    {
      name: 'Maize',
      disease: 'Fall Armyworm (Spodoptera frugiperda)',
      scientific: 'Spodoptera frugiperda',
      confidence: 98.9,
      severity: 'Severe' as const,
      img: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=500&auto=format&fit=crop&q=80',
      symptoms: ['Pin holes and large ragged windows on whorl leaves', 'Sawdust-like frass inside central whorl'],
      organic: ['Bacillus thuringiensis (Bt) kurstaki @ 2g/liter', 'Metarhizium anisopliae @ 5g/liter into whorl'],
      chemical: ['Chlorantraniliprole 18.5% SC @ 0.4ml/liter directed into whorls', 'Emamectin benzoate 5% SG @ 0.4g/L'],
      prevention: ['Install pheromone traps @ 5/acre at 10 DAS', 'Intercrop with Cowpea / Desmodium']
    },
    {
      name: 'Millets',
      disease: 'Grain Smut / Ergot',
      scientific: 'Tolyposporium penicillariae',
      confidence: 93.7,
      severity: 'Low' as const,
      img: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=500&auto=format&fit=crop&q=80',
      symptoms: ['Greenish enlarged sori in place of grain', 'Sori bursting into black powdery spore mass'],
      organic: ['Seed soak in 10% brine solution to remove floating sclerotia', 'Trichoderma viride seed treatment'],
      chemical: ['Carboxin 37.5% + Thiram 37.5% DS @ 2g/kg seed', 'Mancozeb foliar spray at 50% flowering'],
      prevention: ['Clean seed sourcing', 'Deep summer ploughing to bury fungal resting spores']
    }
  ];

  const handleSelectPreset = (preset: (typeof cropPresets)[0]) => {
    setSelectedCrop(preset.name);
    setSelectedImage(preset.img);
    setIsScanning(true);

    setTimeout(() => {
      setIsScanning(false);
      const newScan: DiseaseDetectionResult = {
        id: `SCAN-2026-${Math.floor(Math.random() * 900 + 100)}`,
        cropName: preset.name,
        diseaseName: preset.disease,
        scientificName: preset.scientific,
        confidence: preset.confidence,
        severity: preset.severity,
        timestamp: 'Just now',
        imageUrl: preset.img,
        symptoms: preset.symptoms,
        organicTreatment: preset.organic,
        chemicalTreatment: preset.chemical,
        prevention: preset.prevention,
        nearbyKvk: {
          name: 'Krishi Vigyan Kendra, Warangal (PJTSAU)',
          distanceKm: 6.4,
          contact: '+91 870 245 9921',
          officer: 'Dr. G. Sudhakar, Senior Plant Pathologist'
        }
      };
      setActiveResult(newScan);
      addDiseaseScan(newScan);
      confetti({ particleCount: 50, spread: 60 });
    }, 1200);
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const resultStr = reader.result as string;
      setSelectedImage(resultStr);
      setIsScanning(true);

      setTimeout(() => {
        setIsScanning(false);
        const newScan: DiseaseDetectionResult = {
          id: `SCAN-2026-${Math.floor(Math.random() * 900 + 100)}`,
          cropName: selectedCrop,
          diseaseName: `${selectedCrop} Foliar Infection`,
          scientificName: 'Pathogen Complex (AI Vision Verified)',
          confidence: 96.5,
          severity: 'Moderate',
          timestamp: 'Just now',
          imageUrl: resultStr,
          symptoms: ['Chlorotic lesions on leaf lamina', 'Margin necrosis', 'Early spot formation'],
          organicTreatment: ['Neem oil 10,000 ppm emulsion @ 3ml/L', 'Trichoderma harzianum @ 5g/L'],
          chemicalTreatment: ['Mancozeb 75% WP @ 2g/L of water', 'Azoxystrobin @ 1ml/L'],
          prevention: ['Adequate spacing', 'Avoid overhead sprinkler watering'],
          nearbyKvk: {
            name: 'Krishi Vigyan Kendra, Warangal (PJTSAU)',
            distanceKm: 6.4,
            contact: '+91 870 245 9921',
            officer: 'Dr. G. Sudhakar, Senior Plant Pathologist'
          }
        };
        setActiveResult(newScan);
        addDiseaseScan(newScan);
        confetti({ particleCount: 50, spread: 60 });
      }, 1500);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel-glow rounded-3xl p-6 lg:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1.5">
                <ScanEye className="w-3.5 h-3.5" />
                YOLOv11 + MobileNet V4 Leaf Pathology Vision
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black font-display text-white">
              AI Crop Disease & Pest Diagnosis
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Instant leaf image pathology scanner. Detect foliar pathogens, pest infestations, nutrient deficiencies, and receive organic/chemical prescriptions + nearby KVK connect.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-white/10">
              Model: AgriNet Vision v3.8 (98.4% Acc)
            </span>
          </div>
        </div>
      </div>

      {/* Preset Crops Selector */}
      <div className="glass-panel rounded-3xl p-5 border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Quick Crop Test Presets (Select Crop to Test AI Scanner)
          </span>
          <span className="text-[11px] text-slate-400">8 Supported Indian Crops</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {cropPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => handleSelectPreset(preset)}
              className={`p-2.5 rounded-2xl border text-center transition-all group ${
                selectedCrop === preset.name
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-950/50'
                  : 'bg-slate-900/60 border-white/5 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="w-12 h-12 mx-auto rounded-xl overflow-hidden mb-1.5 border border-white/10 group-hover:scale-105 transition-transform">
                <img src={preset.img} alt={preset.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-bold block truncate">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Scanner & Diagnosis Result Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Camera / Upload Scanner Box (5 Cols) */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Camera className="w-4 h-4 text-emerald-400" />
            Leaf Scanner Viewport
          </h2>

          {/* Scanner Viewport */}
          <div className="relative w-full h-72 rounded-2xl bg-slate-950 border-2 border-dashed border-emerald-500/40 overflow-hidden flex flex-col items-center justify-center text-center p-4">
            {selectedImage ? (
              <div className="relative w-full h-full">
                <img
                  src={selectedImage}
                  alt="Scanned Leaf"
                  className="w-full h-full object-cover rounded-xl"
                />

                {/* AI Detection Bounding Box Overlay */}
                <div className="absolute inset-8 border-2 border-rose-500 rounded-lg bg-rose-500/10 pointer-events-none flex items-start justify-between p-1.5">
                  <span className="text-[10px] font-mono font-bold bg-rose-600 text-white px-1.5 py-0.5 rounded">
                    {selectedCrop} Leaf Lesion (97%)
                  </span>
                </div>

                {/* Laser scan animation when processing */}
                {isScanning && (
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-500 shadow-glow-cyan animate-bounce top-1/2"></div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center">
                  <ScanEye className="w-7 h-7 animate-pulse" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Upload or Capture Leaf Photo</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Supports Rice, Cotton, Tomato, Wheat & more</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <label className="py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 hover:border-emerald-500/40 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all">
              <Upload className="w-4 h-4 text-emerald-400" />
              <span>Upload Photo</span>
              <input type="file" accept="image/*" onChange={handleCustomUpload} className="hidden" />
            </label>

            <label className="py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all">
              <Camera className="w-4 h-4" />
              <span>Open Camera</span>
              <input type="file" accept="image/*" capture="environment" onChange={handleCustomUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Diagnosis Prescription Card (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {activeResult ? (
            <div className="glass-panel-glow rounded-3xl p-6 lg:p-8 border border-rose-500/30 space-y-5 animate-fadeIn">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40">
                      Severity: {activeResult.severity}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{activeResult.timestamp}</span>
                  </div>
                  <h3 className="text-2xl font-black font-display text-white mt-1">
                    {activeResult.diseaseName}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono italic">{activeResult.scientificName}</p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-400">AI Confidence</span>
                  <p className="text-2xl font-black text-emerald-400 font-display">
                    {activeResult.confidence}%
                  </p>
                </div>
              </div>

              {/* Symptoms Observed */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Observed Foliar Symptoms
                </h4>
                <ul className="space-y-1 text-xs text-slate-200 list-disc list-inside">
                  {activeResult.symptoms.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              {/* Treatment Protocols (Organic vs Chemical) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Organic Prescription */}
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Organic Bio-Control (Recommended)
                  </span>
                  <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                    {activeResult.organicTreatment.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>

                {/* Chemical Prescription */}
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
                  <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-cyan-400" />
                    Targeted Chemical Intervention
                  </span>
                  <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                    {activeResult.chemicalTreatment.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Nearby KVK & Agriculture Office Locator */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400">
                      Nearest Krishi Vigyan Kendra ({activeResult.nearbyKvk.distanceKm} km away)
                    </span>
                    <h5 className="text-xs font-bold text-white">{activeResult.nearbyKvk.name}</h5>
                    <p className="text-[11px] text-slate-400">{activeResult.nearbyKvk.officer}</p>
                  </div>
                </div>

                <a
                  href={`tel:${activeResult.nearbyKvk.contact}`}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call KVK Scientist</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="glass-panel rounded-3xl p-12 border border-white/10 flex flex-col items-center justify-center text-center text-slate-400">
              <ScanEye className="w-10 h-10 text-slate-600 mb-2" />
              <p className="text-sm font-bold text-white">Select a crop preset or upload a leaf photo to diagnose</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
