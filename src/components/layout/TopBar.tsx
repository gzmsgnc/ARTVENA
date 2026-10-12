import React from 'react';
import { Shield, Sparkles, PlusCircle, CheckCircle, Lock, Unlock } from 'lucide-react';

interface TopBarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  isAdmin: boolean;
  onOpenAdminModal: () => void;
  onNewClient: () => void;
  hasActiveClient: boolean;
  activeClientName?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeView,
  onNavigate,
  isAdmin,
  onOpenAdminModal,
  onNewClient,
  hasActiveClient,
  activeClientName
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0d1117] border-b border-slate-800/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-700/20 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:border-amber-400 transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-semibold tracking-wide text-slate-100 group-hover:text-amber-400 transition-colors">
                Dövme Tasarım Asistanı
              </span>
              <span className="text-xs font-mono text-amber-500 ml-1.5 uppercase">V2</span>
            </div>
          </button>

          {hasActiveClient && activeClientName && (
            <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-slate-800 text-xs text-slate-400">
              <span className="text-slate-500">Aktif Danışan:</span>
              <span className="font-medium text-slate-200">{activeClientName}</span>
            </div>
          )}
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`hover:text-amber-400 transition-colors ${activeView === 'dashboard' ? 'text-amber-400 font-semibold' : ''}`}
          >
            Ana Panel
          </button>
          <button
            onClick={() => onNavigate('client_form')}
            className={`hover:text-amber-400 transition-colors ${activeView === 'client_form' ? 'text-amber-400 font-semibold' : ''}`}
          >
            Danışan Formu
          </button>
          <button
            onClick={() => onNavigate('enneagram')}
            className={`hover:text-amber-400 transition-colors ${activeView === 'enneagram' ? 'text-amber-400 font-semibold' : ''}`}
          >
            Enneagram Testi
          </button>
          <button
            onClick={() => onNavigate('totem')}
            className={`hover:text-amber-400 transition-colors ${activeView === 'totem' ? 'text-amber-400 font-semibold' : ''}`}
          >
            Totem Testi
          </button>
          <button
            onClick={() => onNavigate('analysis')}
            className={`hover:text-amber-400 transition-colors ${activeView === 'analysis' ? 'text-amber-400 font-semibold' : ''}`}
          >
            Analizler
          </button>
          <button
            onClick={() => onNavigate('symbols')}
            className={`hover:text-amber-400 transition-colors ${activeView === 'symbols' ? 'text-amber-400 font-semibold' : ''}`}
          >
            Semboller
          </button>
          <button
            onClick={() => onNavigate('design_preferences')}
            className={`hover:text-amber-400 transition-colors ${activeView === 'design_preferences' ? 'text-amber-400 font-semibold' : ''}`}
          >
            Stil & Yerleşim
          </button>
          <button
            onClick={() => onNavigate('recipe')}
            className={`hover:text-amber-400 transition-colors ${activeView === 'recipe' ? 'text-amber-400 font-semibold' : ''}`}
          >
            Reçeteler
          </button>
          <button
            onClick={() => onNavigate('prompts')}
            className={`hover:text-amber-400 transition-colors ${activeView === 'prompts' ? 'text-amber-400 font-semibold' : ''}`}
          >
            Promptlar
          </button>
          <button
            onClick={() => onNavigate('archive')}
            className={`hover:text-amber-400 transition-colors ${activeView === 'archive' ? 'text-amber-400 font-semibold' : ''}`}
          >
            Arşiv
          </button>
          <button
            onClick={() => onNavigate('validation')}
            className={`hover:text-amber-400 transition-colors ${activeView === 'validation' ? 'text-amber-400 font-semibold' : ''}`}
          >
            Test Merkezi
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onNewClient}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors whitespace-nowrap"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Yeni Danışan</span>
          </button>

          <button
            onClick={onOpenAdminModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded border border-slate-800 hover:border-slate-700 bg-slate-900/60 text-slate-300 hover:text-white transition-colors whitespace-nowrap"
            title={isAdmin ? 'Yönetici oturumu aktif' : 'Yönetici girişi yap'}
          >
            {isAdmin ? (
              <>
                <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline text-emerald-400">Yönetici</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Giriş</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
