import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Upload, Languages, Send, CheckCircle, Download, Share2, Loader2, Image as ImageIcon } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useTickets } from '../context/TicketContext';

const ReportPage = () => {
  const { addTicket } = useTickets();
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);
  const [evidence, setEvidence] = useState(null);
  const [whatsapp, setWhatsapp] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [ticketResult, setTicketResult] = useState(null);
  const [detectedLang, setDetectedLang] = useState('English');
  const fileInputRef = useRef(null);

  const handleLanguageDetect = (text) => {
    // Simple mock detection
    if (/[\u0900-\u097F]/.test(text)) setDetectedLang('Hindi/Marathi');
    else setDetectedLang('English');
  };

  const handleFetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    } else {
        // Fallback or mock
        setLocation({ lat: 19.0760, lng: 72.8777 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAnalyzing(true);

    // Simulate AI categorization
    await new Promise(r => setTimeout(r, 2500));

    const ticketId = 'TRK-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const newTicket = {
      id: ticketId,
      description,
      location,
      whatsapp,
      status: 'Submitted',
      category: 'Pothole/Roads', // AI categorizing simulation
      createdAt: new Date().toISOString()
    };

    addTicket(newTicket);
    setTicketResult(newTicket);
    setIsAnalyzing(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 bg-white"
      >
        <h1 className="text-3xl font-bold text-gov-dark mb-2">Report an Issue</h1>
        <p className="text-gray-500 mb-8">Submit your complaint with AI-powered assistance.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Description */}
          <div className="space-y-2 relative">
            <label className="text-sm font-semibold text-gray-700 flex justify-between">
              Issue Description
              <span className="flex items-center space-x-1 text-gov-emerald px-2 py-0.5 bg-emerald-50 rounded-full text-xs animate-pulse">
                <Languages className="w-3 h-3" />
                <span>{detectedLang}</span>
              </span>
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                handleLanguageDetect(e.target.value);
              }}
              placeholder="E.g. Large pothole near the bus stop..."
              className="w-full p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-gov-blue focus:border-transparent outline-none transition-all placeholder:text-gray-300"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Location Details</label>
            <div className="flex flex-col space-y-4">
              <button
                type="button"
                onClick={handleFetchLocation}
                className="flex items-center justify-center space-x-2 w-full py-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 hover:bg-gov-blue/5 hover:border-gov-blue transition-all group"
              >
                <MapPin className="w-5 h-5 text-gray-400 group-hover:text-gov-blue" />
                <span className="font-medium text-gray-600 group-hover:text-gov-blue">
                  {location ? 'Location Captured' : 'Use My GPS Location'}
                </span>
              </button>
              
              {location && (
                <div className="h-40 bg-gray-200 rounded-2xl relative overflow-hidden flex items-center justify-center border border-gray-200">
                   <div className="text-center">
                    <MapPin className="w-8 h-8 text-gov-blue mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-600">{location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>
                    <p className="text-xs text-gray-400">Map Preview Simulated</p>
                   </div>
                </div>
              )}
            </div>
          </div>

          {/* Evidence Upload */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Upload Evidence</label>
            <div 
              onClick={() => fileInputRef.current.click()}
              className="group cursor-pointer border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center space-y-4 hover:bg-emerald-50/50 hover:border-gov-emerald transition-all"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={(e) => setEvidence(e.target.files[0])}
              />
              <div className="p-4 bg-gray-50 rounded-full group-hover:bg-white transition-colors">
                <Upload className="w-8 h-8 text-gray-400 group-hover:text-gov-emerald" />
              </div>
              <div className="text-center">
                <p className="font-medium text-gray-700">{evidence ? evidence.name : 'Select Photo or Video'}</p>
                <p className="text-sm text-gray-400">Drag & drop files here</p>
              </div>
            </div>
          </div>

          {/* WhatsApp Field */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">WhatsApp Updates (Optional)</label>
            <div className="relative">
              <input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                className="w-full p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-gov-blue focus:border-transparent outline-none pl-12"
              />
              <Share2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <button
            disabled={isAnalyzing}
            className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 transition-all ${isAnalyzing ? 'bg-gray-100 text-gray-400' : 'bg-gov-blue text-white hover:bg-gov-dark shadow-lg hover:shadow-gov-blue/20'}`}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>AI Analyzing and Categorizing...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Submit Complaint</span>
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {ticketResult && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-[2rem] p-10 max-w-lg w-full text-center shadow-2xl"
            >
              <div className="mb-8 flex justify-center">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center border-4 border-emerald-100">
                  <CheckCircle className="w-10 h-10 text-gov-emerald" />
                </div>
              </div>

              <h2 className="text-3xl font-extrabold text-gov-dark mb-2">Ticket Confirmed!</h2>
              <p className="text-gray-500 mb-8">Save this QR code to track your complaint status.</p>

              <div className="bg-gray-50 p-6 rounded-3xl mb-8 flex justify-center border border-gray-100">
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <QRCodeSVG value={ticketResult.id} size={200} level="H" />
                </div>
              </div>

              <div className="text-lg font-mono font-bold text-gov-blue mb-8 space-y-1">
                <div className="text-xs uppercase text-gray-400">Ticket ID</div>
                <div>{ticketResult.id}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center justify-center space-x-2 py-4 bg-gov-dark text-white rounded-2xl font-bold hover:opacity-90 transition-all">
                  <Download className="w-5 h-5" />
                  <span>Download QR</span>
                </button>
                <button className="flex items-center justify-center space-x-2 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all">
                  <Share2 className="w-5 h-5" />
                  <span>WhatsApp Share</span>
                </button>
              </div>

              <button 
                onClick={() => setTicketResult(null)}
                className="mt-8 text-gray-400 font-medium hover:text-gray-600 underline"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReportPage;
