/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Timer, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Calendar,
  ChevronRight,
  History,
  AlertCircle
} from 'lucide-react';
import { 
  MdFastfood, 
  MdLocalPizza, 
  MdIcecream, 
  MdCake, 
  MdCoffee,
  MdRestaurant,
  MdOutlineLunchDining,
  MdOutlineBakeryDining,
  MdOutlineDinnerDining,
  MdOutlineLocalBar
} from 'react-icons/md';
import { 
  FaBurger, 
  FaHotdog, 
  FaCookie, 
  FaBowlFood,
  FaAppleWhole,
  FaPizzaSlice,
  FaFish
} from 'react-icons/fa6';
import { GiCupcake, GiDonut, GiNoodles, GiSushis, GiTacos, GiPopcorn, GiBeerStein } from 'react-icons/gi';
import { motion, AnimatePresence } from 'motion/react';

// Types
interface FoodItem {
  id: string;
  name: string;
  cooldownDays: number;
  lastConsumed: number | null; // timestamp
  icon: string;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  'MdLocalPizza': <MdLocalPizza size={24} />,
  'FaPizzaSlice': <FaPizzaSlice size={24} />,
  'FaBurger': <FaBurger size={24} />,
  'MdOutlineLunchDining': <MdOutlineLunchDining size={24} />,
  'MdIcecream': <MdIcecream size={24} />,
  'MdCake': <MdCake size={24} />,
  'GiCupcake': <GiCupcake size={24} />,
  'GiDonut': <GiDonut size={24} />,
  'FaCookie': <FaCookie size={24} />,
  'MdOutlineBakeryDining': <MdOutlineBakeryDining size={24} />,
  'MdCoffee': <MdCoffee size={24} />,
  'MdOutlineLocalBar': <MdOutlineLocalBar size={24} />,
  'GiBeerStein': <GiBeerStein size={24} />,
  'FaHotdog': <FaHotdog size={24} />,
  'GiTacos': <GiTacos size={24} />,
  'GiSushis': <GiSushis size={24} />,
  'FaFish': <FaFish size={24} />,
  'GiNoodles': <GiNoodles size={24} />,
  'FaBowlFood': <FaBowlFood size={24} />,
  'MdOutlineDinnerDining': <MdOutlineDinnerDining size={24} />,
  'GiPopcorn': <GiPopcorn size={24} />,
  'FaAppleWhole': <FaAppleWhole size={24} />,
  'MdRestaurant': <MdRestaurant size={24} />,
  'MdFastfood': <MdFastfood size={24} />,
};

const INITIAL_FOODS: FoodItem[] = [
  { id: '1', name: 'Pizza', cooldownDays: 7, lastConsumed: null, icon: 'MdLocalPizza' },
  { id: '2', name: 'Hamburguer', cooldownDays: 3, lastConsumed: null, icon: 'FaBurger' },
  { id: '3', name: 'Sorvete', cooldownDays: 2, lastConsumed: null, icon: 'MdIcecream' },
  { id: '4', name: 'Brigadeiro', cooldownDays: 1, lastConsumed: null, icon: 'MdCake' },
  { id: '5', name: 'Pastel', cooldownDays: 4, lastConsumed: null, icon: 'MdFastfood' },
];

export default function App() {
  const [foods, setFoods] = useState<FoodItem[]>(() => {
    const saved = localStorage.getItem('food_cooldown_data');
    return saved ? JSON.parse(saved) : INITIAL_FOODS;
  });
  const [isAdding, setIsAdding] = useState(false);
  const [newFood, setNewFood] = useState({ name: '', cooldown: 7, icon: 'MdRestaurant' });

  useEffect(() => {
    localStorage.setItem('food_cooldown_data', JSON.stringify(foods));
  }, [foods]);

  const handleConsume = (id: string) => {
    setFoods(prev => prev.map(food => 
      food.id === id ? { ...food, lastConsumed: Date.now() } : food
    ));
  };

  const handleDelete = (id: string) => {
    setFoods(prev => prev.filter(food => food.id !== id));
  };

  const handleAddFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFood.name.trim()) return;
    
    const item: FoodItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: newFood.name,
      cooldownDays: newFood.cooldown,
      lastConsumed: null,
      icon: newFood.icon
    };
    
    setFoods(prev => [...prev, item]);
    setNewFood({ name: '', cooldown: 7, icon: 'MdRestaurant' });
    setIsAdding(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-4 md:p-8 selection:bg-indigo-500/30">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center glow-accent">
              <Timer className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">FoodCooldown</h1>
              <p className="text-zinc-500 text-sm font-medium">Controle o tempo entre seus prazeres.</p>
            </div>
          </div>
          
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 transition-all rounded-xl font-semibold shadow-lg shadow-indigo-500/20 group"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            Adicionar Alimento
          </button>
        </header>

        {/* Stats / Quick Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <StatCard 
            label="Total Alimentos" 
            value={foods.length} 
            icon={<MdRestaurant size={16} />} 
          />
          <StatCard 
            label="Em Cooldown" 
            value={foods.filter(f => isCurrentlyInCooldown(f)).length} 
            icon={<Clock className="w-4 h-4" />} 
          />
          <StatCard 
            label="Disponíveis" 
            value={foods.filter(f => !isCurrentlyInCooldown(f)).length} 
            icon={<CheckCircle2 className="w-4 h-4" />} 
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {foods.map((food) => (
              <FoodCard 
                key={food.id} 
                food={food} 
                onConsume={() => handleConsume(food.id)}
                onDelete={() => handleDelete(food.id)}
              />
            ))}
          </AnimatePresence>
        </div>

        {foods.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-600">
            <AlertCircle className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-lg font-medium">Nenhum alimento cadastrado.</p>
            <p className="text-sm">Clique em "Adicionar Alimento" para começar.</p>
          </div>
        )}
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdding(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-[#141417] border border-zinc-800 rounded-3xl p-8 shadow-2xl"
            >
              <h2 className="text-2xl font-bold mb-6">Novo Alimento</h2>
              <form onSubmit={handleAddFood} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Nome do Alimento</label>
                  <input 
                    autoFocus
                    type="text" 
                    value={newFood.name}
                    onChange={e => setNewFood(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    placeholder="Ex: Sushi, Lasanha..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Dias de Cooldown ({newFood.cooldown} dias)</label>
                  <input 
                    type="range" 
                    min="1" 
                    max="30" 
                    value={newFood.cooldown}
                    onChange={e => setNewFood(prev => ({ ...prev, cooldown: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-600 mt-2 font-mono">
                    <span>1 DIA</span>
                    <span>15 DIAS</span>
                    <span>30 DIAS</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-3">Escolha um Ícone</label>
                  <div className="grid grid-cols-6 gap-2 max-h-40 overflow-y-auto p-2 bg-zinc-900 rounded-xl border border-zinc-800 custom-scrollbar">
                    {Object.entries(ICON_MAP).map(([key, icon]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setNewFood(prev => ({ ...prev, icon: key }))}
                        className={`flex items-center justify-center p-3 rounded-lg transition-all ${newFood.icon === key ? 'bg-indigo-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="flex-1 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 transition-colors rounded-xl font-semibold border border-zinc-800"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 transition-colors rounded-xl font-semibold"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string, value: number, icon: React.ReactNode }) {
  return (
    <div className="bg-[#141417] border border-zinc-800/50 p-5 rounded-2xl flex items-center justify-between">
      <div>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-400 border border-zinc-800">
        {icon}
      </div>
    </div>
  );
}

interface FoodCardProps {
  food: FoodItem;
  onConsume: () => void;
  onDelete: () => void;
  key?: React.Key;
}

function FoodCard({ food, onConsume, onDelete }: FoodCardProps) {
  const nextDate = useMemo(() => {
    if (!food.lastConsumed) return null;
    const date = new Date(food.lastConsumed);
    date.setDate(date.getDate() + food.cooldownDays);
    return date;
  }, [food.lastConsumed, food.cooldownDays]);

  const isInCooldown = useMemo(() => {
    if (!nextDate) return false;
    return nextDate.getTime() > Date.now();
  }, [nextDate]);

  const progress = useMemo(() => {
    if (!food.lastConsumed || !nextDate) return 0;
    const total = food.cooldownDays * 24 * 60 * 60 * 1000;
    const elapsed = Date.now() - food.lastConsumed;
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  }, [food.lastConsumed, nextDate, food.cooldownDays]);

  const timeLeft = useMemo(() => {
    if (!nextDate || !isInCooldown) return null;
    const diff = nextDate.getTime() - Date.now();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h restantes`;
    return `${hours}h restantes`;
  }, [nextDate, isInCooldown]);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`relative group bg-[#141417] border ${isInCooldown ? 'border-zinc-800/50' : 'border-indigo-500/30'} p-6 rounded-3xl transition-all duration-300 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isInCooldown ? 'bg-zinc-900 text-zinc-500' : 'bg-indigo-600/10 text-indigo-500'}`}>
          {ICON_MAP[food.icon] || <MdRestaurant size={24} />}
        </div>
        <button 
          onClick={onDelete}
          className="p-2 text-zinc-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold mb-1">{food.name}</h3>
        <div className="flex items-center gap-2 text-zinc-500 text-xs font-medium">
          <History className="w-3 h-3" />
          <span>Cooldown: {food.cooldownDays} dias</span>
        </div>
      </div>

      <div className="space-y-4">
        {isInCooldown ? (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                <span>Progresso</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-indigo-500"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
              <Calendar className="w-4 h-4 text-indigo-500" />
              <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">Próxima data</p>
                <p className="text-sm font-semibold">{nextDate?.toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
            
            <button 
              disabled
              className="w-full py-3 bg-zinc-900 text-zinc-600 rounded-xl font-bold text-sm cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Clock className="w-4 h-4" />
              {timeLeft}
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">Status</p>
                <p className="text-sm font-semibold text-emerald-500">Disponível agora!</p>
              </div>
            </div>
            
            <button 
              onClick={onConsume}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 group/btn"
            >
              Consumir Agora
              <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}

function isCurrentlyInCooldown(food: FoodItem) {
  if (!food.lastConsumed) return false;
  const nextDate = new Date(food.lastConsumed);
  nextDate.setDate(nextDate.getDate() + food.cooldownDays);
  return nextDate.getTime() > Date.now();
}

