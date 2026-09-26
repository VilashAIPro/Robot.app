import React, { useState } from 'react';
import { DPI_MODEL_REGISTRY } from '../../data/mockData';
import {
  Cpu,
  Share2,
  Sparkles,
  Code2,
  CheckCircle2,
  ExternalLink,
  Layers,
  Terminal,
  Play,
  Copy
} from 'lucide-react';

export const DPIArchitecture: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState(DPI_MODEL_REGISTRY[0]);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isRunningTest, setIsRunningTest] = useState(false);

  const handleRunApiTest = () => {
    setIsRunningTest(true);
    setTimeout(() => {
      setIsRunningTest(false);
      setApiResponse(
        JSON.stringify(
          {
            model_id: selectedModel.id,
            status: 'success',
            origin_state: selectedModel.originState,
            accuracy: `${selectedModel.accuracy}%`,
            federation_nodes: selectedModel.federatedNodes,
            inference_latency_ms: 18,
            timestamp: new Date().toISOString()
          },
          null,
          2
        )
      );
    }, 800);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel-glow rounded-3xl p-6 lg:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                AgriStack Open Protocol v1.4 • Digital Public Good (DPG)
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black font-display text-white">
              Digital Public Infrastructure & Federated State AI Registry
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Cross-state machine learning federation. Enabling open interoperability between state universities (PJTSAU, PAU, TNAU, UASB) with zero vendor lock-in.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-white/10">
              Federated Nodes: 8 States Active
            </span>
          </div>
        </div>
      </div>

      {/* State AI Registry Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DPI_MODEL_REGISTRY.map((model) => (
          <div
            key={model.id}
            onClick={() => setSelectedModel(model)}
            className={`glass-panel rounded-3xl p-5 border cursor-pointer transition-all ${
              selectedModel.id === model.id
                ? 'border-emerald-500 shadow-glow-green bg-gradient-to-br from-emerald-950/40 to-slate-900'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-slate-300 font-mono">
                {model.framework} • {model.version}
              </span>
              <span className="font-mono text-emerald-400 font-bold text-xs">
                {model.accuracy}% Acc
              </span>
            </div>

            <h3 className="text-sm font-bold text-white mb-1">{model.name}</h3>
            <p className="text-xs text-slate-400 font-medium">{model.originState}</p>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
              <span>Federated with:</span>
              <span className="text-cyan-400 font-semibold truncate max-w-[140px]">
                {model.federatedNodes.join(', ')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* API Sandbox & Code Playground */}
      <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">
              Open DPI Endpoint Sandbox: <span className="text-emerald-400 font-mono">{selectedModel.name}</span>
            </h3>
          </div>

          <button
            onClick={handleRunApiTest}
            disabled={isRunningTest}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunningTest ? 'Invoking Model...' : 'Test Live API Endpoint'}</span>
          </button>
        </div>

        {/* Code Snippet Box */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 font-mono text-xs text-slate-300 space-y-2 overflow-x-auto">
          <div className="text-slate-500">// cURL Request Specification</div>
          <div className="text-cyan-300">
            curl -X POST "{selectedModel.endpoint}" \<br />
            &nbsp;&nbsp;-H "Authorization: Bearer AGRISTACK_DPI_TOKEN" \<br />
            &nbsp;&nbsp;-H "Content-Type: application/json" \<br />
            &nbsp;&nbsp;-d '&#123; "state": "{selectedModel.originState.split(' ')[0]}", "domain": "{selectedModel.domain}" &#125;'
          </div>
        </div>

        {/* JSON Response Window */}
        {apiResponse && (
          <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/30 font-mono text-xs text-emerald-400 space-y-1 animate-fadeIn">
            <div className="text-[10px] text-slate-400 uppercase font-bold">// Response Payload (HTTP 200 OK)</div>
            <pre className="overflow-x-auto">{apiResponse}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
