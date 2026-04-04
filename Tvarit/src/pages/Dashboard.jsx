import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { 
  Inbox, 
  Map as MapIcon, 
  BarChart3, 
  Settings, 
  MoreVertical, 
  CheckCircle, 
  Zap, 
  User, 
  X,
  AlertTriangle,
  Clock,
  ExternalLink
} from 'lucide-react';
import { useTickets } from '../context/TicketContext';

// Fix for Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const Dashboard = () => {
  const { tickets, updateTicketStatus } = useTickets();
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filter, setFilter] = useState('all');

  const stats = [
    { label: 'Unassigned', value: tickets.filter(t => t.status === 'Submitted').length, color: 'bg-red-500', icon: AlertTriangle },
    { label: 'In Progress', value: tickets.filter(t => t.status === 'Worker Dispatched').length, color: 'bg-yellow-500', icon: Clock },
    { label: 'Completed', value: tickets.filter(t => t.status === 'Resolved').length, color: 'bg-emerald-500', icon: CheckCircle },
  ];

  const getPriorityColor = (category) => {
    if (category?.toLowerCase().includes('pothole')) return 'bg-red-100 text-red-600';
    if (category?.toLowerCase().includes('water')) return 'bg-blue-100 text-blue-600';
    return 'bg-emerald-100 text-emerald-600';
  };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-gray-50">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col">
        <div className="p-6">
          <div className="space-y-1">
            <button 
              onClick={() => setActiveTab('inbox')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'inbox' ? 'bg-gov-blue text-white' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <Inbox className="w-5 h-5" />
              <span className="font-semibold">Inbox</span>
            </button>
            <button 
              onClick={() => setActiveTab('map')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'map' ? 'bg-gov-blue text-white' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <MapIcon className="w-5 h-5" />
              <span className="font-semibold">Map View</span>
            </button>
            <button 
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'analytics' ? 'bg-gov-blue text-white' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <BarChart3 className="w-5 h-5" />
              <span className="font-semibold">Analytics</span>
            </button>
          </div>
        </div>
        <div className="mt-auto p-6 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gov-blue/10 rounded-full flex items-center justify-center text-gov-blue font-bold">JD</div>
            <div>
              <div className="text-sm font-bold text-gray-900">Officer John Doe</div>
              <div className="text-xs text-gray-500">Ward 24 Admin</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col overflow-hidden">
        {/* Header with Stats */}
        <header className="p-8 bg-white border-b border-gray-100">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map(s => (
                <div key={s.label} className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                             <p className="text-sm text-gray-500 font-medium mb-1 uppercase tracking-wider">{s.label}</p>
                             <h4 className="text-3xl font-black text-gov-dark">{s.value}</h4>
                        </div>
                        <div className={`p-3 rounded-xl ${s.color.replace('bg-', 'bg-opacity-10 ')} ${s.color.replace('bg-', 'text-')}`}>
                             <s.icon className="w-6 h-6" />
                        </div>
                    </div>
                </div>
              ))}
           </div>
        </header>

        {/* Dynamic Section */}
        <div className="flex-grow overflow-y-auto p-8 relative">
           {activeTab === 'inbox' && (
             <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-200">
                    <div className="flex space-x-2">
                        <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg text-sm font-bold ${filter === 'all' ? 'bg-gov-blue text-white' : 'text-gray-500'}`}>All Tickets</button>
                        <button onClick={() => setFilter('new')} className={`px-4 py-2 rounded-lg text-sm font-bold ${filter === 'new' ? 'bg-gov-blue text-white' : 'text-gray-500'}`}>New</button>
                    </div>
                    <div className="text-sm text-gray-400">Total: {tickets.length}</div>
                </div>

                <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Ticket ID</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Category</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">AI Priority</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {tickets.map(ticket => (
                                <tr 
                                  key={ticket.id} 
                                  className="hover:bg-gray-50/50 cursor-pointer transition-colors group"
                                  onClick={() => setSelectedTicket(ticket)}
                                >
                                    <td className="px-6 py-5">
                                        <div className="font-bold text-gov-blue">{ticket.id}</div>
                                        <div className="text-xs text-gray-400 mt-1 uppercase tracking-tight">{new Date(ticket.createdAt).toLocaleTimeString()}</div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="font-semibold text-gray-700">{ticket.category}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(ticket.category)}`}>
                                            {ticket.category?.includes('Pothole') ? 'CRITICAL' : 'MEDIUM'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center space-x-2">
                                            <div className={`w-2 h-2 rounded-full ${ticket.status === 'Resolved' ? 'bg-emerald-500' : 'bg-yellow-500'}`}></div>
                                            <span className="text-sm font-medium text-gray-600">{ticket.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button className="p-2 text-gray-300 group-hover:text-gov-blue">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {tickets.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-10 text-center text-gray-400 font-medium">No active tickets found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
             </div>
           )}

           {activeTab === 'map' && (
             <div className="h-full rounded-3xl overflow-hidden border border-gray-200">
                <MapContainer center={[19.0760, 72.8777]} zoom={13} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {tickets.filter(t => t.location).map(ticket => (
                    <Marker key={ticket.id} position={[ticket.location.lat, ticket.location.lng]}>
                      <Popup>
                        <div className="p-2">
                           <div className="font-bold text-gov-blue mb-1">{ticket.id}</div>
                           <p className="text-xs text-gray-600 mb-2">{ticket.description}</p>
                           <button onClick={() => setSelectedTicket(ticket)} className="text-xs bg-gov-blue text-white px-3 py-1.5 rounded-lg w-full font-bold">Details</button>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
             </div>
           )}

           {activeTab === 'analytics' && (
              <div className="flex items-center justify-center h-full text-gray-400">
                 Analytics Dashboard Simulated
              </div>
           )}
        </div>
      </main>

      {/* Detail Drawer */}
      <AnimatePresence>
        {selectedTicket && (
          <>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70]"
               onClick={() => setSelectedTicket(null)}
            />
            <motion.aside
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                className="fixed top-0 right-0 h-screen w-full max-w-lg bg-white z-[80] shadow-2xl flex flex-col"
            >
                <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-2xl font-black text-gov-dark">Ticket Detail</h3>
                    <button onClick={() => setSelectedTicket(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                        <X className="w-6 h-6 text-gray-400" />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto p-8 space-y-8">
                    <div className="p-6 bg-gov-blue text-white rounded-[2rem] relative overflow-hidden">
                        <Zap className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10" />
                        <div className="relative z-10">
                            <span className="text-xs font-bold text-white/70 uppercase">Ticket ID</span>
                            <div className="text-3xl font-black mb-4">{selectedTicket.id}</div>
                            <div className="inline-flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold border border-white/30 backdrop-blur-md">
                                {selectedTicket.category}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Citizen Information</h4>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4 p-4 border border-gray-100 rounded-2xl">
                                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                                    <User className="w-6 h-6 text-gray-400" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-gray-900">Anonymous Citizen</div>
                                    <div className="text-xs text-gray-500">Contact: {selectedTicket.whatsapp || 'Not provided'}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Complaint Description</h4>
                        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 italic text-gray-600 leading-relaxed">
                            "{selectedTicket.description}"
                        </div>
                    </div>

                    {selectedTicket.location && (
                        <div>
                             <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">GPS Coordinates</h4>
                             <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                 <span className="font-mono text-gov-emerald font-bold">{selectedTicket.location.lat.toFixed(6)}, {selectedTicket.location.lng.toFixed(6)}</span>
                                 <button className="text-xs text-gov-emerald font-bold underline flex items-center">
                                     <ExternalLink className="w-3 h-3 mr-1" /> Google Maps
                                 </button>
                             </div>
                        </div>
                    )}
                </div>

                <div className="p-8 border-t border-gray-100 grid grid-cols-2 gap-4">
                    {selectedTicket.status === 'Submitted' ? (
                        <>
                            <button 
                                onClick={() => { updateTicketStatus(selectedTicket.id, 'Worker Dispatched'); setSelectedTicket(null); }}
                                className="col-span-2 py-4 bg-gov-blue text-white rounded-2xl font-bold hover:opacity-90 shadow-lg shadow-gov-blue/20"
                            >
                                AI Auto-Dispatch
                            </button>
                            <button className="py-4 border border-gray-200 text-gray-600 rounded-2xl font-bold text-sm">Manual Re-route</button>
                            <button 
                                onClick={() => { updateTicketStatus(selectedTicket.id, 'Resolved'); setSelectedTicket(null); }}
                                className="py-4 bg-emerald-500 text-white rounded-2xl font-bold text-sm"
                            >
                                Mark Resolved
                            </button>
                        </>
                    ) : (
                        <button 
                            disabled
                            className="col-span-2 py-4 bg-gray-100 text-gray-400 rounded-2xl font-bold"
                        >
                            Status: {selectedTicket.status}
                        </button>
                    )}
                </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
