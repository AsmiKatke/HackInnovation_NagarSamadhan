import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, QrCode, CheckCircle2, CircleDashed, Clock, ChevronRight, ArrowLeft } from 'lucide-react';
import QRScannerModal from '../components/QRScannerModal';
import { useTickets } from '../context/TicketContext';

const steps = [
  { id: 'Submitted', label: 'Ticket Submitted', desc: 'Received at City Command Center' },
  { id: 'AI Categorized', label: 'AI Categorized', desc: 'Issue identified and prioritized' },
  { id: 'Worker Dispatched', label: 'Worker Dispatched', desc: 'Maintenance team on their way' },
  { id: 'Resolved', label: 'Marked as Resolved', desc: 'Issue fixed by city department' }
];

const TrackingPage = () => {
  const { tickets } = useTickets();
  const location = useLocation();
  const navigate = useNavigate();
  const [ticketId, setTicketId] = useState('');
  const [currentTicket, setCurrentTicket] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    if (id) {
      setTicketId(id);
      handleSearch(id);
    }
  }, [location.search]);

  const handleSearch = async (id = ticketId) => {
    if (!id) return;
    setIsSearching(true);
    // Simulate lookup delay
    await new Promise(r => setTimeout(r, 1000));
    const ticket = tickets.find(t => t.id === id);
    setCurrentTicket(ticket || null);
    setIsSearching(false);
  };

  const handleScanSuccess = (decoded) => {
    setShowScanner(false);
    setTicketId(decoded);
    handleSearch(decoded);
  };

  const getStepIndex = (status) => {
    return steps.findIndex(s => s.id === status);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-gov-dark mb-4 tracking-tight">Track Progress</h1>
        <p className="text-gray-500">Track your urban issue resolution in real-time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Search Panel */}
        <div className="lg:col-span-12 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value.toUpperCase())}
                placeholder="Enter Ticket ID (e.g. TRK-XXXX)"
                className="w-full pl-12 pr-4 py-5 rounded-2xl bg-white border border-gray-200 focus:ring-2 focus:ring-gov-blue outline-none transition-all shadow-sm"
              />
            </div>
            
            <button 
              onClick={() => handleSearch()}
              className="px-10 py-5 bg-gov-blue text-white rounded-2xl font-bold hover:shadow-lg transition-all"
            >
              Track Now
            </button>
            <button 
              onClick={() => setShowScanner(true)}
              className="px-6 py-5 bg-white border border-gray-200 text-gov-blue rounded-2xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center space-x-2"
            >
              <QrCode className="w-5 h-5" />
              <span>Scan QR</span>
            </button>
          </div>
        </div>

        {/* Status Display Area */}
        <div className="lg:col-span-12">
          <AnimatePresence mode="wait">
            {!currentTicket ? (
                <motion.div 
                   key="empty"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="glass-panel p-20 text-center bg-white border border-gray-100"
                >
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search className="w-10 h-10 text-gray-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-gov-dark mb-2">Ready to Track?</h3>
                    <p className="text-gray-400">Please enter a valid ticket ID or scan the QR code from your confirmation.</p>
                </motion.div>
            ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                   <div className="glass-panel p-8 bg-white grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ticket Information</span>
                            <h2 className="text-3xl font-black text-gov-blue mt-2 mb-4">{currentTicket.id}</h2>
                            <div className="flex flex-col space-y-4">
                                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                    <div className="text-xs text-gov-emerald font-bold uppercase mb-1">AI Category</div>
                                    <div className="text-gov-dark font-medium">{currentTicket.category}</div>
                                </div>
                                <div className="text-sm text-gray-600 line-clamp-2">
                                    <span className="font-bold">Summary: </span>{currentTicket.description}
                                </div>
                            </div>
                        </div>

                        <div className="md:pl-8 pt-6 md:pt-0">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Live Progress</span>
                            <div className="mt-8 space-y-0 relative">
                                {/* Connector Line */}
                                <div className="absolute left-[15px] top-4 bottom-4 w-1 bg-gray-100"></div>

                                {steps.map((step, idx) => {
                                    const stepIdx = getStepIndex(currentTicket.status);
                                    const isCompleted = idx <= stepIdx;
                                    const isCurrent = idx === stepIdx;

                                    return (
                                        <div key={idx} className="relative pl-10 pb-10 last:pb-0">
                                            {/* Step Circle */}
                                            <motion.div 
                                                initial={false}
                                                animate={{ 
                                                    backgroundColor: isCompleted ? '#10B981' : '#F3F4F6',
                                                    scale: isCompleted ? 1.1 : 1
                                                }}
                                                className={`absolute left-0 top-0 w-8 h-8 rounded-full border-4 border-white shadow-md flex items-center justify-center z-10 transition-colors`}
                                            >
                                                {isCompleted ? (
                                                    <CheckCircle2 className="w-5 h-5 text-white" />
                                                ) : (
                                                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                                )}
                                            </motion.div>

                                            <div className="mt-[-2px]">
                                                <h4 className={`font-bold transition-colors ${isCompleted ? 'text-gov-dark' : 'text-gray-400'}`}>
                                                    {step.label}
                                                </h4>
                                                <p className={`text-sm transition-colors ${isCompleted ? 'text-gray-500' : 'text-gray-300'}`}>
                                                    {step.desc}
                                                </p>
                                                {isCurrent && (
                                                    <motion.div 
                                                       initial={{ opacity: 0, x: -10 }}
                                                       animate={{ opacity: 1, x: 0 }}
                                                       className="mt-2 inline-flex items-center space-x-2 px-3 py-1 bg-gov-blue/10 text-gov-blue rounded-full text-xs font-bold border border-gov-blue/20"
                                                    >
                                                       <div className="w-1.5 h-1.5 bg-gov-blue rounded-full animate-ping"></div>
                                                       <span>Active Phase</span>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                   </div>

                   <button 
                     onClick={() => navigate('/report')}
                     className="flex items-center space-x-2 text-gov-blue font-bold px-4 hover:underline"
                   >
                     <ArrowLeft className="w-4 h-4" />
                     <span>File another complaint</span>
                   </button>
                </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {showScanner && (
        <QRScannerModal 
          onScan={handleScanSuccess} 
          onClose={() => setShowScanner(false)} 
        />
      )}
    </div>
  );
};

export default TrackingPage;
