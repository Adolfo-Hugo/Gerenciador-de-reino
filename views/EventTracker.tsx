
import React, { useState } from 'react';
import { useKingdom } from '../KingdomContext';
import { BrutalButton } from '../components/UI';
import { KingdomEvent, ResolutionState } from '../types';

const EventTracker: React.FC = () => {
  const { activeKingdom: kingdom, addEvent, updateEvent, removeEvent } = useKingdom();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  if (!kingdom) return null;

  const addNewEvent = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    addEvent({
      id: newId,
      name: "Novo Evento",
      level: kingdom.stats.level,
      skill: "Diplomacia",
      modifier: 0,
      dc: 15,
      notes: "",
      state: ResolutionState.PENDENTE,
      turn: kingdom.stats.currentTurn,
    });
  };

  const toggleSelection = (id: string) => {
    const newSelection = new Set(selectedIds);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedIds(newSelection);
  };

  const handleDeleteIndividual = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Excluir este evento definitivamente?')) {
      removeEvent(id);
      const newSelection = new Set(selectedIds);
      newSelection.delete(id);
      setSelectedIds(newSelection);
    }
  };

  const deleteSelected = () => {
    if (selectedIds.size === 0) return;
    if (window.confirm(`Excluir os ${selectedIds.size} eventos selecionados?`)) {
      selectedIds.forEach(id => removeEvent(id));
      setSelectedIds(new Set());
    }
  };

  const getStatusColor = (state: ResolutionState) => {
    switch (state) {
      case ResolutionState.SUCESSO: return 'bg-primary text-white';
      case ResolutionState.FALHA: return 'bg-red-700 text-white';
      case ResolutionState.CRITICO: return 'bg-yellow-400 text-black';
      default: return 'bg-white text-black';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b-4 border-black dark:border-white pb-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter font-display text-primary dark:text-accent">
            Log de Eventos
          </h1>
          <p className="text-xs opacity-60 font-bold uppercase tracking-[0.2em]">Edição rápida em linha</p>
        </div>
        <div className="flex gap-2">
          {selectedIds.size > 0 && (
            <BrutalButton variant="danger" onClick={deleteSelected} className="px-4 py-1 text-xs">
              <span className="flex items-center gap-1"><span className="material-icons text-sm">delete_sweep</span> Excluir ({selectedIds.size})</span>
            </BrutalButton>
          )}
          <BrutalButton onClick={addNewEvent} className="px-4 py-1 text-xs">
            <span className="flex items-center gap-1"><span className="material-icons text-sm">add</span> Novo Evento</span>
          </BrutalButton>
        </div>
      </div>

      <div className="overflow-x-auto border-4 border-black dark:border-white shadow-brutal dark:shadow-brutal-white bg-white dark:bg-surface-dark">
        <table className="w-full min-w-[1000px] border-collapse">
          <thead>
            <tr className="bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-widest text-left">
              <th className="p-3 w-12 border-r border-gray-700 dark:border-gray-300 text-center">#</th>
              <th className="p-3 border-r border-gray-700 dark:border-gray-300">Evento / Descrição</th>
              <th className="p-3 w-20 border-r border-gray-700 dark:border-gray-300 text-center">Nível</th>
              <th className="p-3 w-48 border-r border-gray-700 dark:border-gray-300">Perícia</th>
              <th className="p-3 w-24 border-r border-gray-700 dark:border-gray-300 text-center">CD</th>
              <th className="p-3 w-40 border-r border-gray-700 dark:border-gray-300">Estado</th>
              <th className="p-3 w-16 text-center">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-black dark:divide-white">
            {kingdom.events.map(event => (
              <tr 
                key={event.id} 
                className={`group transition-colors ${selectedIds.has(event.id) ? 'bg-primary/10' : 'hover:bg-gray-50 dark:hover:bg-white/5'}`}
              >
                <td className="p-2 border-r border-black dark:border-white text-center">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.has(event.id)}
                    onChange={() => toggleSelection(event.id)}
                    className="w-5 h-5 border-2 border-black dark:border-white text-primary focus:ring-0 cursor-pointer"
                  />
                </td>
                <td className="p-2 border-r border-black dark:border-white">
                  <input 
                    className="w-full bg-transparent border-none font-bold text-sm focus:ring-0 p-1 placeholder-gray-400"
                    value={event.name}
                    placeholder="Nome do evento..."
                    onChange={e => updateEvent(event.id, { name: e.target.value })}
                  />
                  <input 
                    className="w-full bg-transparent border-none text-[10px] italic opacity-50 focus:ring-0 p-1"
                    value={event.notes}
                    placeholder="Notas ou descrição curta..."
                    onChange={e => updateEvent(event.id, { notes: e.target.value })}
                  />
                </td>
                <td className="p-2 border-r border-black dark:border-white">
                  <input 
                    type="number"
                    className="w-full bg-transparent border-none text-center font-black focus:ring-0"
                    value={event.level}
                    onChange={e => updateEvent(event.id, { level: parseInt(e.target.value) || 0 })}
                  />
                </td>
                <td className="p-2 border-r border-black dark:border-white">
                  <input 
                    className="w-full bg-transparent border-none text-xs font-bold uppercase focus:ring-0"
                    value={event.skill}
                    placeholder="Perícia utilizada..."
                    onChange={e => updateEvent(event.id, { skill: e.target.value })}
                  />
                </td>
                <td className="p-2 border-r border-black dark:border-white">
                  <input 
                    type="number"
                    className="w-full bg-transparent border-none text-center font-black text-primary dark:text-accent focus:ring-0"
                    value={event.dc}
                    onChange={e => updateEvent(event.id, { dc: parseInt(e.target.value) || 0 })}
                  />
                </td>
                <td className="p-2 border-r border-black dark:border-white">
                  <select 
                    className={`w-full text-[10px] font-black uppercase py-1 border-2 border-black focus:ring-0 appearance-none text-center ${getStatusColor(event.state)}`}
                    value={event.state}
                    onChange={e => updateEvent(event.id, { state: e.target.value as ResolutionState })}
                  >
                    <option value={ResolutionState.PENDENTE}>Pendente</option>
                    <option value={ResolutionState.SUCESSO}>Sucesso</option>
                    <option value={ResolutionState.FALHA}>Falha</option>
                    <option value={ResolutionState.CRITICO}>Crítico</option>
                  </select>
                </td>
                <td className="p-2 text-center">
                  <button 
                    type="button"
                    onClick={(e) => handleDeleteIndividual(event.id, e)}
                    className="w-8 h-8 flex items-center justify-center bg-red-100 hover:bg-red-700 text-red-700 hover:text-white border-2 border-red-700 transition-all rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                    title="Excluir Evento"
                  >
                    <span className="material-icons text-sm">delete</span>
                  </button>
                </td>
              </tr>
            ))}
            {kingdom.events.length === 0 && (
              <tr>
                <td colSpan={7} className="p-20 text-center font-black uppercase opacity-20 text-sm tracking-widest italic">
                  O log de eventos está vazio. Adicione um novo desafio acima.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between items-center text-[10px] font-black uppercase opacity-40 px-2 tracking-widest">
        <span>Eventos Totais: {kingdom.events.length}</span>
        <span>Turno: {kingdom.stats.currentTurn}</span>
      </div>
    </div>
  );
};

export default EventTracker;
