import React from 'react';
import { CompleteClientRecord } from '../../types';
import { Printer, Download, ArrowLeft, ShieldCheck, Sparkles, Compass } from 'lucide-react';
import { exportClientToJson } from '../../services/storageService';

interface ExportReportViewProps {
  record: CompleteClientRecord;
  onBack: () => void;
}

export const ExportReportView: React.FC<ExportReportViewProps> = ({ record, onBack }) => {
  const activeVersion =
    record.designVersions?.find(v => v.id === record.activeVersionId) ||
    record.designVersions?.[0];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    const jsonStr = exportClientToJson(record);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dovme_raporu_${record.client.firstName}_${record.client.lastName}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Action Header - Hidden during print */}
      <div className="flex items-center justify-between print:hidden">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Geri Dön</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadJson}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-800 hover:border-slate-700 bg-slate-900 text-slate-200 rounded transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>JSON İndir</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-slate-950 rounded transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Raporu Yazdır / PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Dossier Sheet */}
      <div className="bg-[#12161c] print:bg-white print:text-black border border-slate-800 print:border-none rounded-lg p-8 space-y-8 shadow-xl">
        {/* Dossier Header */}
        <div className="border-b border-slate-800 print:border-slate-300 pb-6 flex items-start justify-between">
          <div>
            <div className="text-[11px] font-mono text-amber-400 print:text-amber-700 uppercase tracking-widest">
              Dövme Tasarım Asistanı · Kişisel Analiz & Tasarım Raporu
            </div>
            <h1 className="text-2xl font-bold text-slate-100 print:text-black mt-1">
              {record.client.firstName} {record.client.lastName}
            </h1>
            <p className="text-xs text-slate-400 print:text-slate-600 mt-1">
              Doğum: {record.client.birthDate} ({record.client.birthPlace || 'Belirtilmedi'}) · Kayıt No: {record.client.id}
            </p>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-mono text-slate-500 block">
              Tarih: {new Date().toLocaleDateString('tr-TR')}
            </span>
            <span className="text-xs font-semibold text-slate-300 print:text-slate-700 block mt-0.5">
              {activeVersion?.name || 'Tasarım Versiyonu'}
            </span>
          </div>
        </div>

        {/* 1. Birleşik Arketip */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-amber-400 print:text-amber-800 uppercase tracking-wide">
            1. Birleşik Kişisel Arketip
          </h2>
          <div className="p-4 bg-slate-900/60 print:bg-slate-100 rounded border border-slate-800 print:border-slate-300 space-y-2 text-xs">
            <div className="text-base font-semibold text-slate-100 print:text-black">
              {record.unifiedArchetype.archetitle}
            </div>
            <p className="text-slate-300 print:text-slate-800 leading-relaxed">
              {record.unifiedArchetype.coreGift}
            </p>
            <div className="pt-2 border-t border-slate-800 print:border-slate-300 text-[11px] text-slate-400 print:text-slate-600">
              <strong>Görsel Metafor:</strong> {record.unifiedArchetype.visualMetaphor}
            </div>
          </div>
        </div>

        {/* 2. Temel Analiz Özetleri */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Numeroloji */}
          <div className="p-4 bg-slate-900/40 print:bg-slate-50 rounded border border-slate-800 print:border-slate-200 space-y-1.5">
            <h3 className="font-semibold text-slate-200 print:text-black">Numeroloji Verileri</h3>
            <div>Yaşam Yolu: <strong>{record.numerology.lifePathNumber}</strong></div>
            <div>İfade Sayısı: <strong>{record.numerology.expressionNumber}</strong></div>
            <div>Ruh Arzusu: <strong>{record.numerology.soulUrgeNumber}</strong></div>
            <p className="text-slate-400 print:text-slate-600 text-[11px] pt-1">
              {record.numerology.explanations.lifePath}
            </p>
          </div>

          {/* Astroloji */}
          <div className="p-4 bg-slate-900/40 print:bg-slate-50 rounded border border-slate-800 print:border-slate-200 space-y-1.5">
            <h3 className="font-semibold text-slate-200 print:text-black">Astrolojik Matris</h3>
            <div>Güneş Burcu: <strong>{record.astrology.sunSign}</strong> ({record.astrology.element})</div>
            <div>Yükselen Burç: <strong>{record.astrology.ascendantEstimate}</strong></div>
            <div>Yönetici Gezegen: <strong>{record.astrology.rulingPlanet}</strong></div>
            <div className="text-slate-400 print:text-slate-600 text-[11px] pt-1">
              Semboller: {record.astrology.cosmicSymbols.join(' · ')}
            </div>
          </div>

          {/* Enneagram */}
          <div className="p-4 bg-slate-900/40 print:bg-slate-50 rounded border border-slate-800 print:border-slate-200 space-y-1.5">
            <h3 className="font-semibold text-slate-200 print:text-black">Enneagram Profili</h3>
            <div>Temel Tip: <strong>Tip {record.enneagram.result.coreType} ({record.enneagram.result.typeName})</strong></div>
            <div>Kanat: <strong>{record.enneagram.result.wingName}</strong></div>
            <div>Gelişim: Tip {record.enneagram.result.growthDirection} · Stres: Tip {record.enneagram.result.stressDirection}</div>
            <p className="text-slate-400 print:text-slate-600 text-[11px] pt-1">
              {record.enneagram.result.coreMotivation}
            </p>
          </div>

          {/* Totem */}
          <div className="p-4 bg-slate-900/40 print:bg-slate-50 rounded border border-slate-800 print:border-slate-200 space-y-1.5">
            <h3 className="font-semibold text-slate-200 print:text-black">Totem Hayvanları</h3>
            <div>Birincil: <strong>{record.totem.result.primaryTotem.name}</strong> ({record.totem.result.primaryTotem.archetype})</div>
            <div>İkincil: <strong>{record.totem.result.secondaryTotem.name}</strong></div>
            <div>Gölge: <strong>{record.totem.result.shadowTotem.name}</strong></div>
            <p className="text-slate-400 print:text-slate-600 text-[11px] pt-1">
              {record.totem.result.primaryTotem.spiritualMeaning}
            </p>
          </div>
        </div>

        {/* 3. Kişisel Dövme Reçetesi */}
        {activeVersion?.personalRecipe && (
          <div className="space-y-3 text-xs">
            <h2 className="text-sm font-bold text-amber-400 print:text-amber-800 uppercase tracking-wide">
              3. Kişisel Dövme Tasarım Reçetesi
            </h2>
            <div className="p-4 bg-slate-900/60 print:bg-slate-100 rounded border border-slate-800 print:border-slate-300 space-y-2">
              <div className="font-semibold text-slate-100 print:text-black">
                {activeVersion.personalRecipe.conceptTitle}
              </div>
              <p className="text-slate-300 print:text-slate-800 leading-relaxed">
                {activeVersion.personalRecipe.archetypeNarrative}
              </p>
              <div className="pt-2 text-slate-400 print:text-slate-700">
                <strong>Odak Özne:</strong> {activeVersion.personalRecipe.primarySubjectDescription}
              </div>
              <div className="pt-2 text-slate-400 print:text-slate-700">
                <strong>Ruhsal Anlam:</strong> {activeVersion.personalRecipe.spiritualMeaningSummary}
              </div>
            </div>
          </div>
        )}

        {/* 4. Dövme Sanatçısı Teknik Şartnamesi */}
        {activeVersion?.technicalRecipe && (
          <div className="space-y-3 text-xs">
            <h2 className="text-sm font-bold text-slate-300 print:text-slate-800 uppercase tracking-wide">
              4. Dövme Sanatçısı Teknik Şartnamesi
            </h2>
            <div className="p-4 bg-slate-900/40 print:bg-slate-50 rounded border border-slate-800 print:border-slate-300 space-y-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-medium">
                <div>Stil: {activeVersion.technicalRecipe.styleName}</div>
                <div>Yerleşim: {activeVersion.technicalRecipe.placementName}</div>
                <div>İğneler: {activeVersion.technicalRecipe.recommendedNeedleGrouping.join(', ')}</div>
                <div>Negatif Alan: {activeVersion.technicalRecipe.negativeSpaceRatio}</div>
              </div>
              <div className="text-[11px] text-slate-400 print:text-slate-600 pt-2 border-t border-slate-800 print:border-slate-300">
                {activeVersion.technicalRecipe.antiBlowoutMeasures}
              </div>
            </div>
          </div>
        )}

        {/* Studio Footer Note */}
        <div className="pt-6 border-t border-slate-800 print:border-slate-300 text-[11px] text-slate-500 print:text-slate-600 flex justify-between items-center">
          <span>Dövme Tasarım Asistanı V2 · Gizlilik ve Telif Korumalı</span>
          <span>Stüdyo Arşiv Nüshası</span>
        </div>
      </div>
    </div>
  );
};
