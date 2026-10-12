import React, { useState } from 'react';
import { TOTEM_QUESTIONS } from '../../data/totemData';
import { calculateTotem } from '../../engines/totemEngine';
import { TotemAnswer, TotemResult } from '../../types';
import { Copy, ArrowRight, Sparkles, Shield, Compass, Eye } from 'lucide-react';

interface TotemTestViewProps {
  answers: TotemAnswer[];
  onSaveAnswers: (answers: TotemAnswer[], result: TotemResult) => void;
  onNext: () => void;
}

export const TotemTestView: React.FC<TotemTestViewProps> = ({
  answers,
  onSaveAnswers,
  onNext
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answerMap, setAnswerMap] = useState<Record<number, number>>(() => {
    const map: Record<number, number> = {};
    for (const a of answers) {
      map[a.questionId] = a.selectedOptionIndex;
    }
    return map;
  });
  const [copiedText, setCopiedText] = useState(false);

  const answeredCount = Object.keys(answerMap).length;

  const handleSelectOption = (optionIndex: number) => {
    const q = TOTEM_QUESTIONS[currentIdx];
    const newMap = { ...answerMap, [q.id]: optionIndex };
    setAnswerMap(newMap);

    const answerList: TotemAnswer[] = Object.entries(newMap).map(([qid, optIdx]) => ({
      questionId: parseInt(qid, 10),
      selectedOptionIndex: optIdx
    }));

    const result = calculateTotem(answerList);
    onSaveAnswers(answerList, result);

    if (currentIdx < TOTEM_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handleQuickFill = () => {
    // Fill sample profile (e.g., Wolf primary, Owl secondary)
    const newMap: Record<number, number> = {};
    for (let i = 0; i < TOTEM_QUESTIONS.length; i++) {
      newMap[TOTEM_QUESTIONS[i].id] = i % 4; // Varied balanced profile
    }
    // Boost wolf & owl specific choices
    newMap[2] = 0; // Wolf
    newMap[8] = 1; // Wolf
    newMap[12] = 0; // Wolf
    newMap[1] = 0; // Owl
    newMap[3] = 0; // Owl

    setAnswerMap(newMap);
    const answerList: TotemAnswer[] = Object.entries(newMap).map(([qid, optIdx]) => ({
      questionId: parseInt(qid, 10),
      selectedOptionIndex: optIdx
    }));

    const result = calculateTotem(answerList);
    onSaveAnswers(answerList, result);
  };

  const activeAnswerList: TotemAnswer[] = Object.entries(answerMap).map(([qid, optIdx]) => ({
    questionId: parseInt(qid, 10),
    selectedOptionIndex: optIdx
  }));
  const currentResult = calculateTotem(activeAnswerList);
  const currentQuestion = TOTEM_QUESTIONS[currentIdx];

  const handleCopyTest = () => {
    const lines = [
      '=== TOTEM DAVRANIŞSAL ANALİZ TESTİ VE SONUÇLARI ===',
      `Birincil Totem: ${currentResult.primaryTotem.name} (${currentResult.primaryTotem.archetype})`,
      `İkincil Totem: ${currentResult.secondaryTotem.name} (${currentResult.secondaryTotem.archetype})`,
      `Gölge Totem: ${currentResult.shadowTotem.name} (${currentResult.shadowTotem.archetype})`,
      '',
      '--- DAVRANIŞSAL ÖZET ---',
      currentResult.behavioralSummary,
      '',
      '--- BİRİNCİL TOTEM SOYUT TASARIM DİLİ ---',
      `Geometrik Formlar: ${currentResult.primaryTotem.abstractDesignEquivalents.geometricForms.join(', ')}`,
      `Çizgi Dinamiği: ${currentResult.primaryTotem.abstractDesignEquivalents.lineDynamics}`,
      `Negatif Alan Rolü: ${currentResult.primaryTotem.abstractDesignEquivalents.negativeSpaceRole}`,
      `Kompozisyon Akışı: ${currentResult.primaryTotem.abstractDesignEquivalents.compositionFlow}`,
      '',
      '--- SORULAR VE VERİLEN SEÇİMLER ---',
      ...TOTEM_QUESTIONS.map(q => {
        const optIdx = answerMap[q.id];
        const optText = optIdx !== undefined && q.options[optIdx] ? q.options[optIdx].text : 'Cevaplanmadı';
        return `[Soru ${q.id} - ${q.axis}] ${q.prompt}\nSeçim: ${optText}`;
      })
    ];

    navigator.clipboard.writeText(lines.join('\n'));
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-100">Davranışsal Totem Analiz Testi</h2>
          <p className="text-xs text-slate-400">
            24 davranışsal eksen · Tehdit, sadakat, inziva, güç, zeka ve dönüşüm profillemesi
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleQuickFill}
            className="px-3 py-1.5 text-xs text-amber-400 border border-amber-500/30 hover:border-amber-400 bg-amber-500/10 rounded transition-colors"
          >
            Örnek Cevap Seti Doldur
          </button>
          <button
            onClick={handleCopyTest}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 bg-slate-900 rounded transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copiedText ? 'Kopyalandı' : 'Testi Kopyala'}</span>
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-[#12161c] border border-slate-800 rounded-lg p-4 space-y-2">
        <div className="flex justify-between text-xs text-slate-400">
          <span>İlerleme: {answeredCount} / {TOTEM_QUESTIONS.length} Soru Tamamlandı</span>
          <span className="font-mono text-amber-400">%{Math.round((answeredCount / TOTEM_QUESTIONS.length) * 100)}</span>
        </div>
        <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-amber-400 h-full transition-all duration-300"
            style={{ width: `${(answeredCount / TOTEM_QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-[#12161c] border border-slate-800 rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-amber-400">
            Soru {currentIdx + 1} / {TOTEM_QUESTIONS.length}
          </span>
          <span className="text-xs text-slate-500">
            Eksen: {currentQuestion.axis}
          </span>
        </div>

        <div>
          <p className="text-base text-slate-100 font-medium leading-relaxed">
            "{currentQuestion.prompt}"
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((opt, optIdx) => {
            const isSelected = answerMap[currentQuestion.id] === optIdx;
            return (
              <button
                key={optIdx}
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full p-4 rounded-lg border text-left transition-all flex items-start gap-3 ${
                  isSelected
                    ? 'border-amber-400 bg-amber-500/10 text-amber-300'
                    : 'border-slate-800 hover:border-slate-700 bg-slate-900/60 text-slate-300 hover:text-white'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono ${
                  isSelected ? 'border-amber-400 bg-amber-400 text-slate-950 font-bold' : 'border-slate-700 text-slate-500'
                }`}>
                  {String.fromCharCode(65 + optIdx)}
                </div>
                <div className="text-xs leading-relaxed">{opt.text}</div>
              </button>
            );
          })}
        </div>

        {/* Question Selector Pagination */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
          <button
            onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
            disabled={currentIdx === 0}
            className="px-3 py-1.5 text-xs text-slate-400 hover:text-white disabled:opacity-40"
          >
            Önceki Soru
          </button>

          <div className="flex gap-1 overflow-x-auto py-1 max-w-[280px] sm:max-w-[400px]">
            {TOTEM_QUESTIONS.map((q, idx) => {
              const isAnswered = answerMap[q.id] !== undefined;
              const isCurr = idx === currentIdx;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`w-6 h-6 rounded text-[10px] font-mono shrink-0 transition-colors ${
                    isCurr
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : isAnswered
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-slate-900/80 text-slate-600 hover:text-slate-400'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentIdx(Math.min(TOTEM_QUESTIONS.length - 1, currentIdx + 1))}
            disabled={currentIdx === TOTEM_QUESTIONS.length - 1}
            className="px-3 py-1.5 text-xs text-slate-400 hover:text-white disabled:opacity-40"
          >
            Sonraki Soru
          </button>
        </div>
      </div>

      {/* Calculated Totem Results Breakdown */}
      <div className="bg-[#12161c] border border-slate-800 rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-slate-100">Totem Analiz Sonuçları</h3>
          </div>
          <span className="text-xs text-slate-500">
            Davranışsal Ağırlık Dağılımı
          </span>
        </div>

        {/* 3 Animal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Primary */}
          <div className="p-4 bg-slate-900/80 border border-amber-500/40 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-amber-400 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" />
                <span>Birincil Totem (Primary)</span>
              </span>
              <span className="text-xs font-mono text-slate-400">{currentResult.scores[currentResult.primaryTotem.id] || 0} Puan</span>
            </div>
            <div className="text-base font-semibold text-slate-100">
              {currentResult.primaryTotem.name}
            </div>
            <div className="text-xs text-amber-300 font-medium">
              {currentResult.primaryTotem.archetype}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pt-1">
              {currentResult.primaryTotem.spiritualMeaning}
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
              <strong>Özellikler:</strong> {currentResult.primaryTotem.coreTraits.join(' · ')}
            </div>
          </div>

          {/* Secondary */}
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" />
                <span>İkincil Totem (Secondary)</span>
              </span>
              <span className="text-xs font-mono text-slate-400">{currentResult.scores[currentResult.secondaryTotem.id] || 0} Puan</span>
            </div>
            <div className="text-base font-semibold text-slate-100">
              {currentResult.secondaryTotem.name}
            </div>
            <div className="text-xs text-emerald-300 font-medium">
              {currentResult.secondaryTotem.archetype}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pt-1">
              {currentResult.secondaryTotem.spiritualMeaning}
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
              <strong>Özellikler:</strong> {currentResult.secondaryTotem.coreTraits.join(' · ')}
            </div>
          </div>

          {/* Shadow */}
          <div className="p-4 bg-slate-900/80 border border-rose-950/60 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-rose-400 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <span>Gölge Totem (Shadow)</span>
              </span>
              <span className="text-xs font-mono text-slate-400">{currentResult.scores[currentResult.shadowTotem.id] || 0} Puan</span>
            </div>
            <div className="text-base font-semibold text-slate-100">
              {currentResult.shadowTotem.name}
            </div>
            <div className="text-xs text-rose-300 font-medium">
              {currentResult.shadowTotem.archetype}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pt-1">
              {currentResult.shadowTotem.shadowTrait}
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
              <strong>Dönüşüm Çağrısı:</strong> Bilinçaltı sınırlarını şifalandırma potansiyeli.
            </div>
          </div>
        </div>

        {/* Tie-Break Audit Notice if applicable */}
        {currentResult.tieBreakAudit && (
          <div className="p-3 bg-amber-950/40 border border-amber-900/60 rounded-lg text-xs text-amber-300 space-y-1">
            <div className="font-semibold flex items-center gap-1.5">
              <span>Denetimli Eşitlik (Tie-Break) Çözümü:</span>
              <span className="font-mono text-[11px] bg-amber-900/40 px-1.5 py-0.5 rounded">
                {currentResult.tieBreakAudit.tieBreakMethod}
              </span>
            </div>
            <p className="text-[11px] text-amber-200/90 leading-relaxed">
              {currentResult.tieBreakAudit.reason}
            </p>
          </div>
        )}

        {/* Shadow Audit Note */}
        {currentResult.shadowAudit && (
          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg text-xs text-slate-400">
            <span className="text-slate-300 font-medium">Gölge Totem Tespit Gerekçesi: </span>
            <span>{currentResult.shadowAudit.reason}</span>
          </div>
        )}

        {/* 12 Animals Ranking Table */}
        {currentResult.ranking && currentResult.ranking.length > 0 && (
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">Tüm Hayvanların Puan Sıralaması & Ağırlık Yüzdeleri:</span>
              <span className="text-[11px] text-slate-500 font-mono">12 Hayvan Arketipleri</span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-lg overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-2 px-3">Sıra</th>
                    <th className="py-2 px-3">Hayvan</th>
                    <th className="py-2 px-3">Puan</th>
                    <th className="py-2 px-3">Yüzde</th>
                    <th className="py-2 px-3">Eşleşme Durumu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {currentResult.ranking.map(item => (
                    <tr key={item.animalId} className={
                      item.animalId === currentResult.primaryTotem.id
                        ? 'bg-amber-950/20 font-medium text-amber-300'
                        : item.animalId === currentResult.secondaryTotem.id
                        ? 'bg-emerald-950/20 text-emerald-300'
                        : item.animalId === currentResult.shadowTotem.id
                        ? 'bg-rose-950/20 text-rose-300'
                        : ''
                    }>
                      <td className="py-2 px-3 font-mono text-[11px]">{item.rank}</td>
                      <td className="py-2 px-3">{item.name}</td>
                      <td className="py-2 px-3 font-mono">{item.score}</td>
                      <td className="py-2 px-3 font-mono">%{item.percentage}</td>
                      <td className="py-2 px-3 text-[11px] opacity-90">{item.matchRationale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Abstract equivalents callout */}
        <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg space-y-2 text-xs">
          <div className="font-semibold text-amber-400">
            {currentResult.primaryTotem.name} İçin Soyut Tasarım Dil Kodları (Dövme Geometrisi):
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
            <div>
              <span className="text-slate-500 block">Geometrik Formlar:</span>
              <span>{currentResult.primaryTotem.abstractDesignEquivalents.geometricForms.join(', ')}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Çizgi Dinamiği:</span>
              <span>{currentResult.primaryTotem.abstractDesignEquivalents.lineDynamics}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Negatif Alan Kullanımı:</span>
              <span>{currentResult.primaryTotem.abstractDesignEquivalents.negativeSpaceRole}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Kompozisyon Akış Vektörü:</span>
              <span>{currentResult.primaryTotem.abstractDesignEquivalents.compositionFlow}</span>
            </div>
          </div>
        </div>

        {/* Navigation Action */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-medium text-xs rounded transition-colors"
          >
            <span>Tüm Analizleri İncele</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
