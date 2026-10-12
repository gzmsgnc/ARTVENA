import React, { useState, useEffect } from 'react';
import { runFullRegressionSuite, TestResultItem } from '../../services/testSuiteService';
import { runCompleteIndependentAudit, ModuleAuditReport } from '../../services/independentVerificationService';
import { runTotemVerificationSuite, TotemScenarioResult } from '../../services/totemVerificationSuite';
import { runEnneagramVerificationSuite, EnneagramScenarioResult } from '../../services/enneagramVerificationSuite';
import { runAstrologyVerificationSuite, AstrologyScenarioResult } from '../../services/astrologyVerificationSuite';
import { runEbcedVerificationSuite, EbcedScenarioResult } from '../../services/ebcedVerificationSuite';
import { runNumerologyVerificationSuite, NumerologyScenarioResult } from '../../services/numerologyVerificationSuite';
import { runChakraVerificationSuite, ChakraScenarioResult } from '../../services/chakraVerificationSuite';
import { runRecipeConsistencySuite, RecipeConsistencyResult } from '../../services/recipeConsistencySuite';
import { runStyleSymbolConsistencySuite, StyleSymbolConsistencyResult } from '../../services/styleSymbolConsistencySuite';
import { runComprehensiveRegressionSuite, ComprehensiveTestItem, ComprehensiveSuiteSummary } from '../../services/comprehensiveRegressionSuite';
import { ShieldCheck, Play, CheckCircle2, XCircle, AlertTriangle, Layers, BookOpen, Compass, Target, Sun, Hash, Calculator, Activity, Sparkles, Palette, CheckCheck } from 'lucide-react';

export const ValidationCenterView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'comprehensive_regression' | 'style_symbol_audit' | 'recipe_consistency' | 'chakra_audit' | 'numerology_audit' | 'ebced_audit' | 'astro_audit' | 'enneagram_audit' | 'totem_audit' | 'audit' | 'regression'>('comprehensive_regression');
  const [comprehensiveTests, setComprehensiveTests] = useState<ComprehensiveTestItem[]>([]);
  const [comprehensiveSummary, setComprehensiveSummary] = useState<ComprehensiveSuiteSummary | null>(null);
  const [regressionTests, setRegressionTests] = useState<TestResultItem[]>([]);
  const [auditReports, setAuditReports] = useState<ModuleAuditReport[]>([]);
  const [totemScenarios, setTotemScenarios] = useState<TotemScenarioResult[]>([]);
  const [enneagramScenarios, setEnneagramScenarios] = useState<EnneagramScenarioResult[]>([]);
  const [astrologyScenarios, setAstrologyScenarios] = useState<AstrologyScenarioResult[]>([]);
  const [ebcedScenarios, setEbcedScenarios] = useState<EbcedScenarioResult[]>([]);
  const [numerologyScenarios, setNumerologyScenarios] = useState<NumerologyScenarioResult[]>([]);
  const [chakraScenarios, setChakraScenarios] = useState<ChakraScenarioResult[]>([]);
  const [recipeScenarios, setRecipeScenarios] = useState<RecipeConsistencyResult[]>([]);
  const [styleSymbolScenarios, setStyleSymbolScenarios] = useState<StyleSymbolConsistencyResult[]>([]);
  const [running, setRunning] = useState(false);

  const executeAll = () => {
    setRunning(true);
    setTimeout(() => {
      const comp = runComprehensiveRegressionSuite();
      const reg = runFullRegressionSuite();
      const aud = runCompleteIndependentAudit();
      const tot = runTotemVerificationSuite();
      const enn = runEnneagramVerificationSuite();
      const ast = runAstrologyVerificationSuite();
      const ebc = runEbcedVerificationSuite();
      const num = runNumerologyVerificationSuite();
      const chk = runChakraVerificationSuite();
      const rec = runRecipeConsistencySuite();
      const sty = runStyleSymbolConsistencySuite();
      setComprehensiveTests(comp.tests);
      setComprehensiveSummary(comp.summary);
      setRegressionTests(reg);
      setAuditReports(aud.reports);
      setTotemScenarios(tot);
      setEnneagramScenarios(enn);
      setAstrologyScenarios(ast);
      setEbcedScenarios(ebc);
      setNumerologyScenarios(num);
      setChakraScenarios(chk);
      setRecipeScenarios(rec);
      setStyleSymbolScenarios(sty);
      setRunning(false);
    }, 150);
  };

  useEffect(() => {
    executeAll();
  }, []);

  const totalReg = regressionTests.length;
  const passedReg = regressionTests.filter(t => t.passed).length;

  let totalAuditChecks = 0;
  let passedAuditChecks = 0;
  for (const r of auditReports) {
    totalAuditChecks += r.totalChecks;
    passedAuditChecks += r.passedChecks;
  }

  const totalTotem = totemScenarios.length;
  const passedTotem = totemScenarios.filter(t => t.passed).length;

  const totalEnneagram = enneagramScenarios.length;
  const passedEnneagram = enneagramScenarios.filter(t => t.passed).length;

  const totalAstrology = astrologyScenarios.length;
  const passedAstrology = astrologyScenarios.filter(t => t.passed).length;

  const totalEbced = ebcedScenarios.length;
  const passedEbced = ebcedScenarios.filter(t => t.passed).length;

  const totalNumerology = numerologyScenarios.length;
  const passedNumerology = numerologyScenarios.filter(t => t.passed).length;

  const totalChakra = chakraScenarios.length;
  const passedChakra = chakraScenarios.filter(t => t.passed).length;

  const totalRecipe = recipeScenarios.length;
  const passedRecipe = recipeScenarios.filter(t => t.passed).length;

  const totalStyleSymbol = styleSymbolScenarios.length;
  const passedStyleSymbol = styleSymbolScenarios.filter(t => t.passed).length;

  const totalComprehensive = comprehensiveTests.length;
  const passedComprehensive = comprehensiveTests.filter(t => t.passed).length;

  const allPassed =
    (totalComprehensive > 0 && passedComprehensive === totalComprehensive) &&
    (totalReg > 0 && passedReg === totalReg) &&
    (totalAuditChecks > 0 && passedAuditChecks === totalAuditChecks) &&
    (totalTotem > 0 && passedTotem === totalTotem) &&
    (totalEnneagram > 0 && passedEnneagram === totalEnneagram) &&
    (totalAstrology > 0 && passedAstrology === totalAstrology) &&
    (totalEbced > 0 && passedEbced === totalEbced) &&
    (totalNumerology > 0 && passedNumerology === totalNumerology) &&
    (totalChakra > 0 && passedChakra === totalChakra) &&
    (totalRecipe > 0 && passedRecipe === totalRecipe) &&
    (totalStyleSymbol > 0 && passedStyleSymbol === totalStyleSymbol);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-100">Test & Bağımsız Doğrulama Merkezi</h2>
          <p className="text-xs text-slate-400">
            İstem 1 - 10 Standartları · Otomatik Regresyon & Test Altyapısı · 7 Hesaplama Motoru · Sıfır Hata Toleransı
          </p>
        </div>

        <button
          onClick={executeAll}
          disabled={running}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-medium text-xs rounded transition-colors self-start sm:self-auto"
        >
          <Play className="w-3.5 h-3.5" />
          <span>{running ? 'Doğrulanıyor...' : 'Tüm Doğrulamaları Çalıştır'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('comprehensive_regression')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded transition-colors whitespace-nowrap ${
            activeTab === 'comprehensive_regression'
              ? 'bg-amber-400 text-slate-950 font-semibold'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
          }`}
        >
          <CheckCheck className="w-3.5 h-3.5" />
          <span>Otomatik Regresyon İstem 10 ({passedComprehensive}/{totalComprehensive})</span>
        </button>

        <button
          onClick={() => setActiveTab('style_symbol_audit')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded transition-colors whitespace-nowrap ${
            activeTab === 'style_symbol_audit'
              ? 'bg-amber-400 text-slate-950 font-semibold'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Stil & Sembol İstem 9 ({passedStyleSymbol}/{totalStyleSymbol})</span>
        </button>

        <button
          onClick={() => setActiveTab('recipe_consistency')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded transition-colors whitespace-nowrap ${
            activeTab === 'recipe_consistency'
              ? 'bg-amber-400 text-slate-950 font-semibold'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Reçete Tutarlılığı İstem 8 ({passedRecipe}/{totalRecipe})</span>
        </button>

        <button
          onClick={() => setActiveTab('chakra_audit')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded transition-colors whitespace-nowrap ${
            activeTab === 'chakra_audit'
              ? 'bg-amber-400 text-slate-950 font-semibold'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Çakra İstem 7 ({passedChakra}/{totalChakra})</span>
        </button>

        <button
          onClick={() => setActiveTab('numerology_audit')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded transition-colors whitespace-nowrap ${
            activeTab === 'numerology_audit'
              ? 'bg-amber-400 text-slate-950 font-semibold'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Numeroloji İstem 6 ({passedNumerology}/{totalNumerology})</span>
        </button>

        <button
          onClick={() => setActiveTab('ebced_audit')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded transition-colors whitespace-nowrap ${
            activeTab === 'ebced_audit'
              ? 'bg-amber-400 text-slate-950 font-semibold'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
          }`}
        >
          <Hash className="w-3.5 h-3.5" />
          <span>Ebced & Mizan İstem 5 ({passedEbced}/{totalEbced})</span>
        </button>

        <button
          onClick={() => setActiveTab('astro_audit')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded transition-colors whitespace-nowrap ${
            activeTab === 'astro_audit'
              ? 'bg-amber-400 text-slate-950 font-semibold'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
          }`}
        >
          <Sun className="w-3.5 h-3.5" />
          <span>Astroloji Denetimi ({passedAstrology}/{totalAstrology})</span>
        </button>

        <button
          onClick={() => setActiveTab('enneagram_audit')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded transition-colors whitespace-nowrap ${
            activeTab === 'enneagram_audit'
              ? 'bg-amber-400 text-slate-950 font-semibold'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          <span>Enneagram İstem 3 ({passedEnneagram}/{totalEnneagram})</span>
        </button>

        <button
          onClick={() => setActiveTab('totem_audit')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded transition-colors whitespace-nowrap ${
            activeTab === 'totem_audit'
              ? 'bg-amber-400 text-slate-950 font-semibold'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Totem İstem 2 ({passedTotem}/{totalTotem})</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded transition-colors whitespace-nowrap ${
            activeTab === 'audit'
              ? 'bg-amber-400 text-slate-950 font-semibold'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Bağımsız Motor Denetimi ({passedAuditChecks}/{totalAuditChecks})</span>
        </button>

        <button
          onClick={() => setActiveTab('regression')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded transition-colors whitespace-nowrap ${
            activeTab === 'regression'
              ? 'bg-amber-400 text-slate-950 font-semibold'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Regresyon Paketi ({passedReg}/{totalReg})</span>
        </button>
      </div>

      {/* Status Banner */}
      <div className={`p-4 rounded-lg border flex items-center justify-between ${
        allPassed
          ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
          : 'border-amber-500/40 bg-amber-950/20 text-amber-300'
      }`}>
        <div className="flex items-center gap-3">
          {allPassed ? (
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0" />
          )}
          <div>
            <div className="text-sm font-semibold">
              {allPassed ? 'Tüm İstem 1 - 10 Doğrulamaları ve Regresyon Paketleri Başarılı' : 'Doğrulama İnceleme Gerektiriyor'}
            </div>
            <div className="text-xs opacity-80 mt-0.5">
              İstem 10 Regresyon: {passedComprehensive}/{totalComprehensive} · Stil/Sembol: {passedStyleSymbol}/{totalStyleSymbol} · Reçete: {passedRecipe}/{totalRecipe} · Çakra: {passedChakra}/{totalChakra} · Numeroloji: {passedNumerology}/{totalNumerology} · Ebced/Mizan: {passedEbced}/{totalEbced} · Astroloji: {passedAstrology}/{totalAstrology} · Enneagram: {passedEnneagram}/{totalEnneagram} · Totem: {passedTotem}/{totalTotem} · Bağımsız: {passedAuditChecks}/{totalAuditChecks} · Regresyon: {passedReg}/{totalReg} geçti.
            </div>
          </div>
        </div>

        <span className="text-sm font-mono font-bold px-3 py-1 rounded bg-slate-900 border border-slate-800">
          %{totalComprehensive > 0 ? Math.round((passedComprehensive / totalComprehensive) * 100) : 100}
        </span>
      </div>

      {/* Tab: Kapsamlı Otomatik Regresyon İstem 10 Paketi */}
      {activeTab === 'comprehensive_regression' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg text-xs text-slate-300 space-y-2">
            <span className="font-semibold text-amber-400 block">İstem 10 Tüm Uygulama İçin Otomatik Test ve Regresyon Altyapısı Kapsamı:</span>
            <p className="text-slate-400 leading-relaxed">
              Bu altyapı, tüm hesaplama motorlarının (Numeroloji, Astroloji, Ebced/Mizan, Enneagram, Totem, Çakra, Reçete ve Stil)
              10 zorunlu senaryosunu (bağımsız referans sonuçları, geçerli/geçersiz girdiler, eksik alanlar/boş cevaplar, minimum/maksimum sınır değerleri,
              eşit puanlar ve deterministik tie-break kuralları, aynı girdinin 50 döngü tekrarlanması, art arda iki farklı danışan oturum izolasyonu,
              modüllerin birleşik reçeteye tek doğrulanmış kaynaktan veri aktarımı, dışa aktarılan JSON dosyasının ekrandaki verilerle bit düzeyinde eşleşmesi ve
              önceki düzeltmelerin yeniden hata üretmemesi) bağımsız altın standartlarla otomatik olarak doğrular.
            </p>
            {comprehensiveSummary && (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-slate-800/80">
                {comprehensiveSummary.moduleBreakdowns.map(mb => (
                  <div key={mb.module} className="p-2 bg-slate-950/60 rounded border border-slate-800 text-[11px]">
                    <span className="text-slate-400 block font-medium truncate">{mb.module}</span>
                    <span className={`font-mono font-bold ${mb.status === 'TAM_UYUMLU' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {mb.passed}/{mb.total} ({mb.status})
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-[#12161c] border border-slate-800 rounded-lg overflow-hidden divide-y divide-slate-800/80">
            {comprehensiveTests.map(test => (
              <div key={test.id} className="p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs">
                <div className="flex items-start gap-3">
                  {test.passed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-slate-100">{test.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-amber-300 border border-slate-800 font-mono">
                        {test.module}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 font-mono">
                        {test.scenarioType}
                      </span>
                      {test.seed && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-purple-400 border border-slate-800 font-mono">
                          Seed: {test.seed}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-[11px] text-slate-400 pt-0.5">
                      <div>
                        <span className="text-slate-500">Beklenen: </span>
                        <span className="text-slate-200">{test.expected}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Gerçekleşen: </span>
                        <span className="text-amber-300 font-mono">{test.actual}</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{test.message}</p>
                  </div>
                </div>

                <div className="sm:self-center shrink-0 flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-500">{test.durationMs}ms</span>
                  <span
                    className={`px-2.5 py-1 text-[10px] font-bold rounded ${
                      test.passed
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {test.passed ? 'DOĞRULANDI' : 'HATA'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Stil & Sembol İstem 9 Denetim Paketi */}
      {activeTab === 'style_symbol_audit' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg text-xs text-slate-300 space-y-1">
            <span className="font-semibold text-amber-400 block">İstem 9 Sembol ve Totem Seçimlerini Tasarım Stiliyle Tutarlı Hale Getirme Denetim Kapsamı:</span>
            <p className="text-slate-400">
              Bu paket; sembol kütüphanesi ve totem hayvan varlıklarının benzersiz ID, kategori, anlam, görsel nitelik ve stil uyumu verilerini eksiksiz doğrulamasını,
              seçilen dövme tarzının (Fine Line, Micro Realism, Sacred Geometry, Dotwork vb.) bağımsız çıkartma efekti olmadan bütün kompozisyona organik uygulanmasını (Anti-Sticker Disiplini),
              hayvan figürünün tasarıma dahil edilip edilmeyeceğinin açıkça saklanmasını ve figür kapatıldığında pozitif istemlerden mutlak çıkarılarak yalnızca soyut geometri/çizgi denklerinin kullanılmasını,
              hariç tutulan sembollerin Midjourney, Niji, DALL-E, Stencil ve General AI istemlerine asla sızmamasını,
              kullanıcının seçtiği sembollerin anlamı, kimliği ve rolünün reçetede korunmasını,
              ve negatif alan, anti-blowout, iğne kısıtlamaları gibi teknik dövme parametrelerinin kişisel reçeteden ayrı teknik şartname katmanında tutulmasını altın standartlarla denetler.
            </p>
          </div>

          <div className="bg-[#12161c] border border-slate-800 rounded-lg overflow-hidden divide-y divide-slate-800/80">
            {styleSymbolScenarios.map(scen => (
              <div key={scen.id} className="p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs">
                <div className="flex items-start gap-3">
                  {scen.passed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-100">{scen.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 font-mono">
                        {scen.category}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 pt-0.5">
                      <span className="text-slate-200">{scen.message}</span>
                    </div>
                  </div>
                </div>

                <div className="sm:self-center shrink-0">
                  <span
                    className={`px-2.5 py-1 text-[10px] font-bold rounded ${
                      scen.passed
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {scen.passed ? 'DOĞRULANDI' : 'BAŞARISIZ'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Reçete Tutarlılığı İstem 8 Denetim Paketi */}
      {activeTab === 'recipe_consistency' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg text-xs text-slate-300 space-y-1">
            <span className="font-semibold text-amber-400 block">İstem 8 Kişisel Sembol Reçetesinde Veri Tutarlılığı Denetim Kapsamı:</span>
            <p className="text-slate-400">
              Bu paket; numeroloji, astroloji, Ebced, Mizan, çakra, Enneagram ve totem sonuçlarının tek bir doğrulanmış kaynaktan reçeteye aktarılmasını,
              yeniden veya farklı kurallarla hesaplama yapılmamasını, birincil totem, gölge totem ve ikincil totem kademelerinin mutlak ayrımını,
              Enneagram temel mizaç tipi ile kanat ayrımını, eksik/belirsiz doğum saati durumunda kesinlik uydurmak yerine belirsizliğin dürüstçe bildirilmesini,
              seçilen ve hariç tutulan sembollerin ayrı veri alanlarında tutulmasını ve sıfır kesişimini, hariç tutulan sembollerin Midjourney/Niji/DALL-E istemlerine sıfır sızıntısını,
              anne adının Ebced hesabı haricinde reçete ve tasarım istemlerine asla sızdırılmamasını, teknik dövme şartnamesi ile kişisel manevi anlatı katman ayrımını,
              özet rapor, dışa aktarılan JSON ve istemlerin tam eşleşmesini ve 50 tekrarlı bit düzeyinde determinizmi bağımsız altın standartlarla test eder.
            </p>
          </div>

          <div className="bg-[#12161c] border border-slate-800 rounded-lg overflow-hidden divide-y divide-slate-800/80">
            {recipeScenarios.map(scen => (
              <div key={scen.id} className="p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs">
                <div className="flex items-start gap-3">
                  {scen.passed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-100">{scen.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 font-mono">
                        {scen.category}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-[11px] text-slate-400 pt-0.5">
                      <div>
                        <span className="text-slate-500">Beklenen: </span>
                        <span className="text-slate-200">{scen.expected}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Gerçekleşen: </span>
                        <span className="text-amber-300 font-mono">{scen.actual}</span>
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-400/90 bg-slate-950/40 p-2 rounded border border-slate-800/60 font-mono mt-1">
                      {scen.auditDetails}
                    </div>
                  </div>
                </div>

                <div className="sm:self-center shrink-0">
                  <span
                    className={`px-2.5 py-1 text-[10px] font-bold rounded ${
                      scen.passed
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {scen.passed ? 'DOĞRULANDI' : 'BAŞARISIZ'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Çakra İstem 7 Denetim Paketi */}
      {activeTab === 'chakra_audit' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg text-xs text-slate-300 space-y-1">
            <span className="font-semibold text-amber-400 block">İstem 7 Çakra Puanlama ve Yorum Ayrımı Denetim Kapsamı:</span>
            <p className="text-slate-400">
              Bu paket; 21 kalibre edilmiş sorunun 7 çakraya 3'er soru olarak eksiksiz dağılımını, 7 ters puanlanan gölge sorunun (6 - Değer) polarite dönüşümünü,
              kesin eşik sınırlarını (&lt;%45 Destek Gerekiyor, %45-%75 Dengeli, &gt;%75 Aktif), tam sayı sınır puanlarını (6, 7, 11, 12 puan),
              boş/sıfır yanıtta tanımlı nötr durumu (9p / %60 Dengeli), kısmi yanıt normalleştirmesini, eşitlik durumunda Tantrik alt merkez (Muladhara Seviye 1) zemin önceliğini,
              tek tip yanıtlarda (tümü 1, 3 veya 5) çökmeden desen tespiti yapılmasını, sayısal puanlama katmanının saf matematik kalıp sembolik/flora üretmemesini,
              sembolik yorumların hesaplanan durumlarla asla çelişmemesini, tıbbi/klinik tanı iddiası taşımayan açık şerhi ve 50 tekrarlı tam determinizmi bağımsız altın standartlarla test eder.
            </p>
          </div>

          <div className="bg-[#12161c] border border-slate-800 rounded-lg overflow-hidden divide-y divide-slate-800/80">
            {chakraScenarios.map(scen => (
              <div key={scen.id} className="p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs">
                <div className="flex items-start gap-3">
                  {scen.passed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-100">{scen.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 font-mono">
                        {scen.category}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-[11px] text-slate-400 pt-0.5">
                      <div>
                        <span className="text-slate-500">Beklenen: </span>
                        <span className="text-slate-200">{scen.expected}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Gerçekleşen: </span>
                        <span className="text-amber-300 font-mono">{scen.actual}</span>
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-400/90 bg-slate-950/40 p-2 rounded border border-slate-800/60 font-mono mt-1">
                      {scen.auditDetails}
                    </div>
                  </div>
                </div>

                <div className="sm:self-center shrink-0">
                  <span
                    className={`px-2.5 py-1 text-[10px] font-bold rounded ${
                      scen.passed
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {scen.passed ? 'DOĞRULANDI' : 'BAŞARISIZ'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Numeroloji İstem 6 Denetim Paketi */}
      {activeTab === 'numerology_audit' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg text-xs text-slate-300 space-y-1">
            <span className="font-semibold text-amber-400 block">İstem 6 Numeroloji Bağımsız Denetim Kapsamı:</span>
            <p className="text-slate-400">
              Bu paket; Batı Pitagorik Harf Matrisini (29 Türkçe harf eşleşmesi), Dönem Döngüleri (Period Cycles) indirgemesini,
              Usta Sayıların (11, 22, 33) tek basamağa indirgenmeden korunmasını, Düz Toplam (Straight Sum) ile yöntem karşılaştırmasını,
              İfade (tüm harfler), Ruh Arzusu (sesliler) ve Kişilik (sessizler) sayılarını, Matematiksel Değişmezliği (İfade = Ruh Arzusu + Kişilik ham toplamı),
              Türkçe büyük/küçük harf normalizasyonunu (I/İ/Ç/Ğ/Ş/Ö/Ü), Olgunluk Sayısı sentezini, Doğum Günü (1-31) ve Tutum (Gün+Ay) sayılarını,
              Milenyum sıfırlı ve yıl sonu sınır durumlarını, hesaplama borularının mutlak izolasyonunu (isim ve tarih bağımsızlığı),
              boş/geçersiz girdi güvenliğini ve 50 tekrarlı tam determinizmi bağımsız altın standartlarla test eder.
            </p>
          </div>

          <div className="bg-[#12161c] border border-slate-800 rounded-lg overflow-hidden divide-y divide-slate-800/80">
            {numerologyScenarios.map(scen => (
              <div key={scen.id} className="p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs">
                <div className="flex items-start gap-3">
                  {scen.passed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-100">{scen.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 font-mono">
                        {scen.category}
                      </span>
                    </div>
                    <p className="text-slate-300">{scen.description}</p>
                    <div className="flex flex-wrap gap-4 text-[11px] text-slate-400 pt-0.5">
                      <div>
                        <span className="text-slate-500">Beklenen: </span>
                        <span className="text-emerald-400 font-mono">
                          {typeof scen.expected === 'object' ? JSON.stringify(scen.expected) : String(scen.expected)}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">Gözlemlenen: </span>
                        <span className="text-amber-300 font-mono">
                          {typeof scen.actual === 'object' ? JSON.stringify(scen.actual) : String(scen.actual)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 p-2 bg-slate-950/80 rounded border border-slate-900 font-mono text-[11px] text-slate-400 overflow-x-auto max-h-40">
                      {JSON.stringify(scen.auditDetail, null, 2)}
                    </div>
                  </div>
                </div>

                <span className={`text-[10px] font-mono px-2 py-0.5 rounded shrink-0 self-start ${
                  scen.passed ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' : 'bg-rose-950 text-rose-400 border border-rose-900'
                }`}>
                  {scen.passed ? 'DOĞRULANDI' : 'HATA'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Ebced & Mizan İstem 5 Denetim Paketi */}
      {activeTab === 'ebced_audit' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg text-xs text-slate-300 space-y-1">
            <span className="font-semibold text-amber-400 block">İstem 5 Ebced & Mizan Denetim Kapsamı:</span>
            <p className="text-slate-400">
              Bu paket; Ebced-i Kebir (Cemel-i Kebir) klasik 28 harfli matrisi, Farsça/Osmanlıca ekleri (Pe:2, Çim:3, Je:7, Gef:20),
              Türkçe fonetik ve birleşik isim normalizasyonunu ("Ali Can", "Ömer-Faruk"), danışan ve anne adının bağımsız sayısal hesabını,
              anne adının asla metin olarak veri nesnesine veya dövme promptlarına sızdırılmamasını (gizlilik garantisi),
              boş girdilerde tanımlı audit trail üretimini ve dört unsur mizan dengesini (Ateş, Hava, Su, Toprak) bağımsız olarak test eder.
            </p>
          </div>

          <div className="bg-[#12161c] border border-slate-800 rounded-lg overflow-hidden divide-y divide-slate-800/80">
            {ebcedScenarios.map(scen => (
              <div key={scen.id} className="p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs">
                <div className="flex items-start gap-3">
                  {scen.passed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <div className="font-semibold text-slate-100">{scen.name}</div>
                    <p className="text-slate-300">{scen.message}</p>
                    <div className="p-2 bg-slate-950/80 rounded border border-slate-900 font-mono text-[11px] text-slate-400 overflow-x-auto">
                      {JSON.stringify(scen.auditDetails, null, 2)}
                    </div>
                  </div>
                </div>

                <span className={`text-[10px] font-mono px-2 py-0.5 rounded shrink-0 self-start ${
                  scen.passed ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' : 'bg-rose-950 text-rose-400 border border-rose-900'
                }`}>
                  {scen.passed ? 'DOĞRULANDI' : 'HATA'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Astroloji Denetim Paketi */}
      {activeTab === 'astro_audit' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg text-xs text-slate-300 space-y-1">
            <span className="font-semibold text-amber-400 block">Astronomik Efemeris & Zodyak / Ev Denetim Kapsamı:</span>
            <p className="text-slate-400">
              Bu paket; Astronomy-Engine VSOP87/ELP2000-82B ve Jean Meeus standartları ile 10 gök cisminin (Güneş, Ay, Merkür, Venüs, Mars, Jüpiter, Satürn, Uranüs, Neptün, Plüton)
              NASA JPL Horizons altın referansıyla karşılaştırmalı efemeris boylamlarını, Türkiye'nin tarihsel saat dilimi mevzuatlarını (2015 Yaz Saati UTC+3 vs 2020 Kalıcı UTC+3),
              81 il ve dünya başkentleri geocoding koordinatlarını, Van/Ordu/Aydın gibi adaş yerleşimlerin ve "Bor" gibi kısmi eşleşmelerin ayrımını, artık yılları (29 Şubat),
              gece yarısı (00:00) geçişlerini, J2000.0 altın standart referansını, doğum saati girilmediğinde Yükselen ve 12 ev için kesinlik uydurmayıp sahte verileri engelleme kuralını (Düzeltme 2),
              geçersiz doğum tarihlerinin reddini (Düzeltme 3), ve doğum saati yokluğunda sahte evlerin engellenmesini bağımsız olarak test eder.
            </p>
          </div>

          <div className="bg-[#12161c] border border-slate-800 rounded-lg overflow-hidden divide-y divide-slate-800/80">
            {astrologyScenarios.map(scen => (
              <div key={scen.id} className="p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs">
                <div className="flex items-start gap-3">
                  {scen.passed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <div className="font-semibold text-slate-100">{scen.name}</div>
                    <p className="text-slate-300">{scen.message}</p>
                    <div className="p-2 bg-slate-950/80 rounded border border-slate-900 font-mono text-[11px] text-slate-400 overflow-x-auto">
                      {JSON.stringify(scen.auditDetails, null, 2)}
                    </div>
                  </div>
                </div>

                <span className={`text-[10px] font-mono px-2 py-0.5 rounded shrink-0 self-start ${
                  scen.passed ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' : 'bg-rose-950 text-rose-400 border border-rose-900'
                }`}>
                  {scen.passed ? 'DOĞRULANDI' : 'HATA'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 0: Enneagram İstem 3 Denetim Paketi */}
      {activeTab === 'enneagram_audit' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg text-xs text-slate-300 space-y-1">
            <span className="font-semibold text-amber-400 block">İstem 3 Denetim Kapsamı:</span>
            <p className="text-slate-400">
              Bu paket; 27 sorunun 9 tipe ve 3 boyuta (Motivasyon, Stres, Gölge) tam dengeli eşleşmesini,
              farklı danışan profillerinin ayrımını, tekrarlı tam determinizmi, boş/geçersiz girdilerde tanımlı arıtmayı,
              eşit puan durumunda Temel Motivasyon boyut tie-break çözümünü, ana tip ile kanat ayrımını ve klinik tanı olmadığına dair net beyanı bağımsız olarak denetler.
            </p>
          </div>

          <div className="bg-[#12161c] border border-slate-800 rounded-lg overflow-hidden divide-y divide-slate-800/80">
            {enneagramScenarios.map(scen => (
              <div key={scen.id} className="p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs">
                <div className="flex items-start gap-3">
                  {scen.passed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <div className="font-semibold text-slate-100">{scen.name}</div>
                    <p className="text-slate-300">{scen.message}</p>
                    <div className="p-2 bg-slate-950/80 rounded border border-slate-900 font-mono text-[11px] text-slate-400 overflow-x-auto">
                      {JSON.stringify(scen.auditDetails, null, 2)}
                    </div>
                  </div>
                </div>

                <span className={`text-[10px] font-mono px-2 py-0.5 rounded shrink-0 self-start ${
                  scen.passed ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' : 'bg-rose-950 text-rose-400 border border-rose-900'
                }`}>
                  {scen.passed ? 'DOĞRULANDI' : 'HATA'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 1: Totem İstem 2 Denetim Paketi */}
      {activeTab === 'totem_audit' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg text-xs text-slate-300 space-y-1">
            <span className="font-semibold text-amber-400 block">İstem 2 Denetim Kapsamı:</span>
            <p className="text-slate-400">
              Bu paket; iki farklı danışanın birbirinden bağımsız sonuç üretmesini, aynı girdilerle %100 tekrarlanabilirliği,
              boş ve geçersiz girdilerde tanımlı davranış kontrolünü, eşitlik (tie-break) çözüm kaydını,
              oturumlar arası bellek izolasyonunu ve kanonik ID ile alt dize (substring) çakışma önlemini doğrudan test eder.
            </p>
          </div>

          <div className="bg-[#12161c] border border-slate-800 rounded-lg overflow-hidden divide-y divide-slate-800/80">
            {totemScenarios.map(scen => (
              <div key={scen.id} className="p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs">
                <div className="flex items-start gap-3">
                  {scen.passed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <div className="font-semibold text-slate-100">{scen.name}</div>
                    <p className="text-slate-300">{scen.message}</p>
                    <div className="p-2 bg-slate-950/80 rounded border border-slate-900 font-mono text-[11px] text-slate-400 overflow-x-auto">
                      {JSON.stringify(scen.auditDetails, null, 2)}
                    </div>
                  </div>
                </div>

                <span className={`text-[10px] font-mono px-2 py-0.5 rounded shrink-0 self-start ${
                  scen.passed ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' : 'bg-rose-950 text-rose-400 border border-rose-900'
                }`}>
                  {scen.passed ? 'DOĞRULANDI' : 'HATA'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Bağımsız Motor Denetimi */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          {auditReports.map(report => (
            <div key={report.moduleName} className="bg-[#12161c] border border-slate-800 rounded-lg p-5 space-y-4">
              <div className="flex items-start justify-between border-b border-slate-800/80 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-slate-100">{report.moduleName}</h3>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      report.verificationPassed
                        ? 'bg-emerald-950/80 border border-emerald-900 text-emerald-300'
                        : 'bg-rose-950/80 border border-rose-900 text-rose-300'
                    }`}>
                      {report.passedChecks}/{report.totalChecks} Doğrulandı
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Yöntem: {report.methodology}</p>
                </div>
              </div>

              {/* Module Metadata details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-900/50 p-3 rounded border border-slate-800/80">
                <div>
                  <span className="text-slate-500 block mb-0.5">Girdi Doğrulama & Normalizasyon:</span>
                  <span className="text-slate-300">{report.inputNormalization}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Sınır Değerleri & İstisnalar:</span>
                  <span className="text-slate-300">{report.edgeCasesHandled}</span>
                </div>
                <div className="md:col-span-2 pt-1 border-t border-slate-800">
                  <span className="text-slate-500 block mb-0.5">Yöntem Varsayımı & Kapsamı:</span>
                  <span className="text-slate-400">{report.knownLimitations}</span>
                </div>
              </div>

              {/* Verification Cases */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-400 block">Bağımsız Referans Testleri:</span>
                <div className="divide-y divide-slate-800/60 border border-slate-800/80 rounded bg-slate-950/60 overflow-hidden">
                  {report.cases.map(c => (
                    <div key={c.id} className="p-3 flex items-start justify-between gap-3 text-xs">
                      <div className="flex items-start gap-2.5">
                        {c.passed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <div className="font-medium text-slate-200">{c.testName}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">{c.methodDescription}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">Not: {c.notes}</div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          c.passed ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
                        }`}>
                          {c.passed ? 'DOĞRULANDI' : 'HATA'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Regresyon Paketi */}
      {activeTab === 'regression' && (
        <div className="bg-[#12161c] border border-slate-800 rounded-lg overflow-hidden divide-y divide-slate-800/80">
          {regressionTests.map(test => (
            <div key={test.id} className="p-4 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                {test.passed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="text-xs font-semibold text-slate-100 flex items-center gap-2">
                    <span>{test.name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800 text-slate-400">
                      {test.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{test.message}</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[11px] font-mono text-slate-500">{test.durationMs}ms</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
