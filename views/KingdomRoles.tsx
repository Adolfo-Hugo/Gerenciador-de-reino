
import React from 'react';
import { BrutalCard, SectionTitle } from '../components/UI';
import { useKingdom } from '../KingdomContext';

interface RoleData {
  id: string;
  name: string;
  description: string;
  keyAttribute: string;
  penalty: string;
  color: string;
}

const roles: RoleData[] = [
  {
    id: 'governante',
    name: 'Governante',
    description: 'Realiza as cerimônias mais importantes, é o oficial diplomático principal, signatário de leis, perdoa criminosos e nomeia todas as outras posições.',
    keyAttribute: 'Lealdade',
    penalty: '–1 em todos os testes; recebe 1d4 de Desordem no início do turno; CD de Controle aumenta em 2.',
    color: 'border-primary'
  },
  {
    id: 'conselheiro',
    name: 'Conselheiro',
    description: 'Intermediário entre governo e cidadãos. Estuda questões academicamente, interpreta desejos da população e apresenta decretos de forma compreensível.',
    keyAttribute: 'Cultura',
    penalty: '–1 em todos os testes baseados em Cultura.',
    color: 'border-accent'
  },
  {
    id: 'general',
    name: 'General',
    description: 'Lidera as forças armadas, comanda exércitos e gerencia comandantes. Cuida das necessidades militares e orienta em tempos de guerra.',
    keyAttribute: 'Estabilidade',
    penalty: '–4 em atividades de Artes Bélicas.',
    color: 'border-secondary'
  },
  {
    id: 'emissario',
    name: 'Emissário',
    description: 'Mantém segredos de estado, supervisiona intrigas clandestinas e lida com elementos criminosos. Gerencia política externa e organizações internas.',
    keyAttribute: 'Lealdade',
    penalty: '–1 em todos os testes baseados em Lealdade.',
    color: 'border-primary'
  },
  {
    id: 'magista',
    name: 'Magista',
    description: 'Responsável pelo místico no reino e como o sobrenatural afeta cidadãos. Promove o ensino superior em artes mágicas e burocracia mágica.',
    keyAttribute: 'Cultura',
    penalty: '–4 em todas as atividades de Artes Bélicas.',
    color: 'border-accent'
  },
  {
    id: 'tesoureiro',
    name: 'Tesoureiro',
    description: 'Monitora recursos, indústria e confiança econômica. Garante mercado justo, investiga abusos e lida com questões fiscais.',
    keyAttribute: 'Economia',
    penalty: '–1 em todos os testes baseados em Economia.',
    color: 'border-yellow-600'
  },
  {
    id: 'viceRei',
    name: 'Vice-Rei',
    description: 'Planeja e implementa a expansão territorial e desenvolvimento de assentamentos. Gerencia infraestrutura e redes de conexão nacional.',
    keyAttribute: 'Economia',
    penalty: '–1 em todos os testes baseados em Estabilidade.',
    color: 'border-yellow-600'
  },
  {
    id: 'protetor',
    name: 'Protetor',
    description: 'Monitora a segurança e integridade das terras e fronteiras. Gerencia patrulhas rurais, batedores e lida com ameaças locais.',
    keyAttribute: 'Estabilidade',
    penalty: '–4 em atividades de Região.',
    color: 'border-secondary'
  }
];

const KingdomRoles: React.FC = () => {
  const { activeKingdom: kingdom, updateLeaders, toggleRoleVacancy } = useKingdom();

  if (!kingdom) return null;

  return (
    <div className="space-y-12 pb-20">
      <div className="border-b-4 border-black dark:border-white pb-6">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter font-display">Funções de Liderança</h1>
        <p className="text-sm opacity-80 mt-2 font-bold uppercase tracking-widest">Os Pilares da Governança do Reino</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {roles.map((role) => {
          const isVacant = kingdom.stats.vacantRoles?.includes(role.id);
          return (
            <BrutalCard key={role.id} className={`flex flex-col h-full border-t-8 ${role.color} ${isVacant ? 'bg-red-50 dark:bg-red-900/5' : ''}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                  <h3 className="text-2xl font-black font-display uppercase leading-tight text-primary dark:text-accent">
                    {role.name}
                  </h3>
                  {isVacant && <span className="text-[10px] font-black text-red-600 uppercase">VAGO</span>}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="bg-black text-white px-2 py-1 text-[10px] font-black uppercase shadow-brutal border border-white">
                    {role.keyAttribute}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[8px] font-black uppercase opacity-60">Cargo Vago?</span>
                    <input 
                      type="checkbox"
                      checked={isVacant}
                      onChange={() => toggleRoleVacancy(role.id)}
                      className="w-5 h-5 border-2 border-black focus:ring-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="flex-grow space-y-4">
                <p className="text-sm font-medium leading-relaxed opacity-90 border-l-4 border-gray-200 dark:border-gray-700 pl-4">
                  {role.description}
                </p>

                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase opacity-60">Líder Investido</label>
                  <input 
                    type="text"
                    placeholder="Nome do personagem..."
                    value={kingdom.leaders[role.id] || ""}
                    onChange={(e) => updateLeaders({ [role.id]: e.target.value })}
                    className={`w-full bg-gray-50 dark:bg-black/20 border-2 p-2 font-bold text-sm focus:ring-0 ${isVacant ? 'border-red-600 text-red-600' : 'border-black dark:border-white'}`}
                  />
                </div>

                <div className={`p-3 border-2 ${isVacant ? 'bg-red-700 text-white' : 'bg-red-50 dark:bg-red-900/10 border-red-700'}`}>
                  <span className={`text-[9px] font-black uppercase block mb-1 ${isVacant ? 'text-white' : 'text-red-700 dark:text-red-400'}`}>
                    Penalidade de Desocupação
                  </span>
                  <p className={`text-[10px] font-black leading-tight uppercase ${isVacant ? 'text-white' : 'text-red-900 dark:text-red-200'}`}>
                    {role.penalty}
                  </p>
                </div>
              </div>

              {isVacant && (
                <div className="mt-4 pt-4 border-t-2 border-dashed border-red-700 text-[10px] font-black uppercase text-red-700 animate-pulse flex items-center gap-2">
                  <span className="material-icons text-sm">warning</span> PENALIDADE DE DESOCUPAÇÃO ATIVA
                </div>
              )}
            </BrutalCard>
          );
        })}
      </div>
    </div>
  );
};

export default KingdomRoles;
