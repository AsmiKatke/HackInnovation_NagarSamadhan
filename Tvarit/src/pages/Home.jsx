import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Search, QrCode, TrendingUp, ShieldCheck, MapPin } from 'lucide-react';
import QRScannerModal from '../components/QRScannerModal';

const Home = () => {
  const navigate = useNavigate();
  const [showScanner, setShowScanner] = useState(false);

  const handleScanSuccess = (decodedText) => {
    setShowScanner(false);
    navigate(`/track?id=${decodedText}`);
  };

  const cards = [
    {
      title: 'Report an Issue',
      desc: 'Submit potholes, waterLeaks, or garbage issues instantly.',
      icon: <FileText className="w-8 h-8 text-gov-blue" />,
      color: 'bg-blue-50',
      to: '/report'
    },
    {
      title: 'Track Status',
      desc: 'Enter your Ticket ID manually to see progress.',
      icon: <Search className="w-8 h-8 text-gov-emerald" />,
      color: 'bg-emerald-50',
      to: '/track'
    },
    {
      title: 'Scan QR to Track',
      desc: 'No account needed. Just scan your ticket QR code.',
      icon: <QrCode className="w-8 h-8 text-gov-dark" />,
      color: 'bg-slate-50',
      onClick: () => setShowScanner(true)
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-extrabold text-gov-dark mb-6 tracking-tight"
        >
          Your City's Voice,<br /><span className="text-gov-blue">Simplified.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto"
        >
          NagarSamadhan empowers citizens to report urban issues effortlessly. 
          No passwords, no accounts — just a QR code for progress tracking.
        </motion.p>
      </div>

      {/* Main Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -8, scale: 1.02 }}
            className={`p-8 rounded-3xl cursor-pointer shadow-lg hover:shadow-2xl transition-all border border-gray-100 ${card.color}`}
            onClick={card.to ? () => navigate(card.to) : card.onClick}
          >
            <div className="mb-6 p-4 rounded-2xl bg-white w-min shadow-sm">
              {card.icon}
            </div>
            <h3 className="text-2xl font-bold text-gov-dark mb-3">{card.title}</h3>
            <p className="text-gray-600 leading-relaxed">{card.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Stats Section
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10 bg-gov-dark rounded-[2.5rem] text-white">
        <div className="flex items-center space-x-6">
          <TrendingUp className="w-12 h-12 text-gov-emerald" />
          <div>
            <div className="text-3xl font-bold">12,450+</div>
            <div className="text-gray-400 text-sm">Issues Resolved</div>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <ShieldCheck className="w-12 h-12 text-gov-emerald" />
          <div>
            <div className="text-3xl font-bold">98.5%</div>
            <div className="text-gray-400 text-sm">Accuracy Rate</div>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <MapPin className="w-12 h-12 text-gov-emerald" />
          <div>
            <div className="text-3xl font-bold">15+</div>
            <div className="text-gray-400 text-sm">Active Wards</div>
          </div>
        </div>
      </div> */}

      {showScanner && (
        <QRScannerModal 
          onScan={handleScanSuccess} 
          onClose={() => setShowScanner(false)} 
        />
      )}
    </div>
  );
};

export default Home;
