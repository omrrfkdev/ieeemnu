import { useState, useEffect, useCallback } from 'react';
import { Lock, Eye, EyeOff, Users, BarChart3, Globe, Monitor, Calendar, LogOut, RefreshCw, TrendingUp, AlertCircle, ShieldCheck, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchAnalyticsStats, clearAnalyticsData } from '../hooks/useAnalytics';
import { useFocusTrap } from '../hooks/useFocusTrap';

const ADMIN_PASSWORD = 'ieee-mnu-admin-2025';

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};

// --- Components ---

function StatCard({ icon: Icon, label, value, colorClass, bgClass }) {
  return (
    <motion.div 
      variants={itemVariants}
      className="relative overflow-hidden rounded-2xl bg-[#111827] border border-gray-800 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-gray-700 group focus-within:ring-2 focus-within:ring-ieee-blue-light"
      tabIndex={0}
      role="article"
      aria-labelledby={`stat-${label.replace(/\s+/g, '-')}`}
    >
      <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity duration-300 blur-2xl" />
      
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${bgClass} ${colorClass}`}>
          <Icon size={24} strokeWidth={2} aria-hidden="true" />
        </div>
      </div>
      
      <div>
        <h3 id={`stat-${label.replace(/\s+/g, '-')}`} className="text-gray-400 text-sm font-medium tracking-wide mb-1">{label}</h3>
        <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
      </div>
    </motion.div>
  );
}

function TableSection({ title, icon: Icon, children }) {
  return (
    <motion.div 
      variants={itemVariants}
      className="rounded-2xl bg-[#111827] border border-gray-800 overflow-hidden shadow-lg flex flex-col h-full focus-within:ring-2 focus-within:ring-ieee-blue-light"
    >
      <div className="px-6 py-4 border-b border-gray-800 flex items-center gap-3 bg-[#172033]">
        <div className="p-1.5 rounded-md bg-ieee-blue/20 text-ieee-blue-light">
          <Icon size={18} strokeWidth={2.5} aria-hidden="true" />
        </div>
        <h3 className="font-semibold text-gray-100 tracking-wide">{title}</h3>
      </div>
      <div className="p-2 overflow-x-auto flex-1 custom-scrollbar">
        {children}
      </div>
    </motion.div>
  );
}

function LoginForm({ onLogin }) {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate slight network delay for premium feel
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        onLogin();
      } else {
        setError('Invalid credentials provided.');
        setPassword('');
        setIsSubmitting(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 bg-[#0a0f1c] selection:bg-ieee-blue/30 relative overflow-hidden rounded-2xl my-4">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ieee-blue/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-[#111827]/80 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-gray-800 shadow-2xl">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-ieee-blue to-ieee-blue-dark rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-ieee-blue/20">
              <ShieldCheck size={32} className="text-white" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Admin Portal</h1>
            <p className="text-sm text-gray-400">Secure access to IEEE MNU analytics</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-ieee-blue-light transition-colors">
                  <Lock size={18} aria-hidden="true" />
                </div>
                <input
                  id="password"
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  placeholder="Enter administrator password"
                  className="w-full pl-11 pr-12 py-3.5 bg-[#172033] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ieee-blue-light/50 focus:border-ieee-blue-light transition-all duration-200"
                  autoFocus
                  aria-invalid={error ? "true" : "false"}
                  aria-describedby={error ? "login-error" : undefined}
                />
                <button 
                  type="button" 
                  onClick={() => setShow(!show)} 
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors focus:outline-none focus:text-ieee-blue-light" 
                  aria-label={show ? 'Hide password' : 'Show password'}
                >
                  {show ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                </button>
              </div>
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="flex items-center gap-2 text-red-400 text-sm overflow-hidden"
                    id="login-error"
                    role="alert"
                  >
                    <AlertCircle size={14} aria-hidden="true" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              type="submit" 
              disabled={!password || isSubmitting}
              className="relative w-full py-3.5 rounded-xl font-semibold text-white bg-ieee-blue hover:bg-ieee-blue-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#111827] focus:ring-ieee-blue disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 overflow-hidden group"
              aria-live="polite"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" aria-hidden="true" />
                    Authenticating...
                  </>
                ) : (
                  'Secure Login'
                )}
              </span>
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

function Dashboard({ onLogout }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [clearing, setClearing] = useState(false);
  const dialogRef = useFocusTrap(showClearConfirm);

  const loadStats = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAnalyticsStats();
      setStats(data);
    } catch {
      setError('Failed to load analytics. Please ensure the backend services are operational.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleClearData = async () => {
    setClearing(true);
    try {
      await clearAnalyticsData();
      setShowClearConfirm(false);
      await loadStats();
    } catch {
      setError('Failed to clear analytics data. Please try again.');
    } finally {
      setClearing(false);
    }
  };

  useEffect(() => { loadStats(); }, [loadStats]);

  if (loading && !stats) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-[#0a0f1c] rounded-2xl" aria-live="polite" aria-busy="true">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4 text-ieee-blue-light"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-ieee-blue/20 rounded-full blur-xl animate-pulse" />
            <RefreshCw size={32} className="animate-spin relative z-10" aria-hidden="true" />
          </div>
          <span className="text-sm font-medium tracking-wide">Initializing Dashboard...</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0f1c] text-gray-200 selection:bg-ieee-blue/30 pb-12 rounded-2xl my-4">
      {/* Top Navigation Bar */}
      <header className="bg-[#111827]/80 backdrop-blur-md border-b border-gray-800 rounded-t-2xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-ieee-blue to-ieee-blue-dark rounded-lg flex items-center justify-center shadow-lg shadow-ieee-blue/20">
              <BarChart3 size={16} className="text-white" aria-hidden="true" />
            </div>
            <h1 className="font-bold text-lg tracking-tight text-white hidden sm:block">Analytics Center</h1>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4">
            <button 
              onClick={() => setShowClearConfirm(true)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-colors"
              aria-label="Clear all analytics data"
            >
              <Trash2 size={16} aria-hidden="true" />
              <span className="hidden sm:inline">Clear Data</span>
            </button>
            <button 
              onClick={loadStats} 
              disabled={loading} 
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 disabled:opacity-50 transition-colors"
              aria-label="Refresh data"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin text-ieee-blue-light' : ''} aria-hidden="true" />
              <span className="hidden sm:inline">{loading ? 'Updating...' : 'Refresh Data'}</span>
            </button>
            <div className="w-px h-6 bg-gray-800" role="separator" />
            <button 
              onClick={onLogout} 
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-colors"
              aria-label="Logout"
            >
              <LogOut size={16} aria-hidden="true" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400"
            role="alert"
          >
            <AlertCircle size={20} className="shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-sm font-medium">{error}</p>
          </motion.div>
        )}

        {stats && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard icon={Users} label="Total Unique Visitors" value={stats.totalVisitors} colorClass="text-amber-400" bgClass="bg-amber-400/10" />
              <StatCard icon={TrendingUp} label="Total Page Views" value={stats.totalPageViews} colorClass="text-blue-400" bgClass="bg-blue-400/10" />
              <StatCard icon={Globe} label="Active Pages" value={stats.topPages?.length || 0} colorClass="text-purple-400" bgClass="bg-purple-400/10" />
              <StatCard icon={Monitor} label="Device Signatures" value={stats.visitorsByDevice?.length || 0} colorClass="text-teal-400" bgClass="bg-teal-400/10" />
            </div>

            {/* Data Tables - Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <TableSection title="Top Performing Pages" icon={Globe}>
                <table className="w-full text-left border-collapse" aria-label="Top performing pages">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-500 text-xs uppercase tracking-wider">
                      <th scope="col" className="px-4 py-3 font-medium rounded-tl-lg">Page Path</th>
                      <th scope="col" className="px-4 py-3 font-medium text-right rounded-tr-lg">Views</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/50">
                    {stats.topPages?.map(p => (
                      <tr key={p._id} className="hover:bg-gray-800/30 transition-colors group focus-within:bg-gray-800/30" tabIndex={0}>
                        <td className="px-4 py-3 font-mono text-sm text-blue-300/80 group-hover:text-blue-300 transition-colors">{p._id}</td>
                        <td className="px-4 py-3 text-right font-medium text-gray-300">{p.count}</td>
                      </tr>
                    ))}
                    {(!stats.topPages || stats.topPages.length === 0) && (
                      <tr><td colSpan={2} className="px-4 py-8 text-center text-sm text-gray-500">No page view data available</td></tr>
                    )}
                  </tbody>
                </table>
              </TableSection>

              <TableSection title="Device Analytics" icon={Monitor}>
                <table className="w-full text-left border-collapse" aria-label="Device analytics">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-500 text-xs uppercase tracking-wider">
                      <th scope="col" className="px-4 py-3 font-medium rounded-tl-lg">Device Profile</th>
                      <th scope="col" className="px-4 py-3 font-medium text-right rounded-tr-lg">Sessions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/50">
                    {stats.visitorsByDevice?.map(d => (
                      <tr key={d._id} className="hover:bg-gray-800/30 transition-colors group focus-within:bg-gray-800/30" tabIndex={0}>
                        <td className="px-4 py-3 text-sm text-teal-300/80 group-hover:text-teal-300 transition-colors">{d._id}</td>
                        <td className="px-4 py-3 text-right font-medium text-gray-300">{d.count}</td>
                      </tr>
                    ))}
                    {(!stats.visitorsByDevice || stats.visitorsByDevice.length === 0) && (
                      <tr><td colSpan={2} className="px-4 py-8 text-center text-sm text-gray-500">No device data available</td></tr>
                    )}
                  </tbody>
                </table>
              </TableSection>
            </div>

            {/* Data Tables - Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TableSection title="Activity Timeline (Last 30 Days)" icon={Calendar}>
                <table className="w-full text-left border-collapse" aria-label="Activity timeline">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-500 text-xs uppercase tracking-wider">
                      <th scope="col" className="px-4 py-3 font-medium rounded-tl-lg">Date</th>
                      <th scope="col" className="px-4 py-3 font-medium text-right rounded-tr-lg">Traffic Volume</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/50">
                    {stats.dailyVisits?.map(d => {
                      const maxCount = Math.max(...stats.dailyVisits.map(v => v.count));
                      const percentage = Math.min(100, (d.count / maxCount) * 100);
                      
                      return (
                        <tr key={d._id} className="hover:bg-gray-800/30 transition-colors group focus-within:bg-gray-800/30" tabIndex={0}>
                          <td className="px-4 py-3 font-mono text-sm text-purple-300/80 group-hover:text-purple-300 transition-colors">{d._id}</td>
                          <td className="px-4 py-3 text-right font-medium text-gray-300">
                            <div className="flex items-center justify-end gap-3">
                              <span className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden flex justify-end" aria-hidden="true">
                                <span className="h-full bg-purple-500/50 rounded-full transition-all duration-1000 ease-out" style={{ width: `${percentage}%` }} />
                              </span>
                              <span className="w-8">{d.count}</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {(!stats.dailyVisits || stats.dailyVisits.length === 0) && (
                      <tr><td colSpan={2} className="px-4 py-8 text-center text-sm text-gray-500">No timeline data available</td></tr>
                    )}
                  </tbody>
                </table>
              </TableSection>

              <TableSection title="Visitor Ledger" icon={Users}>
                <table className="w-full text-left border-collapse" aria-label="Visitor ledger">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-500 text-xs uppercase tracking-wider">
                      <th scope="col" className="px-4 py-3 font-medium rounded-tl-lg">ID Signature</th>
                      <th scope="col" className="px-4 py-3 font-medium">Platform</th>
                      <th scope="col" className="px-4 py-3 font-medium text-right rounded-tr-lg">Hits</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/50">
                    {stats.recentVisitors?.map(v => (
                      <tr key={v._id} className="hover:bg-gray-800/30 transition-colors group focus-within:bg-gray-800/30" tabIndex={0}>
                        <td className="px-4 py-3">
                          <span className="inline-block px-2 py-1 rounded bg-amber-500/10 text-amber-300/80 text-xs font-mono group-hover:text-amber-300 transition-colors" title={v.visitorId}>
                            {v.visitorId?.slice(0, 12)}&hellip;
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-400">{v.device || 'Unknown'}</td>
                        <td className="px-4 py-3 text-right font-medium text-gray-300">{v.totalVisits}</td>
                      </tr>
                    ))}
                    {(!stats.recentVisitors || stats.recentVisitors.length === 0) && (
                      <tr><td colSpan={3} className="px-4 py-8 text-center text-sm text-gray-500">No recent visitor data available</td></tr>
                    )}
                  </tbody>
                </table>
              </TableSection>
            </div>
          </motion.div>
        )}
      </main>

      <AnimatePresence>
        {showClearConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowClearConfirm(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="clear-dialog-title"
          >
            <motion.div
              ref={dialogRef}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#111827] border border-gray-700 rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl"
            >
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                  <AlertCircle size={28} className="text-red-400" aria-hidden="true" />
                </div>
                <h2 id="clear-dialog-title" className="text-lg font-bold text-white mb-2">Clear All Analytics Data?</h2>
                <p className="text-sm text-gray-400 leading-relaxed">
                  This action is irreversible. All visitor records, page views, and device data will be permanently deleted.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  disabled={clearing}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 disabled:opacity-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearData}
                  disabled={clearing}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                >
                  {clearing ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" aria-hidden="true" />
                      Clearing...
                    </>
                  ) : (
                    <>
                      <Trash2 size={14} aria-hidden="true" />
                      Delete All
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem('admin_auth') === 'true');

  const handleLogin = () => {
    sessionStorage.setItem('admin_auth', 'true');
    setAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setAuthenticated(false);
  };

  return (
    <AnimatePresence mode="wait">
      {authenticated ? (
        <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <Dashboard onLogout={handleLogout} />
        </motion.div>
      ) : (
        <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <LoginForm onLogin={handleLogin} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Admin;
