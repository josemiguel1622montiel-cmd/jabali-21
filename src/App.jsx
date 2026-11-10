import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardView from './components/DashboardView';
import Calendar30DaysView from './components/Calendar30DaysView';
import CommercialStudioView from './components/CommercialStudioView';
import CampaignModesView from './components/CampaignModesView';
import GraphicStudioView from './components/GraphicStudioView';
import ProductCatalogView from './components/ProductCatalogView';
import AIAgentChatView from './components/AIAgentChatView';
import SettingsModal from './components/SettingsModal';

import { INITIAL_CALENDAR_DAYS, INITIAL_PRODUCTS, BRAND_IDENTITY } from './data/brandData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Persistence in localStorage
  const [calendarDays, setCalendarDays] = useState(() => {
    try {
      const saved = localStorage.getItem('jabali21_calendar');
      return saved ? JSON.parse(saved) : INITIAL_CALENDAR_DAYS;
    } catch (e) {
      return INITIAL_CALENDAR_DAYS;
    }
  });

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('jabali21_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch (e) {
      return INITIAL_PRODUCTS;
    }
  });

  const [apiKeys, setApiKeys] = useState(() => {
    try {
      const saved = localStorage.getItem('jabali21_apikeys');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [selectedDay, setSelectedDay] = useState(calendarDays[0]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('jabali21_calendar', JSON.stringify(calendarDays));
  }, [calendarDays]);

  useEffect(() => {
    localStorage.setItem('jabali21_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('jabali21_apikeys', JSON.stringify(apiKeys));
  }, [apiKeys]);

  const handleApproveDay = (dayNum) => {
    setCalendarDays((prev) =>
      prev.map((d) => (d.day === dayNum ? { ...d, status: 'approved' } : d))
    );
    if (selectedDay && selectedDay.day === dayNum) {
      setSelectedDay({ ...selectedDay, status: 'approved' });
    }
  };

  const handleRestoreDefaults = () => {
    setCalendarDays(INITIAL_CALENDAR_DAYS);
    setProducts(INITIAL_PRODUCTS);
    setSelectedDay(INITIAL_CALENDAR_DAYS[0]);
    localStorage.removeItem('jabali21_calendar');
    localStorage.removeItem('jabali21_products');
  };

  const pendingApprovalsCount = calendarDays.filter((d) => d.status === 'pending').length;

  return (
    <div className="min-h-screen bg-carbon-950 text-gray-100 flex flex-col font-sans selection:bg-dorado-500 selection:text-carbon-950">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openSettings={() => setIsSettingsOpen(true)}
        pendingApprovalsCount={pendingApprovalsCount}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <DashboardView
            calendarDays={calendarDays}
            products={products}
            setActiveTab={setActiveTab}
            setSelectedDay={setSelectedDay}
            onApproveDay={handleApproveDay}
          />
        )}

        {activeTab === 'calendar' && (
          <Calendar30DaysView
            calendarDays={calendarDays}
            setCalendarDays={setCalendarDays}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            products={products}
          />
        )}

        {activeTab === 'commercials' && (
          <CommercialStudioView
            products={products}
          />
        )}

        {activeTab === 'modes' && (
          <CampaignModesView
            products={products}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'graphics' && (
          <GraphicStudioView
            products={products}
          />
        )}

        {activeTab === 'catalog' && (
          <ProductCatalogView
            products={products}
            setProducts={setProducts}
          />
        )}

        {activeTab === 'ai-agent' && (
          <AIAgentChatView
            products={products}
            apiKeys={apiKeys}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-madera-800/60 bg-carbon-900/90 py-8 px-4 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-xl">🐗</span>
            <div>
              <span className="font-brand font-black text-dorado-400 tracking-wider text-sm block">
                JABALÍ 21
              </span>
              <span className="italic text-gray-400 text-[11px]">
                {BRAND_IDENTITY.slogan}
              </span>
            </div>
          </div>

          <div className="text-center md:text-right space-y-1">
            <p className="text-gray-300">
              Plataforma de Inteligencia Artificial para Publicidad, Marketing & Producción Audiovisual.
            </p>
            <p className="text-gray-500 text-[11px]">
              Protección Activa: No publica ni gasta sin autorización • Precios reales de catálogo • Hecho a la medida para JABALÍ 21.
            </p>
          </div>
        </div>
      </footer>

      {/* Settings & API Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKeys={apiKeys}
        setApiKeys={setApiKeys}
        calendarDays={calendarDays}
        products={products}
        onRestoreDefaults={handleRestoreDefaults}
      />
    </div>
  );
}
