import React from 'react';
import { CompleteClientRecord } from '../../types';
import { PlusCircle, FolderOpen, ShieldCheck, Compass, Sparkles, ArrowRight, Clock, Star, Layers } from 'lucide-react';
import { TATTOO_STYLES } from '../../data/stylesData';
import { MASTER_SYMBOLS } from '../../data/symbolsData';

interface DashboardViewProps {
  clients: CompleteClientRecord[];
  activeClient: CompleteClientRecord | null;
  onNewClient: () => void;
  onSelectClient: (client: CompleteClientRecord) => void;
  onNavigate: (view: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  clients,
  activeClient,
  onNewClient,
  onSelectClient,
  onNavigate
}) => {
  const stylesCount = Object.keys(TATTOO_STYLES).length;
  const symbolsCount = MASTER_SYMBOLS.length;
  const recentClients = clients.slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Studio Hero Banner */}
      <div className="bg-gradient-to-r from-[#12161c] via-[#161c24] to-[#12161c] border border-slate-800 rounded-xl p-8 relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DÖVME TASARIM ASİSTANI V2 · PROFESYONEL STÜDYO SİSTEMİ</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
            Kişisel Analizden Kutsal Dövme Sanatına
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Danışanın numeroloji, astroloji, Enneagram, davranışsal totem, Ebced ve çakra katmanlarını bağımsız motorlarla analiz eden; organik stil bütünlüğüyle kişiye özel dövme reçetesi ve 6 profesyonel AI promptu üreten stüdyo asistanı.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onNewClient}
              className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Yeni Danışan Oluştur</span>
            </button>

            <button
              onClick={() => onNavigate('archive')}
              className="flex items-center gap-2 px-4 py-2.5 border border-slate-800 hover:border-slate-700 bg-slate-900/80 text-slate-200 text-xs font-medium rounded transition-colors"
            >
              <FolderOpen className="w-4 h-4" />
              <span>Danışan Arşivini İncele ({clients.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* System Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-[#12161c] border border-slate-800 rounded-lg">
          <span className="text-[11px] text-slate-500 block">Kayıtlı Danışan</span>
          <span className="text-2xl font-bold font-mono text-slate-100 mt-1 block">{clients.length}</span>
          <span className="text-[10px] text-slate-500">Tam arşiv korumalı</span>
        </div>

        <div className="p-4 bg-[#12161c] border border-slate-800 rounded-lg">
          <span className="text-[11px] text-slate-500 block">Aktif Sembol Kataloğu</span>
          <span className="text-2xl font-bold font-mono text-amber-400 mt-1 block">{symbolsCount}+</span>
          <span className="text-[10px] text-slate-500">20+ kategori</span>
        </div>

        <div className="p-4 bg-[#12161c] border border-slate-800 rounded-lg">
          <span className="text-[11px] text-slate-500 block">Desteklenen Dövme Stili</span>
          <span className="text-2xl font-bold font-mono text-slate-100 mt-1 block">{stylesCount}</span>
          <span className="text-[10px] text-slate-500">Fine Line'dan Irezumi'ye</span>
        </div>

        <div className="p-4 bg-[#12161c] border border-slate-800 rounded-lg">
          <span className="text-[11px] text-slate-500 block">Hesaplama Motorları</span>
          <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">9/9</span>
          <span className="text-[10px] text-emerald-500">Deterministik & Aktif</span>
        </div>
      </div>

      {/* Active Client Resume Card (if session exists) */}
      {activeClient && (
        <div className="bg-[#12161c] border border-amber-500/30 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Star className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-amber-400 uppercase">Aktif Çalışma Seansı</span>
                <h3 className="text-base font-semibold text-slate-100">
                  {activeClient.client.firstName} {activeClient.client.lastName}
                </h3>
              </div>
            </div>

            <button
              onClick={() => onNavigate('analysis')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-medium text-xs rounded transition-colors"
            >
              <span>Çalışmaya Devam Et</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2 border-t border-slate-800/80">
            <div>
              <span className="text-slate-500 block">Totem:</span>
              <span className="text-slate-200 font-medium">{activeClient.totem?.result?.primaryTotem?.name || 'Bekleniyor'}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Enneagram:</span>
              <span className="text-slate-200 font-medium">{activeClient.enneagram?.result?.wingName || 'Bekleniyor'}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Yaşam Yolu:</span>
              <span className="text-slate-200 font-medium">{activeClient.numerology?.lifePathNumber || 'Bekleniyor'}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Burç:</span>
              <span className="text-slate-200 font-medium">{activeClient.astrology?.sunSign || 'Bekleniyor'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Recent Clients Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-200">Son Kayıtlı Danışanlar</h3>
          <button
            onClick={() => onNavigate('archive')}
            className="text-xs text-amber-400 hover:underline"
          >
            Tümünü Gör ({clients.length})
          </button>
        </div>

        {recentClients.length === 0 ? (
          <div className="p-8 text-center bg-[#12161c] border border-slate-800 rounded-lg text-slate-400 text-xs">
            Henüz arşivde danışan bulunmuyor. Yeni bir kayıt açarak süreci deneyimleyin.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentClients.map(c => (
              <div
                key={c.client.id}
                onClick={() => onSelectClient(c)}
                className="p-4 bg-[#12161c] border border-slate-800 hover:border-slate-700 rounded-lg cursor-pointer transition-all hover:translate-y-[-2px] space-y-3"
              >
                <div>
                  <h4 className="text-sm font-semibold text-slate-100">
                    {c.client.firstName} {c.client.lastName}
                  </h4>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    {new Date(c.createdAt).toLocaleDateString('tr-TR')}
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <div className="flex items-center gap-1.5 text-amber-400">
                    <Compass className="w-3.5 h-3.5" />
                    <span>{c.totem?.result?.primaryTotem?.name} Totemi</span>
                  </div>
                  <div>Yaşam Yolu: {c.numerology?.lifePathNumber}</div>
                  <div>Enneagram: {c.enneagram?.result?.wing || `Tip ${c.enneagram?.result?.coreType}`}</div>
                </div>

                <button
                  onClick={e => {
                    e.stopPropagation();
                    onSelectClient(c);
                  }}
                  className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs rounded border border-slate-800 transition-colors"
                >
                  Dosyayı Aç
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
