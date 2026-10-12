/**
 * DÖVME TASARIM ASİSTANI V2
 * Main Application Orchestrator & State Container
 */

import React, { useState, useEffect } from 'react';
import {
  ClientData,
  CompleteClientRecord,
  CanonicalDesignObject,
  NumerologyResult,
  AstrologyResult,
  EbcedResult,
  ChakraResult,
  UnifiedArchetypeResult,
  EnneagramAnswer,
  EnneagramResult,
  TotemAnswer,
  TotemResult,
  PersonalTattooRecipe,
  TechnicalTattooRecipe,
  GeneratedPrompts,
  SymbolItem
} from './types';

// Engines
import { calculateNumerology } from './engines/numerologyEngine';
import { calculateAstrology } from './engines/astrologyEngine';
import { calculateEbced } from './engines/ebcedEngine';
import { calculateChakra } from './engines/chakraEngine';
import { calculateUnifiedArchetype } from './engines/archetypeEngine';
import { calculateEnneagram } from './engines/enneagramEngine';
import { calculateTotem } from './engines/totemEngine';
import { getRecommendedSymbols } from './engines/symbolEngine';
import { generatePersonalRecipe, generateTechnicalRecipe } from './engines/recipeEngine';
import { generateAllPrompts } from './engines/promptEngine';

// Data & Services
import { MASTER_SYMBOLS } from './data/symbolsData';
import { getAllClients, saveClientRecord, deleteClientRecord, getCustomSymbols } from './services/storageService';
import { isStudioAdminAuthenticated } from './services/authService';

// Components
import { TopBar } from './components/layout/TopBar';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { AdminLoginModal } from './components/auth/AdminLoginModal';
import { DashboardView } from './components/views/DashboardView';
import { ClientFormView } from './components/views/ClientFormView';
import { EnneagramTestView } from './components/views/EnneagramTestView';
import { TotemTestView } from './components/views/TotemTestView';
import { AnalysisOverviewView } from './components/views/AnalysisOverviewView';
import { SymbolSelectionView } from './components/views/SymbolSelectionView';
import { DesignPreferencesView } from './components/views/DesignPreferencesView';
import { RecipeView } from './components/views/RecipeView';
import { PromptGeneratorView } from './components/views/PromptGeneratorView';
import { ClientArchiveView } from './components/views/ClientArchiveView';
import { ValidationCenterView } from './components/views/ValidationCenterView';
import { ExportReportView } from './components/views/ExportReportView';
import { Sparkles, FolderOpen, PlusCircle } from 'lucide-react';

function NoClientFallback({
  title,
  onNewClient,
  onLoadShowcase,
  onGoToArchive
}: {
  title: string;
  onNewClient: () => void;
  onLoadShowcase: () => void;
  onGoToArchive: () => void;
}) {
  return (
    <div className="max-w-2xl mx-auto my-12 p-8 bg-[#12161c] border border-slate-800 rounded-xl text-center space-y-4">
      <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
        <Sparkles className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-100">{title} İçin Aktif Danışan Bulunamadı</h3>
      <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
        Bu bölümü görüntüleyebilmek için lütfen yeni bir danışan oluşturun, stüdyo örnek danışanını yükleyin veya arşivdeki bir dosyayı açın.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          onClick={onLoadShowcase}
          className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Örnek Danışanı Yükle (Defne Aksoy)</span>
        </button>
        <button
          onClick={onNewClient}
          className="flex items-center gap-1.5 px-4 py-2 border border-slate-700 hover:border-slate-600 bg-slate-800 text-slate-200 text-xs font-medium rounded transition-colors"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Yeni Danışan Başlat</span>
        </button>
        <button
          onClick={onGoToArchive}
          className="flex items-center gap-1.5 px-4 py-2 border border-slate-800 hover:border-slate-700 bg-slate-900 text-slate-400 hover:text-white text-xs font-medium rounded transition-colors"
        >
          <FolderOpen className="w-3.5 h-3.5" />
          <span>Arşive Git</span>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [isAdmin, setIsAdmin] = useState<boolean>(isStudioAdminAuthenticated());
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [clientsArchive, setClientsArchive] = useState<CompleteClientRecord[]>([]);
  const [customSymbols, setCustomSymbols] = useState<SymbolItem[]>([]);

  // Active Client Session State
  const [client, setClient] = useState<ClientData | null>(null);
  const [numerology, setNumerology] = useState<NumerologyResult | null>(null);
  const [astrology, setAstrology] = useState<AstrologyResult | null>(null);
  const [ebced, setEbced] = useState<EbcedResult | null>(null);
  const [chakra, setChakra] = useState<ChakraResult | null>(null);
  const [archetype, setArchetype] = useState<UnifiedArchetypeResult | null>(null);

  const [enneagramAnswers, setEnneagramAnswers] = useState<EnneagramAnswer[]>([]);
  const [enneagramResult, setEnneagramResult] = useState<EnneagramResult | null>(null);

  const [totemAnswers, setTotemAnswers] = useState<TotemAnswer[]>([]);
  const [totemResult, setTotemResult] = useState<TotemResult | null>(null);

  const [canonicalDesign, setCanonicalDesign] = useState<CanonicalDesignObject | null>(null);
  const [savedToArchiveStatus, setSavedToArchiveStatus] = useState<boolean>(false);

  // Restore client from archive helper
  const loadClientIntoState = (record: CompleteClientRecord, switchView: boolean = true) => {
    setClient(record.client);
    setNumerology(record.numerology);
    setAstrology(record.astrology);
    setEbced(record.ebced);
    setChakra(record.chakra);
    setArchetype(record.unifiedArchetype);
    setEnneagramAnswers(record.enneagram.answers);
    setEnneagramResult(record.enneagram.result);
    setTotemAnswers(record.totem.answers);
    setTotemResult(record.totem.result);

    const activeVer = record.designVersions.find(v => v.id === record.activeVersionId) || record.designVersions[0];
    if (activeVer) {
      setCanonicalDesign(activeVer.canonicalDesign);
    }

    if (switchView) {
      setActiveView('analysis');
    }
  };

  // Load storage on mount
  useEffect(() => {
    let clients = getAllClients();
    setCustomSymbols(getCustomSymbols());

    if (clients.length === 0) {
      seedInitialShowcaseClient();
      clients = getAllClients();
    } else {
      loadClientIntoState(clients[0], false);
    }
    setClientsArchive(clients);
  }, []);

  const handleLoadShowcaseClient = () => {
    const clients = getAllClients();
    const showcase = clients.find(c => c.client.id === 'client_showcase_1') || clients[0];
    if (showcase) {
      loadClientIntoState(showcase, true);
    } else {
      seedInitialShowcaseClient();
      const fresh = getAllClients()[0];
      if (fresh) loadClientIntoState(fresh, true);
    }
  };

  const seedInitialShowcaseClient = () => {
    const starterClient: ClientData = {
      id: 'client_showcase_1',
      firstName: 'Defne',
      lastName: 'Aksoy',
      birthDate: '1992-04-18',
      birthTime: '11:15',
      birthPlace: 'İstanbul',
      motherName: 'Emine', // Strictly used for Ebced only
      phone: '0532 123 45 67',
      email: 'defne.aksoy@ornek.com',
      notes: 'Mitolojik ve geometrik sembolleri seviyor; kolda zarif bir Fine Line kompozisyon istiyor.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const num = calculateNumerology(starterClient.birthDate, `${starterClient.firstName} ${starterClient.lastName}`);
    const astro = calculateAstrology(starterClient.birthDate, starterClient.birthTime, starterClient.birthPlace);
    const ebc = calculateEbced(`${starterClient.firstName} ${starterClient.lastName}`, starterClient.motherName);

    // Sample Enneagram (Type 4w5)
    const ennAnswers: EnneagramAnswer[] = [
      { questionId: 10, score: 5 },
      { questionId: 11, score: 5 },
      { questionId: 12, score: 4 },
      { questionId: 13, score: 4 },
      { questionId: 14, score: 4 }
    ];
    const ennRes = calculateEnneagram(ennAnswers);

    // Sample Totem (Kurt primary)
    const totAnswers: TotemAnswer[] = [
      { questionId: 1, selectedOptionIndex: 1 },
      { questionId: 2, selectedOptionIndex: 0 },
      { questionId: 8, selectedOptionIndex: 1 },
      { questionId: 12, selectedOptionIndex: 0 }
    ];
    const totRes = calculateTotem(totAnswers);

    const chk = calculateChakra(astro.element, num.lifePathNumber, ennRes.coreType);
    const arch = calculateUnifiedArchetype(num, ennRes, totRes, astro, ebc, chk);

    const canonical: CanonicalDesignObject = {
      clientId: starterClient.id,
      versionId: 'v1',
      versionName: 'Versiyon 1 (Fine Line)',
      selectedStyle: 'style_fine_line',
      secondaryStyles: ['style_geometric'],
      placementId: 'plc_inner_forearm',
      includeTotemAnimalFigure: true, // Animal figure integrated in fine line
      selectedSymbols: ['sym_yasam_cicegi', 'sym_lotus', 'sym_cember'],
      excludedSymbols: ['sym_kalkan_ve_kilic'], // Excluded sword
      abstractTotemTraits: totRes.primaryTotem.abstractDesignEquivalents,
      compositionSpecs: {
        focalPoint: 'Merkez',
        flowDirection: 'Dikey',
        symmetryType: 'Simetrik',
        negativeSpacePercentage: 55,
        layerHierarchy: {
          primarySubject: totRes.primaryTotem.name,
          secondaryAccents: ['Lotus Yaprağı'],
          backgroundSacredGeometry: ['Yaşam Çiçeği'],
          botanicalFraming: []
        }
      },
      colorPalette: {
        type: 'Pure Black & Grey',
        notes: '0.25mm tek iğne ile saç teli inceliğinde konturlar'
      },
      technicalConstraints: {
        targetSkinReadabilityYears: 25,
        antiBlowoutSpacingMM: 1.0,
        recommendedNeedles: ['1RL', '3RL']
      },
      updatedAt: new Date().toISOString()
    };

    const personal = generatePersonalRecipe(starterClient, canonical, arch, totRes, astro, num, chk, ebc, MASTER_SYMBOLS, ennRes);
    const technical = generateTechnicalRecipe(canonical, starterClient);
    const prompts = generateAllPrompts(canonical, totRes, MASTER_SYMBOLS, starterClient.motherName);

    const record: CompleteClientRecord = {
      schemaVersion: 1,
      client: starterClient,
      numerology: num,
      astrology: astro,
      ebced: ebc,
      chakra: chk,
      unifiedArchetype: arch,
      enneagram: { answers: ennAnswers, result: ennRes },
      totem: { answers: totAnswers, result: totRes },
      designVersions: [
        {
          id: 'v1',
          name: 'Versiyon 1 (Fine Line)',
          canonicalDesign: canonical,
          personalRecipe: personal,
          technicalRecipe: technical,
          prompts,
          createdAt: new Date().toISOString()
        }
      ],
      activeVersionId: 'v1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    saveClientRecord(record);
    setClientsArchive([record]);
    loadClientIntoState(record, false);
  };

  // Requirement 1 & 28: Clean state on "Yeni Danışan"
  const handleStartNewClient = () => {
    setClient({
      id: `client_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      firstName: '',
      lastName: '',
      birthDate: '1995-06-15',
      birthTime: '12:00',
      birthPlace: 'İstanbul',
      motherName: '',
      phone: '',
      email: '',
      notes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    setNumerology(null);
    setAstrology(null);
    setEbced(null);
    setChakra(null);
    setArchetype(null);
    setEnneagramAnswers([]);
    setEnneagramResult(null);
    setTotemAnswers([]);
    setTotemResult(null);
    setCanonicalDesign(null);
    setSavedToArchiveStatus(false);

    setActiveView('client_form');
  };

  const handleSaveClientForm = (newClientData: ClientData) => {
    setClient(newClientData);

    // Compute independent engines immediately
    const num = calculateNumerology(newClientData.birthDate, `${newClientData.firstName} ${newClientData.lastName}`);
    const astro = calculateAstrology(
      newClientData.birthDate,
      newClientData.birthTime,
      newClientData.birthPlace,
      {
        zodiacSystem: newClientData.preferredAstrologySystem,
        houseSystem: newClientData.preferredHouseSystem
      }
    );
    const ebc = calculateEbced(`${newClientData.firstName} ${newClientData.lastName}`, newClientData.motherName);

    setNumerology(num);
    setAstrology(astro);
    setEbced(ebc);

    // If Enneagram and Totem not yet answered, calculate defaults for initial archetype
    const defaultEnnAnswers: EnneagramAnswer[] = [];
    const ennRes = enneagramResult || calculateEnneagram(defaultEnnAnswers);
    const defaultTotAnswers: TotemAnswer[] = [];
    const totRes = totemResult || calculateTotem(defaultTotAnswers);

    const chk = calculateChakra(astro.element, num.lifePathNumber, ennRes.coreType);
    const arch = calculateUnifiedArchetype(num, ennRes, totRes, astro, ebc, chk);

    setChakra(chk);
    setArchetype(arch);

    // Initialize canonical design if not present
    if (!canonicalDesign) {
      const rec = getRecommendedSymbols(num, ennRes, totRes, astro, chk, ebc, customSymbols);
      const initCanonical: CanonicalDesignObject = {
        clientId: newClientData.id,
        versionId: 'v1',
        versionName: 'Versiyon 1',
        selectedStyle: 'style_fine_line',
        secondaryStyles: [],
        placementId: 'plc_inner_forearm',
        includeTotemAnimalFigure: true,
        selectedSymbols: rec.coreRecommended.slice(0, 3).map(s => s.id),
        excludedSymbols: [],
        abstractTotemTraits: totRes.primaryTotem.abstractDesignEquivalents,
        compositionSpecs: {
          focalPoint: 'Merkez',
          flowDirection: 'Dikey',
          symmetryType: 'Simetrik',
          negativeSpacePercentage: 50,
          layerHierarchy: {
            primarySubject: totRes.primaryTotem.name,
            secondaryAccents: [],
            backgroundSacredGeometry: [],
            botanicalFraming: []
          }
        },
        colorPalette: {
          type: 'Pure Black & Grey',
          notes: ''
        },
        technicalConstraints: {
          targetSkinReadabilityYears: 20,
          antiBlowoutSpacingMM: 1.0,
          recommendedNeedles: ['3RL']
        },
        updatedAt: new Date().toISOString()
      };
      setCanonicalDesign(initCanonical);
    }
  };

  const handleSaveEnneagram = (answers: EnneagramAnswer[], res: EnneagramResult) => {
    setEnneagramAnswers(answers);
    setEnneagramResult(res);

    if (numerology && astrology && ebced && totemResult) {
      const chk = calculateChakra(astrology.element, numerology.lifePathNumber, res.coreType);
      const arch = calculateUnifiedArchetype(numerology, res, totemResult, astrology, ebced, chk);
      setChakra(chk);
      setArchetype(arch);
    }
  };

  const handleSaveTotem = (answers: TotemAnswer[], res: TotemResult) => {
    setTotemAnswers(answers);
    setTotemResult(res);

    if (numerology && astrology && ebced && enneagramResult && chakra) {
      const arch = calculateUnifiedArchetype(numerology, enneagramResult, res, astrology, ebced, chakra);
      setArchetype(arch);

      if (canonicalDesign) {
        setCanonicalDesign(prev => prev ? ({
          ...prev,
          abstractTotemTraits: res.primaryTotem.abstractDesignEquivalents,
          updatedAt: new Date().toISOString()
        }) : null);
      }
    }
  };

  // Symbols Inclusion / Exclusion Handlers
  const handleToggleSelectSymbol = (symbolId: string) => {
    if (!canonicalDesign) return;
    setCanonicalDesign(prev => {
      if (!prev) return null;
      const isSelected = prev.selectedSymbols.includes(symbolId);
      const newSelected = isSelected
        ? prev.selectedSymbols.filter(id => id !== symbolId)
        : [...prev.selectedSymbols, symbolId];
      const newExcluded = prev.excludedSymbols.filter(id => id !== symbolId);

      return {
        ...prev,
        selectedSymbols: newSelected,
        excludedSymbols: newExcluded,
        updatedAt: new Date().toISOString()
      };
    });
  };

  const handleToggleExcludeSymbol = (symbolId: string) => {
    if (!canonicalDesign) return;
    setCanonicalDesign(prev => {
      if (!prev) return null;
      const isExcluded = prev.excludedSymbols.includes(symbolId);
      const newExcluded = isExcluded
        ? prev.excludedSymbols.filter(id => id !== symbolId)
        : [...prev.excludedSymbols, symbolId];
      const newSelected = prev.selectedSymbols.filter(id => id !== symbolId);

      return {
        ...prev,
        selectedSymbols: newSelected,
        excludedSymbols: newExcluded,
        updatedAt: new Date().toISOString()
      };
    });
  };

  const handleSetNeutralSymbol = (symbolId: string) => {
    if (!canonicalDesign) return;
    setCanonicalDesign(prev => {
      if (!prev) return null;
      return {
        ...prev,
        selectedSymbols: prev.selectedSymbols.filter(id => id !== symbolId),
        excludedSymbols: prev.excludedSymbols.filter(id => id !== symbolId),
        updatedAt: new Date().toISOString()
      };
    });
  };

  const handleApplyRecommendedSymbols = (ids: string[]) => {
    if (!canonicalDesign) return;
    setCanonicalDesign(prev => {
      if (!prev) return null;
      const combined = Array.from(new Set([...prev.selectedSymbols, ...ids]));
      const newExcluded = prev.excludedSymbols.filter(id => !combined.includes(id));
      return {
        ...prev,
        selectedSymbols: combined,
        excludedSymbols: newExcluded,
        updatedAt: new Date().toISOString()
      };
    });
  };

  // Save to Archive
  const handleSaveToArchive = () => {
    if (!client || !numerology || !astrology || !ebced || !chakra || !archetype || !canonicalDesign) return;

    const ennRes = enneagramResult || calculateEnneagram([]);
    const totRes = totemResult || calculateTotem([]);
    const personal = generatePersonalRecipe(client, canonicalDesign, archetype, totRes, astrology, numerology, chakra, ebced, MASTER_SYMBOLS, ennRes);
    const technical = generateTechnicalRecipe(canonicalDesign, client);
    const prompts = generateAllPrompts(canonicalDesign, totRes, MASTER_SYMBOLS, client.motherName);

    const record: CompleteClientRecord = {
      schemaVersion: 1,
      client,
      numerology,
      astrology,
      ebced,
      chakra,
      unifiedArchetype: archetype,
      enneagram: { answers: enneagramAnswers, result: ennRes },
      totem: { answers: totemAnswers, result: totRes },
      designVersions: [
        {
          id: canonicalDesign.versionId,
          name: canonicalDesign.versionName,
          canonicalDesign,
          personalRecipe: personal,
          technicalRecipe: technical,
          prompts,
          createdAt: new Date().toISOString()
        }
      ],
      activeVersionId: canonicalDesign.versionId,
      createdAt: client.createdAt,
      updatedAt: new Date().toISOString()
    };

    saveClientRecord(record);
    setClientsArchive(getAllClients());
    setSavedToArchiveStatus(true);
    setTimeout(() => setSavedToArchiveStatus(false), 3000);
  };

  // Requirement 49: Design Versions Iteration
  const handleNewDesignVersion = () => {
    if (!canonicalDesign) return;
    const currentNum = parseInt(canonicalDesign.versionName.replace(/\D/g, '') || '1', 10);
    const nextVer = currentNum + 1;
    const nextCanonical: CanonicalDesignObject = {
      ...canonicalDesign,
      versionId: `v${nextVer}`,
      versionName: `Versiyon ${nextVer}`,
      updatedAt: new Date().toISOString()
    };
    setCanonicalDesign(nextCanonical);
    setActiveView('design_preferences');
  };

  // Restore client from archive
  const handleSelectClientFromArchive = (record: CompleteClientRecord) => {
    loadClientIntoState(record, true);
  };

  const handleDeleteClientFromArchive = (id: string) => {
    deleteClientRecord(id);
    setClientsArchive(getAllClients());
    if (client && client.id === id) {
      setClient(null);
    }
  };

  // Lazy compute recipes & prompts when needed
  const resolvedEnnRes = enneagramResult || calculateEnneagram([]);
  const resolvedTotRes = totemResult || calculateTotem([]);
  const resolvedAllSymbols = [...MASTER_SYMBOLS, ...customSymbols];

  const currentPersonalRecipe = (client && canonicalDesign && archetype && numerology && astrology && chakra && ebced)
    ? generatePersonalRecipe(client, canonicalDesign, archetype, resolvedTotRes, astrology, numerology, chakra, ebced, resolvedAllSymbols, resolvedEnnRes)
    : null;

  const currentTechnicalRecipe = (client && canonicalDesign)
    ? generateTechnicalRecipe(canonicalDesign, client)
    : null;

  const currentPrompts = canonicalDesign
    ? generateAllPrompts(canonicalDesign, resolvedTotRes, resolvedAllSymbols, client?.motherName)
    : null;

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#090b0e] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
        {/* Top Bar Header */}
        <TopBar
          activeView={activeView}
          onNavigate={setActiveView}
          isAdmin={isAdmin}
          onOpenAdminModal={() => setIsAdminModalOpen(true)}
          onNewClient={handleStartNewClient}
          hasActiveClient={!!client}
          activeClientName={client ? `${client.firstName} ${client.lastName}` : undefined}
        />

        {/* Main Content Area */}
        <main className="flex-1 pb-16">
          {activeView === 'dashboard' && (
            <DashboardView
              clients={clientsArchive}
              activeClient={client && numerology && astrology && enneagramResult && totemResult ? {
                schemaVersion: 1,
                client,
                numerology,
                astrology,
                ebced: ebced!,
                chakra: chakra!,
                unifiedArchetype: archetype!,
                enneagram: { answers: enneagramAnswers, result: enneagramResult },
                totem: { answers: totemAnswers, result: totemResult },
                designVersions: [],
                activeVersionId: 'v1',
                createdAt: client.createdAt,
                updatedAt: client.updatedAt
              } : null}
              onNewClient={handleStartNewClient}
              onSelectClient={handleSelectClientFromArchive}
              onNavigate={setActiveView}
            />
          )}

          {activeView === 'client_form' && (
            <ClientFormView
              initialData={client}
              onSaveClient={handleSaveClientForm}
              onNext={() => setActiveView('enneagram')}
            />
          )}

          {activeView === 'enneagram' && (
            <EnneagramTestView
              answers={enneagramAnswers}
              onSaveAnswers={handleSaveEnneagram}
              onNext={() => setActiveView('totem')}
            />
          )}

          {activeView === 'totem' && (
            <TotemTestView
              answers={totemAnswers}
              onSaveAnswers={handleSaveTotem}
              onNext={() => setActiveView('analysis')}
            />
          )}

          {activeView === 'analysis' && (
            (numerology && astrology && ebced && chakra && archetype) ? (
              <AnalysisOverviewView
                numerology={numerology}
                astrology={astrology}
                ebced={ebced}
                chakra={chakra}
                archetype={archetype}
                enneagram={resolvedEnnRes}
                totem={resolvedTotRes}
                onNext={() => setActiveView('symbols')}
              />
            ) : (
              <NoClientFallback
                title="Bütünleşik Analiz"
                onNewClient={handleStartNewClient}
                onLoadShowcase={handleLoadShowcaseClient}
                onGoToArchive={() => setActiveView('archive')}
              />
            )
          )}

          {activeView === 'symbols' && (
            canonicalDesign ? (
              <SymbolSelectionView
                allSymbols={resolvedAllSymbols}
                selectedSymbols={canonicalDesign.selectedSymbols}
                excludedSymbols={canonicalDesign.excludedSymbols}
                recommendedSymbols={
                  (numerology && astrology && ebced && chakra)
                    ? getRecommendedSymbols(numerology, resolvedEnnRes, resolvedTotRes, astrology, chakra, ebced, customSymbols).coreRecommended
                    : []
                }
                onToggleSelect={handleToggleSelectSymbol}
                onToggleExclude={handleToggleExcludeSymbol}
                onSetNeutral={handleSetNeutralSymbol}
                onApplyRecommended={handleApplyRecommendedSymbols}
                onNext={() => setActiveView('design_preferences')}
              />
            ) : (
              <NoClientFallback
                title="Sembol Seçimi"
                onNewClient={handleStartNewClient}
                onLoadShowcase={handleLoadShowcaseClient}
                onGoToArchive={() => setActiveView('archive')}
              />
            )
          )}

          {activeView === 'design_preferences' && (
            canonicalDesign ? (
              <DesignPreferencesView
                canonical={canonicalDesign}
                totem={resolvedTotRes}
                onUpdateCanonical={setCanonicalDesign as any}
                onNext={() => setActiveView('recipe')}
              />
            ) : (
              <NoClientFallback
                title="Stil ve Yerleşim"
                onNewClient={handleStartNewClient}
                onLoadShowcase={handleLoadShowcaseClient}
                onGoToArchive={() => setActiveView('archive')}
              />
            )
          )}

          {activeView === 'recipe' && (
            (currentPersonalRecipe && currentTechnicalRecipe) ? (
              <RecipeView
                personalRecipe={currentPersonalRecipe}
                technicalRecipe={currentTechnicalRecipe}
                onNext={() => setActiveView('prompts')}
              />
            ) : (
              <NoClientFallback
                title="Dövme Reçeteleri"
                onNewClient={handleStartNewClient}
                onLoadShowcase={handleLoadShowcaseClient}
                onGoToArchive={() => setActiveView('archive')}
              />
            )
          )}

          {activeView === 'prompts' && (
            (currentPrompts && canonicalDesign && client && currentPersonalRecipe && currentTechnicalRecipe) ? (
              <PromptGeneratorView
                prompts={currentPrompts}
                canonical={canonicalDesign}
                client={client}
                personalRecipe={currentPersonalRecipe}
                technicalRecipe={currentTechnicalRecipe}
                totem={resolvedTotRes}
                enneagram={resolvedEnnRes}
                numerology={numerology!}
                astrology={astrology!}
                ebced={ebced!}
                chakra={chakra!}
                enneagramAnswers={enneagramAnswers}
                totemAnswers={totemAnswers}
                onSaveToArchive={handleSaveToArchive}
                onNewDesignVersion={handleNewDesignVersion}
                savedToArchiveStatus={savedToArchiveStatus}
              />
            ) : (
              <NoClientFallback
                title="AI Prompt Üretimi"
                onNewClient={handleStartNewClient}
                onLoadShowcase={handleLoadShowcaseClient}
                onGoToArchive={() => setActiveView('archive')}
              />
            )
          )}

          {activeView === 'archive' && (
            <ClientArchiveView
              clients={clientsArchive}
              onSelectClient={handleSelectClientFromArchive}
              onDeleteClient={handleDeleteClientFromArchive}
              onClientImported={rec => {
                setClientsArchive(getAllClients());
                handleSelectClientFromArchive(rec);
              }}
            />
          )}

          {activeView === 'validation' && (
            <ValidationCenterView />
          )}

          {activeView === 'report' && client && numerology && astrology && ebced && chakra && archetype && (
            <ExportReportView
              record={{
                schemaVersion: 1,
                client,
                numerology,
                astrology,
                ebced,
                chakra,
                unifiedArchetype: archetype,
                enneagram: { answers: enneagramAnswers, result: resolvedEnnRes },
                totem: { answers: totemAnswers, result: resolvedTotRes },
                designVersions: [
                  {
                    id: canonicalDesign?.versionId || 'v1',
                    name: canonicalDesign?.versionName || 'Versiyon 1',
                    canonicalDesign: canonicalDesign!,
                    personalRecipe: currentPersonalRecipe!,
                    technicalRecipe: currentTechnicalRecipe!,
                    prompts: currentPrompts!,
                    createdAt: new Date().toISOString()
                  }
                ],
                activeVersionId: canonicalDesign?.versionId || 'v1',
                createdAt: client.createdAt,
                updatedAt: client.updatedAt
              }}
              onBack={() => setActiveView('prompts')}
            />
          )}
        </main>

        {/* Studio Footer */}
        <footer className="border-t border-slate-900 bg-[#07090b] text-[11px] text-slate-500 py-6 print:hidden">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-400">Dövme Tasarım Asistanı</span>
              <span>·</span>
              <span>V2 Production Release</span>
              <span>·</span>
              <span className="text-emerald-500">Deterministik Hesaplama Motorları Aktif</span>
            </div>
            <div className="flex items-center gap-4 text-slate-500">
              <button onClick={() => setActiveView('validation')} className="hover:text-amber-400 transition-colors">
                Regresyon Testleri
              </button>
              <button onClick={() => setActiveView('archive')} className="hover:text-amber-400 transition-colors">
                Danışan Arşivi
              </button>
              <span>Gizlilik & Telif Hakları Saklıdır</span>
            </div>
          </div>
        </footer>

        {/* Admin Login Modal */}
        <AdminLoginModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
          isAdmin={isAdmin}
          onAuthStateChange={() => setIsAdmin(isStudioAdminAuthenticated())}
        />
      </div>
    </ErrorBoundary>
  );
}
