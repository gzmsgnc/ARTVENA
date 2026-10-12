import React, { useState } from 'react';
import { ENNEAGRAM_QUESTIONS } from '../../data/enneagramQuestions';
import { calculateEnneagram } from '../../engines/enneagramEngine';
import { EnneagramAnswer, EnneagramResult } from '../../types';
import { Check, Copy, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';

interface EnneagramTestViewProps {
  answers: EnneagramAnswer[];
  onSaveAnswers: (answers: EnneagramAnswer[], result: EnneagramResult) => void;
  onNext: () => void;
}

export const EnneagramTestView: React.FC<EnneagramTestViewProps> = ({
  answers,
  onSaveAnswers,
  onNext
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answerMap, setAnswerMap] = useState<Record<number, number>>(() => {
    const map: Record<number, number> = {};
    for (const a of answers) {
      map[a.questionId] = a.score;
    }
    return map;
  });
  const [copiedText, setCopiedText] = useState(false);

  const answeredCount = Object.keys(answerMap).length;
  const isComplete = answeredCount === ENNEAGRAM_QUESTIONS.length;

  const handleSelectScore = (score: number) => {
    const q = ENNEAGRAM_QUESTIONS[currentIdx];
    const newMap = { ...answerMap, [q.id]: score };
    setAnswerMap(newMap);

    const answerList: EnneagramAnswer[] = Object.entries(newMap).map(([qid, sc]) => ({
      questionId: parseInt(qid, 10),
      score: sc
    }));

    const result = calculateEnneagram(answerList);
    onSaveAnswers(answerList, result);

    if (currentIdx < ENNEAGRAM_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handleQuickFill = () => {
    // Fills balanced authentic profile (e.g., Type 4w5 artist inclination)
    const newMap: Record<number, number> = {};
    for (const q of ENNEAGRAM_QUESTIONS) {
      if (q.typeTarget === 4) newMap[q.id] = 5;
      else if (q.typeTarget === 5) newMap[q.id] = 4;
      else if (q.typeTarget === 1) newMap[q.id] = 3;
      else if (q.typeTarget === 8) newMap[q.id] = 2;
      else newMap[q.id] = 3;
    }
    setAnswerMap(newMap);

    const answerList: EnneagramAnswer[] = Object.entries(newMap).map(([qid, sc]) => ({
      questionId: parseInt(qid, 10),
      score: sc
    }));

    const result = calculateEnneagram(answerList);
    onSaveAnswers(answerList, result);
  };

  const currentQuestion = ENNEAGRAM_QUESTIONS[currentIdx];
  const activeAnswerList: EnneagramAnswer[] = Object.entries(answerMap).map(([qid, sc]) => ({
    questionId: parseInt(qid, 10),
    score: sc
  }));
  const currentResult = calculateEnneagram(activeAnswerList);

  const handleCopyTest = () => {
    const lines = [
      '=== ENNEAGRAM KAPSAMLI TEST VE SONUÇ RAPORU ===',
      `Tespit Edilen Tip: Tip ${currentResult.coreType} (${currentResult.typeName})`,
      `Kanat (Wing): ${currentResult.wingName}`,
      `Temel Motivasyon: ${currentResult.coreMotivation}`,
      `Temel Korku: ${currentResult.coreFear}`,
      `Gelişim Yönü (Entegrasyon): Tip ${currentResult.growthDirection}`,
      `Stres Yönü (Dezintegrasyon): Tip ${currentResult.stressDirection}`,
      '',
      '--- TİP PUAN DAĞILIMI ---',
      ...Object.entries(currentResult.typeScores).map(([t, s]) => `Tip ${t}: ${s} puan`),
      '',
      '--- SORULAR VE VERİLEN CEVAPLAR ---',
      ...ENNEAGRAM_QUESTIONS.map(q => {
        const sc = answerMap[q.id] || 0;
        return `[Soru ${q.id}] (Hedef: Tip ${q.typeTarget}) ${q.text} -> Cevap: ${sc}/5`;
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
          <h2 className="text-xl font-semibold text-slate-100">Kapsamlı Enneagram Analiz Testi</h2>
          <p className="text-xs text-slate-400">
            27 calibrated soru · Davranış eksenleri, stres tepkileri, savunma mekanizmaları ve kanat analizi
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

      {/* Progress Bar */}
      <div className="bg-[#12161c] border border-slate-800 rounded-lg p-4 space-y-2">
        <div className="flex justify-between text-xs text-slate-400">
          <span>İlerleme: {answeredCount} / {ENNEAGRAM_QUESTIONS.length} Soru Tamamlandı</span>
          <span className="font-mono text-amber-400">%{Math.round((answeredCount / ENNEAGRAM_QUESTIONS.length) * 100)}</span>
        </div>
        <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-amber-400 h-full transition-all duration-300"
            style={{ width: `${(answeredCount / ENNEAGRAM_QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-[#12161c] border border-slate-800 rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-amber-400">
            Soru {currentIdx + 1} / {ENNEAGRAM_QUESTIONS.length}
          </span>
          <span className="text-xs text-slate-500">
            {currentQuestion.dimension}
          </span>
        </div>

        <div>
          <p className="text-base text-slate-100 font-medium leading-relaxed">
            "{currentQuestion.text}"
          </p>
          <p className="text-xs text-slate-400 mt-2 italic">
            Odak: {currentQuestion.contextHint}
          </p>
        </div>

        {/* 1-5 Likert Options */}
        <div className="space-y-2 pt-2">
          <div className="text-xs text-slate-400 mb-2">Bu ifade sizi ne kadar tanımlıyor?</div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
            {[
              { score: 1, label: 'Hiç Bana Uygun Değil' },
              { score: 2, label: 'Nadiren / Az Uygun' },
              { score: 3, label: 'Kısmen Uygun' },
              { score: 4, label: 'Çoğunlukla Uygun' },
              { score: 5, label: 'Tamamen Beni Tanımlıyor' }
            ].map(opt => {
              const isSelected = answerMap[currentQuestion.id] === opt.score;
              return (
                <button
                  key={opt.score}
                  onClick={() => handleSelectScore(opt.score)}
                  className={`p-3 rounded border text-left transition-all ${
                    isSelected
                      ? 'border-amber-400 bg-amber-500/10 text-amber-300'
                      : 'border-slate-800 hover:border-slate-700 bg-slate-900/60 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="text-sm font-semibold font-mono mb-1">{opt.score}</div>
                  <div className="text-[11px] leading-tight">{opt.label}</div>
                </button>
              );
            })}
          </div>
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
            {ENNEAGRAM_QUESTIONS.map((q, idx) => {
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
            onClick={() => setCurrentIdx(Math.min(ENNEAGRAM_QUESTIONS.length - 1, currentIdx + 1))}
            disabled={currentIdx === ENNEAGRAM_QUESTIONS.length - 1}
            className="px-3 py-1.5 text-xs text-slate-400 hover:text-white disabled:opacity-40"
          >
            Sonraki Soru
          </button>
        </div>
      </div>

      {/* Live Calculated Results Section */}
      <div className="bg-[#12161c] border border-slate-800 rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-slate-100">Hesaplanan Enneagram Profili</h3>
          </div>
          <span className="text-xs font-mono text-amber-400">
            {currentResult.wingName}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-900/70 border border-slate-800 rounded space-y-1">
            <span className="text-[11px] text-slate-500">Ana Tip & Motivasyon</span>
            <div className="text-sm font-semibold text-amber-400">Tip {currentResult.coreType}</div>
            <p className="text-xs text-slate-300 leading-relaxed pt-1">{currentResult.coreMotivation}</p>
          </div>

          <div className="p-4 bg-slate-900/70 border border-slate-800 rounded space-y-1">
            <span className="text-[11px] text-slate-500">Temel Korku & Gölge</span>
            <div className="text-sm font-semibold text-rose-400">Savunma Hattı</div>
            <p className="text-xs text-slate-300 leading-relaxed pt-1">{currentResult.coreFear}</p>
          </div>

          <div className="p-4 bg-slate-900/70 border border-slate-800 rounded space-y-1">
            <span className="text-[11px] text-slate-500">Gelişim & Stres Hatları</span>
            <div className="text-sm font-semibold text-emerald-400">
              Gelişim: Tip {currentResult.growthDirection} · Stres: Tip {currentResult.stressDirection}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pt-1">
              {currentResult.strengths[0]} gücü ile {currentResult.shadowTraits[0]} farkındalığı.
            </p>
          </div>
        </div>

        {/* 1-9 Scores Bars */}
        <div>
          <span className="block text-xs font-medium text-slate-400 mb-3">Tüm Tiplerin Skor Dağılımı (1-9)</span>
          <div className="grid grid-cols-3 sm:grid-cols-9 gap-2 text-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(t => {
              const sc = currentResult.typeScores[t] || 0;
              const isCore = t === currentResult.coreType;
              const isWing = currentResult.wing.endsWith(`w${t}`);
              return (
                <div key={t} className={`p-2 rounded border ${
                  isCore
                    ? 'border-amber-400 bg-amber-500/10'
                    : isWing
                    ? 'border-emerald-500/40 bg-emerald-950/20'
                    : 'border-slate-800 bg-slate-900'
                }`}>
                  <span className="block text-xs text-slate-400 font-mono">
                    Tip {t} {isCore ? '★' : isWing ? '♦' : ''}
                  </span>
                  <span className={`block text-sm font-bold font-mono mt-0.5 ${
                    isCore ? 'text-amber-400' : isWing ? 'text-emerald-300' : 'text-slate-200'
                  }`}>
                    {sc}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tie-Break Audit Alerts if applicable */}
        {currentResult.tieBreakAudit && (
          <div className="p-3 bg-amber-950/40 border border-amber-900/60 rounded-lg text-xs text-amber-300 space-y-1">
            <div className="font-semibold flex items-center gap-1.5">
              <span>Denetimli Ana Tip Eşitlik (Tie-Break) Çözümü:</span>
              <span className="font-mono text-[11px] bg-amber-900/40 px-1.5 py-0.5 rounded">
                {currentResult.tieBreakAudit.method}
              </span>
            </div>
            <p className="text-[11px] text-amber-200/90 leading-relaxed">
              {currentResult.tieBreakAudit.reason}
            </p>
          </div>
        )}

        {currentResult.wingTieBreakAudit && (
          <div className="p-3 bg-emerald-950/40 border border-emerald-900/60 rounded-lg text-xs text-emerald-300 space-y-1">
            <div className="font-semibold flex items-center gap-1.5">
              <span>Denetimli Kanat Eşitliği (Wing Tie-Break) Çözümü:</span>
            </div>
            <p className="text-[11px] text-emerald-200/90 leading-relaxed">
              {currentResult.wingTieBreakAudit.reason}
            </p>
          </div>
        )}

        {/* 9 Types Ranking & Dimension Breakdown Table */}
        {currentResult.ranking && currentResult.ranking.length > 0 && (
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">Tiplerin Puan Sıralaması & Alt Boyut Dağılımı:</span>
              <span className="text-[11px] text-slate-500 font-mono">27 Soru Ağırlıkları</span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-lg overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-2 px-3">Sıra</th>
                    <th className="py-2 px-3">Tip & Arketip</th>
                    <th className="py-2 px-3">Toplam</th>
                    <th className="py-2 px-3">Motivasyon</th>
                    <th className="py-2 px-3">Stres</th>
                    <th className="py-2 px-3">Gölge</th>
                    <th className="py-2 px-3">Yüzde</th>
                    <th className="py-2 px-3">Rol</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {currentResult.ranking.map(item => (
                    <tr key={item.type} className={
                      item.type === currentResult.coreType
                        ? 'bg-amber-950/20 font-medium text-amber-300'
                        : currentResult.wing.endsWith(`w${item.type}`)
                        ? 'bg-emerald-950/20 text-emerald-300'
                        : ''
                    }>
                      <td className="py-2 px-3 font-mono text-[11px]">{item.rank}</td>
                      <td className="py-2 px-3">Tip {item.type} - {item.typeName.split('&')[0]}</td>
                      <td className="py-2 px-3 font-mono font-bold">{item.score}</td>
                      <td className="py-2 px-3 font-mono text-slate-400">{item.dimensionScores.motivation}/5</td>
                      <td className="py-2 px-3 font-mono text-slate-400">{item.dimensionScores.stress}/5</td>
                      <td className="py-2 px-3 font-mono text-slate-400">{item.dimensionScores.shadow}/5</td>
                      <td className="py-2 px-3 font-mono">%{item.percentage}</td>
                      <td className="py-2 px-3 text-[11px] opacity-90">{item.matchRationale.split('-')[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Clinical Disclaimer and Methodology Limitations Card */}
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
            <span className="text-amber-400">Yöntem & Metodolojik Sınırlılıklar:</span>
            <span className="text-slate-400 font-normal">Riso-Hudson Enneagram Modeli</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            {currentResult.disclaimer}
          </p>
          <p className="text-slate-500 text-[11px] italic">
            {currentResult.methodLimitations}
          </p>
        </div>

        {/* Navigation Action */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-medium text-xs rounded transition-colors"
          >
            <span>Totem Testine Geç</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
