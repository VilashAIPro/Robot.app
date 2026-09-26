import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { IndianLanguage, VoiceChatMessage } from '../../types';
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  Sparkles,
  Bot,
  User,
  Globe,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const MultilingualVoiceAssistant: React.FC = () => {
  const { language, setLanguage, user, weather, robot, soilHealth, setActiveTab } = useApp();

  const [inputQuery, setInputQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const [messages, setMessages] = useState<VoiceChatMessage[]>([
    {
      id: 'MSG-01',
      sender: 'assistant',
      text: 'నమస్కారం రమేశ్వర్ గారు! నేను మీ కిసాన్ వాణి AI సహాయకుడిని. మీ పొలం గురించి, తెగుళ్లు లేదా వాతావరణం గురించి ఏదైనా అడగండి.',
      translatedText: 'Namaskaram Rameshwar garu! I am your Kisan Vani AI Assistant. Ask me anything about your farm, pests, or weather.',
      language: 'te',
      timestamp: '10:00 AM',
      actionCards: [
        { title: 'Today\'s Weather Advisory', description: 'Optimal spraying window open until 10:30 AM.', actionLabel: 'View Weather', route: 'weather_forecast' },
        { title: 'ROV-BOT Status', description: 'Alpha Mark IV is operating at 88% solar charge.', actionLabel: 'View Robot', route: 'robot_cockpit' }
      ]
    }
  ]);

  const sampleQuestions = [
    { label: 'Will it rain tomorrow?', lang: 'en', te: 'రేపు వర్షం పడుతుందా?', hi: 'क्या कल बारिश होगी?' },
    { label: 'My rice leaves have brown spots.', lang: 'en', te: 'నా వరి ఆకులపై గోధుమ రంగు మచ్చలు ఉన్నాయి.', hi: 'मेरे धान की पत्तियों पर भूरे धब्बे हैं।' },
    { label: 'When should I irrigate?', lang: 'en', te: 'పొలానికి నీరు ఎప్పుడు పెట్టాలి?', hi: 'सिंचाई कब करनी चाहिए?' },
    { label: 'What is today\'s spraying window?', lang: 'en', te: 'ఈ రోజు మందు స్ప్రే చేయడానికి అనుకూల సమయం ఏది?', hi: 'आज कीटनाशक छिड़काव का सही समय क्या है?' }
  ];

  const handleSend = (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg: VoiceChatMessage = {
      id: `USER-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      language: language,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    // Generate intelligent contextual response
    setTimeout(() => {
      let reply = '';
      let replyEn = '';
      let actions: any[] = [];

      const lower = textToSend.toLowerCase();

      if (lower.includes('rain') || lower.includes('వర్షం') || lower.includes('बारिश')) {
        reply = `రేపు వర్షపాతం అవకాశం కేవలం 0%. అయితే మంగళవారం (29 సెప్టెంబర్) నాడు 18 మి.మీ ఉరుములతో కూడిన భారీ వర్షం పడే అవకాశం ఉంది. నీటిపారుదలని వాయిదా వేయండి.`;
        replyEn = `Tomorrow rain chance is 0%. However, heavy thunderstorm (18mm) expected on Tuesday (29 Sep). Hold irrigation.`;
        actions = [{ title: '7-Day IMD Forecast', description: 'View hourly rainfall graph', actionLabel: 'Open Weather AI', route: 'weather_forecast' }];
      } else if (lower.includes('spot') || lower.includes('మచ్చ') || lower.includes('leaf') || lower.includes('disease') || lower.includes('धब्बे')) {
        reply = `వరి ఆకులపై గోధుమ రంగు మచ్చలు 'రైస్ బ్లాస్ట్' (Rice Blast) లేదా బ్రౌన్ స్పాట్ లక్షణం కావచ్చు. వెంటనే AI లీఫ్ స్కానర్ ద్వారా ఆకు ఫోటో తీయండి. సేంద్రీయ ట్రైకోడెర్మా హర్జియానం @ 5 గ్రా/లీటర్ సిఫార్సు చేయబడింది.`;
        replyEn = `Brown spots may indicate Rice Blast or Brown Spot. Scan leaf with AI vision. Organic Trichoderma @ 5g/L recommended.`;
        actions = [{ title: 'AI Leaf Scanner', description: 'Diagnose disease in 2 seconds', actionLabel: 'Launch Scanner', route: 'disease_diagnosis' }];
      } else if (lower.includes('irrigate') || lower.includes('నీరు') || lower.includes('water') || lower.includes('सिंचाई')) {
        reply = `ప్రస్తుతం మీ భూమిలో 15 సెం.మీ వద్ద తేమ 68% గా సమృద్ధిగా ఉంది. వచ్చే 3 రోజులు నీరు పెట్టవలసిన అవసరం లేదు.`;
        replyEn = `Current root moisture is optimal at 68%. No irrigation required for next 3 days.`;
        actions = [{ title: 'Soil Moisture Probe', description: 'Check 15cm & 30cm sensor graphs', actionLabel: 'View Soil IoT', route: 'iot_telemetry' }];
      } else {
        reply = `మీ ప్రశ్నకు ధన్యవాదాలు. ROV-BOT AI నెట్‌వర్క్ మీ పొలానికి సంబంధించిన అన్ని సెన్సార్ డేటా మరియు శాటిలైట్ సమాచారాన్ని విశ్లేషిస్తోంది. ఏదైనా అత్యవసర సహాయం కోసం మీ KVK అధికారిని కూడా సంప్రదించవచ్చు.`;
        replyEn = `Analyzing farm sensor and satellite telemetry. You can also connect directly with your regional KVK officer.`;
        actions = [{ title: 'Farmer Dashboard', description: 'Check full farm metrics', actionLabel: 'Go to Dashboard', route: 'dashboard' }];
      }

      const botMsg: VoiceChatMessage = {
        id: `BOT-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        translatedText: replyEn,
        language: language,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionCards: actions
      };

      setMessages((prev) => [...prev, botMsg]);

      // Speak via Web Speech API TTS
      speakText(language === 'en' ? replyEn : reply);
    }, 900);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleMic = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'te' ? 'te-IN' : language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputQuery(transcript);
        handleSend(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } else {
      // Simulated voice prompt if speech recognition not supported in browser
      setIsListening(true);
      setTimeout(() => {
        const sample = language === 'te' ? 'రేపు వర్షం పడుతుందా?' : 'Will it rain tomorrow?';
        setInputQuery(sample);
        handleSend(sample);
        setIsListening(false);
      }, 1500);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel-glow rounded-3xl p-6 lg:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/40 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Whisper + Bhashini Indic TTS + Gemini Agronomy
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black font-display text-white">
              Kisan Vani AI • Multilingual Voice Assistant
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Voice-enabled conversational agronomist supporting 7 Indian languages (Telugu, Tamil, Hindi, Kannada, Marathi, Bengali, English).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-white/10">
              Active Language: {language.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-400 mr-1">Suggested Voice Queries:</span>
        {sampleQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(language === 'te' ? q.te : language === 'hi' ? q.hi : q.label)}
            className="px-3 py-1.5 rounded-xl bg-slate-900/70 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 text-xs font-medium transition-all"
          >
            "{language === 'te' ? q.te : language === 'hi' ? q.hi : q.label}"
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4 max-h-[500px] overflow-y-auto">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'assistant' && (
              <div className="w-8 h-8 rounded-xl bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-xl rounded-2xl p-4 text-xs space-y-2 ${
                m.sender === 'user'
                  ? 'bg-emerald-600 text-white font-medium shadow-md'
                  : 'bg-slate-900/80 border border-white/10 text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between gap-4 text-[10px] text-slate-400">
                <span className="font-bold text-slate-300">
                  {m.sender === 'user' ? user.name : 'Kisan Vani AI'}
                </span>
                <div className="flex items-center gap-2">
                  <span>{m.timestamp}</span>
                  {m.sender === 'assistant' && (
                    <button
                      onClick={() => speakText(m.text)}
                      className="text-emerald-400 hover:text-emerald-300"
                      title="Listen via Voice"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <p className="text-sm font-medium leading-relaxed">{m.text}</p>

              {m.translatedText && (
                <p className="text-[11px] text-slate-400 pt-1 border-t border-white/5 italic">
                  English: {m.translatedText}
                </p>
              )}

              {/* Action Cards attached to bot messages */}
              {m.actionCards && (
                <div className="pt-2 space-y-2">
                  {m.actionCards.map((act, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-slate-950/60 border border-emerald-500/30 flex items-center justify-between gap-2"
                    >
                      <div>
                        <span className="font-bold text-white block">{act.title}</span>
                        <span className="text-[10px] text-slate-400">{act.description}</span>
                      </div>
                      <button
                        onClick={() => act.route && setActiveTab(act.route as any)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] flex items-center gap-1 shrink-0"
                      >
                        <span>{act.actionLabel}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {m.sender === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-slate-800 border border-white/10 text-slate-300 flex items-center justify-center shrink-0">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Voice Equalizer Visualizer & Input Bar */}
      <div className="glass-panel-glow rounded-3xl p-4 border border-white/10 space-y-3">
        {/* Equalizer Waveform when speaking or listening */}
        {(isListening || isSpeaking) && (
          <div className="flex items-center justify-center gap-1 py-2">
            {[12, 24, 38, 18, 44, 28, 50, 32, 20, 42, 16, 30].map((h, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-emerald-500 to-cyan-400 rounded-full animate-bounce"
                style={{ height: `${h}px`, animationDelay: `${i * 0.08}s` }}
              />
            ))}
          </div>
        )}

        <div className="flex items-center gap-3">
          {/* Microphone Button */}
          <button
            onClick={toggleMic}
            className={`p-3.5 rounded-2xl font-bold text-white transition-all shadow-lg ${
              isListening
                ? 'bg-rose-600 animate-pulse shadow-rose-950/50'
                : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-950/40'
            }`}
            title="Click to Speak"
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={
              language === 'te'
                ? 'మీ పొలం లేదా తెగుళ్ల గురించి ఏదైనా అడగండి...'
                : language === 'hi'
                ? 'अपनी फसल या मौसम के बारे में कुछ भी पूछें...'
                : 'Ask anything about crops, pests, fertilizers, or weather...'
            }
            className="flex-1 bg-slate-900 border border-white/10 rounded-2xl px-4 py-3 text-white text-xs sm:text-sm focus:border-emerald-500 focus:outline-none"
          />

          <button
            onClick={() => handleSend()}
            disabled={!inputQuery.trim()}
            className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-emerald-400 border border-white/10 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
