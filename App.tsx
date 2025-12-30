
import React, { useState } from 'react';
import { KingdomProvider, useKingdom } from './KingdomContext';
import KingdomSheet from './views/KingdomSheet';
import SettlementDashboard from './views/SettlementDashboard';
import EventTracker from './views/EventTracker';
import SkillSheet from './views/SkillSheet';
import KingdomActivities from './views/KingdomActivities';
import GovernmentList from './views/GovernmentList';
import CharterList from './views/CharterList';
import HeartlandList from './views/HeartlandList';
import StructureList from './views/StructureList';
import KingdomFeats from './views/KingdomFeats';
import KingdomTurn from './views/KingdomTurn';
import KingdomSelector from './views/KingdomSelector';
import KingdomEvolution from './views/KingdomEvolution';
import { BrutalButton } from './components/UI';

type ViewType = 'sheet' | 'skills' | 'activities' | 'settlements' | 'events' | 'government' | 'charter' | 'heartland' | 'structures' | 'turn' | 'feats' | 'evolution';

const MainApp: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('sheet');
  const { activeKingdom: kingdom, selectKingdom, nextTurn, prevTurn } = useKingdom();

  if (!kingdom) {
    return <KingdomSelector />;
  }

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8">
      <header className="mb-8 border-b-4 border-black dark:border-white pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-5xl md:text-7xl font-cinzel font-black uppercase tracking-tighter drop-shadow-md text-primary dark:text-accent">
              {kingdom.stats.name}
            </h1>
            <button 
              onClick={() => selectKingdom(null)}
              className="mt-4 bg-black text-white dark:bg-white dark:text-black px-2 py-1 text-[10px] font-bold uppercase hover:bg-primary transition-colors border-2 border-black"
            >
              Trocar Reino
            </button>
          </div>
          <p className="text-sm font-bold uppercase tracking-widest opacity-80 mt-2">
            Gerenciador de Reino • Nível {kingdom.stats.level} {kingdom.stats.unrest > 0 && <span className="text-red-600 dark:text-red-400 ml-4">• Desordem {kingdom.stats.unrest}</span>}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4 items-end">
          <BrutalButton onClick={prevTurn} disabled={kingdom.stats.currentTurn <= 1}>
            Turno Anterior
          </BrutalButton>
          <div className="bg-white dark:bg-surface-dark border-4 border-black dark:border-white p-3 shadow-brutal dark:shadow-brutal-white min-w-[80px] text-center">
            <span className="block text-xs font-bold uppercase mb-1">Turno</span>
            <span className="text-3xl font-black">{kingdom.stats.currentTurn}</span>
          </div>
          <BrutalButton onClick={nextTurn}>
            Próximo Turno
          </BrutalButton>
        </div>
      </header>

      <nav className="mb-8 border-b-2 border-black dark:border-white overflow-x-auto pb-1">
        <ul className="flex flex-nowrap gap-6 md:gap-8 font-bold uppercase tracking-wider text-sm min-w-max">
          {(['sheet', 'evolution', 'turn', 'government', 'charter', 'heartland', 'skills', 'feats', 'activities', 'structures', 'settlements', 'events'] as const).map((view) => (
            <li key={view}>
              <button 
                onClick={() => setActiveView(view)}
                className={`pb-2 transition-all border-b-4 ${activeView === view ? 'border-primary text-primary dark:text-accent opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
              >
                {view === 'sheet' && 'Atributos'}
                {view === 'evolution' && 'Evolução'}
                {view === 'turn' && 'Turno'}
                {view === 'government' && 'Governo'}
                {view === 'charter' && 'Licenças'}
                {view === 'heartland' && 'Região'}
                {view === 'skills' && 'Perícias'}
                {view === 'feats' && 'Talentos'}
                {view === 'activities' && 'Atividades'}
                {view === 'structures' && 'Estruturas'}
                {view === 'settlements' && `Cidades (${kingdom.settlements.length})`}
                {view === 'events' && `Eventos (${kingdom.events.filter(e => e.state === 'Pendente').length})`}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main className="flex-grow">
        {activeView === 'sheet' && <KingdomSheet />}
        {activeView === 'evolution' && <KingdomEvolution />}
        {activeView === 'turn' && <KingdomTurn />}
        {activeView === 'government' && <GovernmentList />}
        {activeView === 'charter' && <CharterList />}
        {activeView === 'heartland' && <HeartlandList />}
        {activeView === 'skills' && <SkillSheet />}
        {activeView === 'feats' && <KingdomFeats />}
        {activeView === 'activities' && <KingdomActivities />}
        {activeView === 'structures' && <StructureList />}
        {activeView === 'settlements' && <SettlementDashboard />}
        {activeView === 'events' && <EventTracker />}
      </main>

      <footer className="mt-16 pt-8 border-t-4 border-black dark:border-white">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-4">
          <div className="flex-grow text-center md:text-left">
            <div className="flex justify-center md:justify-start gap-8 text-xs font-bold uppercase opacity-50 mb-2">
              <span>REINO: {kingdom.stats.name}</span>
              <span>XP: {kingdom.stats.xp}</span>
              <span>FAMA: {kingdom.stats.fame}</span>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-[10px] font-black uppercase opacity-60 tracking-widest">Forjado por Mestre Hugo S.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => (
  <KingdomProvider>
    <MainApp />
  </KingdomProvider>
);

export default App;
