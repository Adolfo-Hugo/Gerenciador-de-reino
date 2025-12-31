
import React from 'react';
import { BrutalCard, SectionTitle } from '../components/UI';

interface EvolutionRow {
  level: number;
  dc: number;
  features: string;
}

const evolutionTable: EvolutionRow[] = [
  { level: 1, dc: 14, features: "Construção de assentamento (aldeia), governo, licença, proficiências iniciais, região central, região predileta" },
  { level: 2, dc: 15, features: "Talento de Reino" },
  { level: 3, dc: 16, features: "Construção de assentamento (vila), incremento de perícia" },
  { level: 4, dc: 18, features: "Especialista em expansão, talento de Reino, viver bem" },
  { level: 5, dc: 20, features: "Incremento de perícia, melhorias de atributo, resistência a ruína" },
  { level: 6, dc: 22, features: "Talento de Reino" },
  { level: 7, dc: 23, features: "Incremento de perícia" },
  { level: 8, dc: 24, features: "Liderança experiente +2, resistência a ruína, talento de Reino" },
  { level: 9, dc: 26, features: "Construção de assentamento (cidade), especialista em expansão (Reivindica Hexágonos 3 vezes/turno), incremento de perícia" },
  { level: 10, dc: 27, features: "Melhorias de atributo, talento de Reino, vida de luxo" },
  { level: 11, dc: 28, features: "Incremento de perícia, resistência a ruína" },
  { level: 12, dc: 30, features: "Planejamento cívico, talento de Reino" },
  { level: 13, dc: 31, features: "Incremento de perícia" },
  { level: 14, dc: 32, features: "Construção de assentamento (metrópole), incremento de perícia, melhorias de atributo" },
  { level: 15, dc: 34, features: "Liderança experiente +3, talento de Reino" },
  { level: 16, dc: 35, features: "Liderança experiente +3, talento de Reino" },
  { level: 17, dc: 36, features: "Incremento de perícia, resistência a ruína" },
  { level: 18, dc: 38, features: "Talento de Reino" },
  { level: 19, dc: 39, features: "Incremento de perícia" },
  { level: 20, dc: 40, features: "Inveja do mundo, melhorias de atributo, resistência a ruína, talento de Reino" },
];

const KingdomEvolution: React.FC = () => {
  return (
    <div className="space-y-12 pb-20">
      <div className="border-b-4 border-black dark:border-white pb-6">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter font-display">Evolução do Reino</h1>
        <p className="text-sm opacity-80 mt-2 font-bold uppercase tracking-widest">Progressão de Poder e Capacidade</p>
      </div>

      <BrutalCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary text-white font-black uppercase text-xs border-b-4 border-black dark:border-white">
                <th className="p-4 w-20 text-center">Nível</th>
                <th className="p-4 w-32 text-center">CD Controle</th>
                <th className="p-4">Características do Reino</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-200 dark:divide-gray-800">
              {evolutionTable.map((row) => (
                <tr key={row.level} className="hover:bg-primary/5 transition-colors">
                  <td className="p-4 text-center font-black text-lg">{row.level}</td>
                  <td className="p-4 text-center font-bold text-lg bg-gray-50 dark:bg-black/20">{row.dc}</td>
                  <td className="p-4 text-sm font-medium">{row.features}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </BrutalCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FeatureBlock 
          title="Governo, Licença e Região Central (1º)"
          text="Seu reino recebe os benefícios do governo, da licença e da região central que você escolheu no momento da fundação."
        />
        <FeatureBlock 
          title="Proficiências Iniciais (1º)"
          text="No 1º nível, um reino recebe a graduação de proficiência treinado em duas perícias recebidas pelo governo e até quatro perícias adicionais determinadas pelos líderes. O bônus é igual ao nível + 2. Estas proficiências são permanentes e não mudam com a troca de líderes ou governo."
        />
        <FeatureBlock 
          title="Região Predileta (1º)"
          text="O terreno da sua região central se torna a região predileta. Uma vez por turno, na etapa de Atividades de Região, você pode fazer duas atividades simultaneamente no mesmo hexágono (se for o terreno predileto), sofrendo –2 de penalidade nos testes."
        />
        <FeatureBlock 
          title="Construção de Assentamento (1º)"
          text="Você pode estabelecer aldeias imediatamente. No 3º nível, vilas; no 9º, cidades; e no 15º, metrópoles. Assentamentos maiores oferecem mais espaço e aumentam o limite de bônus de item das estruturas construídas."
        />
        <FeatureBlock 
          title="Talentos de Reino (2º)"
          text="No 2º nível e a cada 2 níveis subsequentes, o reino recebe um talento de Reino."
        />
        <FeatureBlock 
          title="Incremento de Perícia (3º)"
          text="No 3º nível e a cada 2 níveis subsequentes, seu reino recebe um incremento de perícia. No 7º nível, pode atingir mestre e no 15º nível, lendário."
        />
        <FeatureBlock 
          title="Especialista em Expansão (4º)"
          text="Recebe +2 de bônus de circunstância em Reivindicar Hexágono e pode tentar a ação duas vezes por turno (três vezes no 9º nível)."
        />
        <FeatureBlock 
          title="Viver Bem (4º)"
          text="Líderes desfrutam de padrão de vida Bom sem custos. Recebe +1 de bônus de circunstância em Manufaturar ou Ganhar Proventos no reino."
        />
        <FeatureBlock 
          title="Melhorias de Atributo (5º)"
          text="No 5º nível e a cada 5 subsequentes, incremente dois atributos diferentes (+2 se menor que 18, +1 se 18 ou maior)."
        />
        <FeatureBlock 
          title="Resistência a Ruína (5º)"
          text="A cada 3 níveis a partir do 5º, aumente o limiar de uma Ruína em 2 e zere sua penalidade atual."
        />
        <FeatureBlock 
          title="Liderança Experiente (8º)"
          text="Líderes concedem +2 de bônus de estado em testes associados ao seu atributo chave (+3 no 16º nível)."
        />
        <FeatureBlock 
          title="Vida de Luxo (10º)"
          text="Líderes desfrutam de padrão de vida Extravagante. O bônus de Manufaturar/Ganhar Proventos sobe para +2."
        />
        <FeatureBlock 
          title="Planejamento Cívico (12º)"
          text="Um assentamento escolhido por turno pode realizar duas atividades Cívicas em vez de uma."
        />
        <FeatureBlock 
          title="Inveja do Mundo (20º)"
          text="Ignore o primeiro aumento de Desordem ou Ruína do turno. Pode ignorar aumentos extras gastando Fama ou Infâmia. Limite de Fama/Infâmia +1."
        />
      </div>
    </div>
  );
};

const FeatureBlock: React.FC<{ title: string, text: string }> = ({ title, text }) => (
  <BrutalCard className="h-full">
    <h3 className="text-xl font-black uppercase text-primary dark:text-accent mb-4 border-b-2 border-black dark:border-white pb-2">
      {title}
    </h3>
    <p className="text-sm font-medium leading-relaxed opacity-90">{text}</p>
  </BrutalCard>
);

export default KingdomEvolution;
