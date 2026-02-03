import { useState } from 'react';
import { School, GraduationCap, Users } from 'lucide-react';
import { SchoolsTab } from './SchoolsTab';
import { TeachersTab } from './TeachersTab';
import { ClassesTab } from './ClassesTab';


type Tab = 'schools' | 'teachers' | 'classes';

export const ManagementView = () => {
    const [activeTab, setActiveTab] = useState<Tab>('schools');

    return (
        <div className="animate-in fade-in duration-700 space-y-8 pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        Gestão <span className="text-primary italic">Administrativa</span>
                    </h1>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium flex items-center gap-2">
                            <div className="size-2 bg-primary rounded-full animate-pulse" />
                            Infraestrutura Ativa: 4 Unidades
                        </p>
                        <span className="hidden sm:block text-slate-200 dark:text-slate-700">|</span>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Sincronizado via Supabase</p>
                    </div>
                </div>
            </div>

            {/* Tabs Premium */}
            <div className="bg-white dark:bg-slate-800 p-2 rounded-3xl border-[1.5px] border-slate-100 dark:border-slate-700 shadow-sm inline-flex flex-wrap gap-2">
                {[
                    { id: 'schools', icon: School, label: 'Escolas' },
                    { id: 'teachers', icon: GraduationCap, label: 'Professores' },
                    { id: 'classes', icon: Users, label: 'Turmas' },
                ].map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as Tab)}
                            className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 ${isActive
                                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-primary'
                                }`}
                        >
                            <tab.icon size={18} strokeWidth={isActive ? 3 : 2} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Content Area - No overflow-hidden to prevent cutting */}
            <div className="bg-white dark:bg-slate-800 rounded-[3rem] border border-slate-100 dark:border-slate-700/50 shadow-sm min-h-[600px] overflow-hidden">
                <div className="p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="mb-10">
                        <h2 className="text-xl font-black text-slate-900 dark:text-white capitalize">
                            {activeTab === 'schools' ? 'Lista de Escolas' : activeTab === 'teachers' ? 'Corpo Docente' : 'Turmas Ativas'}
                        </h2>
                        <p className="text-xs text-slate-400 font-medium mt-1">Gerencie as informações detalhadas de {activeTab === 'schools' ? 'suas unidades parceiras' : activeTab === 'teachers' ? 'seus colaboradores' : 'suas turmas cadastradas'}.</p>
                    </div>
                    {activeTab === 'schools' && <SchoolsTab />}
                    {activeTab === 'teachers' && <TeachersTab />}
                    {activeTab === 'classes' && <ClassesTab />}
                </div>
            </div>
        </div>
    );
};
