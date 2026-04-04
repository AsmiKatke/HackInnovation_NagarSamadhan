import React, { createContext, useContext, useState, useEffect } from 'react';

const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('nagar_tickets');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('nagar_tickets', JSON.stringify(tickets));
  }, [tickets]);

  const addTicket = (ticket) => {
    setTickets((prev) => [ticket, ...prev]);
  };

  const updateTicketStatus = (id, status) => {
    setTickets((prev) => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  return (
    <TicketContext.Provider value={{ tickets, addTicket, updateTicketStatus }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => useContext(TicketContext);
