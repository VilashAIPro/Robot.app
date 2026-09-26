import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Plane,
  Bot,
  Users,
  QrCode,
  Sparkles,
  ShieldCheck,
  Send,
  MessageSquare,
  ThumbsUp,
  Share2,
  Calendar,
  CheckCircle2,
  MapPin,
  Maximize2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const DroneFleetAndExtra: React.FC = () => {
  const { user, robot } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'fleet' | 'drone' | 'forum' | 'qr'>('fleet');
  const [newPostText, setNewPostText] = useState('');

  const [forumPosts, setForumPosts] = useState([
    {
      id: 1,
      author: 'Suresh Reddy (Warangal)',
      crop: 'Cotton & Chili',
      time: '2 hours ago',
      content: 'Using ROV-BOT laser weeder in my 5-acre cotton plot. Saved ₹8,000 in labour costs this week! Anyone looking to share robot rental slot for next Monday?',
      likes: 24,
      replies: 6
    },
    {
      id: 2,
      author: 'Amrik Singh (Ludhiana, Punjab)',
      crop: 'Wheat & Mustard',
      time: '4 hours ago',
      content: 'Early yellow rust alert issued by PAU Ludhiana. Applied Propiconazole 25% EC via drone sprayer in 15 minutes. Highly recommend inspecting your border rows today.',
      likes: 42,
      replies: 12
    }
  ]);

  const fleetBots = [
    { id: 'ROV-01', name: 'Alpha Mark IV', status: 'Running', battery: 88, tool: 'Precision Sprayer (1.8m)', solarWatts: 142, field: 'North Plot (4.8 Ac)' },
    { id: 'ROV-02', name: 'Beta Mark IV', status: 'Charging', battery: 94, tool: 'Optical Laser Weeder', solarWatts: 165, field: 'Base Station Depot' },
    { id: 'ROV-03', name: 'Gamma Mark III', status: 'Standby', battery: 72, tool: 'Pneumatic Seeder', solarWatts: 0, field: 'East Plot (3.2 Ac)' }
  ];

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    setForumPosts([
      {
        id: Date.now(),
        author: `${user.name} (${user.district})`,
        crop: user.primaryCrop,
        time: 'Just now',
        content: newPostText,
        likes: 1,
        replies: 0
      },
      ...forumPosts
    ]);
    setNewPostText('');
    confetti({ particleCount: 40, spread: 50 });
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel-glow rounded-3xl p-6 lg:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                AgriNet Swarm Robotics, Drones & Farmer Community
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black font-display text-white">
              Fleet Swarm, Drone Scouting & Community Forum
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Manage multi-robot autonomous swarms, schedule aerial drone scouting passes, interact on Krishi Charcha, and view your verified AgriStack digital ID.
            </p>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-white/10">
            {[
              { id: 'fleet', label: 'Robot Swarm', icon: Bot },
              { id: 'drone', label: 'Drone Scouting', icon: Plane },
              { id: 'forum', label: 'Krishi Forum', icon: Users },
              { id: 'qr', label: 'AgriStack ID', icon: QrCode }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    activeSubTab === tab.id
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sub-Tab 1: Multi-Robot Fleet Swarm */}
      {activeSubTab === 'fleet' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Bot className="w-4 h-4 text-emerald-400" />
              FPO Autonomous Robot Swarm Cluster
            </h3>
            <span className="text-xs text-emerald-400 font-mono">3 Robots Deployed</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fleetBots.map((b) => (
              <div
                key={b.id}
                className="glass-panel rounded-3xl p-5 border border-white/10 space-y-3 hover:border-emerald-500/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="font-bold text-white text-sm">{b.name}</span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      b.status === 'Running'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}
                  >
                    {b.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                    <span className="text-slate-400 text-[10px] block">Battery</span>
                    <span className="font-bold text-emerald-400 font-mono text-sm">{b.battery}%</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                    <span className="text-slate-400 text-[10px] block">Solar PV</span>
                    <span className="font-bold text-amber-400 font-mono text-sm">+{b.solarWatts}W</span>
                  </div>
                </div>

                <div className="text-xs space-y-1 text-slate-300">
                  <div>Tool: <strong className="text-white">{b.tool}</strong></div>
                  <div>Location: <span className="text-slate-400 font-mono">{b.field}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Drone Integration */}
      {activeSubTab === 'drone' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Plane className="w-4 h-4 text-cyan-400" />
              Garuda Kisan Drone Aerial Scouting Mission
            </h3>

            <div className="relative w-full h-72 rounded-2xl bg-slate-950 border border-cyan-500/30 overflow-hidden flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop&q=80"
                alt="Drone Survey"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

              <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs font-mono text-cyan-400">
                Altitude: 45m • Resolution: 1.8 cm/px
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span>Orthomosaic Mapping 100% Complete</span>
                <span className="text-emerald-400 font-bold">Uploaded to AgriNet Cloud</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white">Schedule Next Drone Pass</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Book a government-subsidized drone pass (₹399/acre) for high-resolution thermal stress and canopy defect scouting.
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/5">
                <span className="text-slate-400 block">Assigned Drone Pilot:</span>
                <p className="font-bold text-white mt-0.5">Kisan Drone Alliance FPO #12</p>
              </div>

              <button
                onClick={() => confetti({ particleCount: 50, spread: 60 })}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 text-white font-bold text-xs shadow-md transition-all"
              >
                Schedule Drone Scouting Pass (₹399)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Krishi Community Forum */}
      {activeSubTab === 'forum' && (
        <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              Krishi Charcha • National Farmer Peer Forum
            </h3>
            <span className="text-xs text-slate-400">12,400+ Active Farmers Online</span>
          </div>

          {/* New Post Form */}
          <form onSubmit={handleCreatePost} className="space-y-3">
            <textarea
              rows={3}
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder="Ask a question, share robot experiences, or post pest remedies for your fellow farmers..."
              className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 text-white text-xs sm:text-sm focus:border-emerald-500 focus:outline-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!newPostText.trim()}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post to Community</span>
              </button>
            </div>
          </form>

          {/* Posts Feed */}
          <div className="space-y-4 pt-2 border-t border-white/10">
            {forumPosts.map((post) => (
              <div
                key={post.id}
                className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2 text-xs hover:border-emerald-500/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{post.author}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                      {post.crop}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500">{post.time}</span>
                </div>

                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">{post.content}</p>

                <div className="flex items-center gap-4 pt-2 text-slate-400 text-[11px]">
                  <button className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{post.likes} Helpful</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{post.replies} Replies</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Tab 4: AgriStack QR & Digital Farmer ID Card */}
      {activeSubTab === 'qr' && (
        <div className="max-w-md mx-auto glass-panel-glow rounded-3xl p-8 border border-emerald-500/40 space-y-6 text-center animate-fadeIn">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
              Government of India • AgriStack Digital ID
            </span>
          </div>

          <div className="w-20 h-20 rounded-2xl mx-auto overflow-hidden border-2 border-emerald-400 shadow-glow-green">
            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-white font-display">{user.name}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{user.village}, {user.district}, {user.state}</p>
            <p className="text-xs font-mono font-bold text-emerald-400 mt-1">{user.agriStackId}</p>
          </div>

          {/* QR Code Container */}
          <div className="p-4 rounded-2xl bg-white mx-auto w-48 h-48 flex items-center justify-center shadow-2xl">
            <svg viewBox="0 0 100 100" className="w-full h-full text-slate-950 fill-current">
              {/* Mock high-res QR code paths */}
              <rect x="10" y="10" width="25" height="25" fill="#090d16" />
              <rect x="15" y="15" width="15" height="15" fill="#ffffff" />
              <rect x="18" y="18" width="9" height="9" fill="#090d16" />

              <rect x="65" y="10" width="25" height="25" fill="#090d16" />
              <rect x="70" y="15" width="15" height="15" fill="#ffffff" />
              <rect x="73" y="18" width="9" height="9" fill="#090d16" />

              <rect x="10" y="65" width="25" height="25" fill="#090d16" />
              <rect x="15" y="70" width="15" height="15" fill="#ffffff" />
              <rect x="18" y="73" width="9" height="9" fill="#090d16" />

              {/* Data dots */}
              <circle cx="50" cy="20" r="3" fill="#090d16" />
              <circle cx="50" cy="35" r="3" fill="#090d16" />
              <circle cx="40" cy="50" r="3" fill="#090d16" />
              <circle cx="60" cy="50" r="3" fill="#090d16" />
              <circle cx="50" cy="65" r="3" fill="#090d16" />
              <circle cx="75" cy="65" r="3" fill="#090d16" />
              <circle cx="75" cy="80" r="3" fill="#090d16" />
              <circle cx="45" cy="80" r="3" fill="#090d16" />
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-left p-3 rounded-2xl bg-slate-900/80 border border-white/5">
            <div>
              <span className="text-[10px] text-slate-400 block">Land Parcel</span>
              <span className="font-bold text-white">{user.farmSizeAcres} Acres Registered</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">PM-KISAN DBT</span>
              <span className="font-bold text-emerald-400">Directly Linked</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
