import { useState } from 'react';
import { FileText, Calendar, Download, Users, Sliders, BookOpen, Home, School } from 'lucide-react';
import styles from './ReportsView.module.css';

export const ReportsView = () => {
    const [selectedStudent, setSelectedStudent] = useState('all');
    const [startDate, setStartDate] = useState('2025-07-28');
    const [endDate, setEndDate] = useState('2026-01-28');

    const handleGenerate = (reportType: string) => {
        alert(`Gerando ${reportType} para ${selectedStudent === 'all' ? 'Todos os Alunos' : 'Aluno Selecionado'}...`);
    };

    return (
        <div className="animate-in fade-in duration-700 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        Centro de <span className="text-primary italic">Relatórios</span>
                    </h1>
                    <div className="flex items-center gap-3 mt-2">
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium flex items-center gap-2">
                            <div className="size-2 bg-primary rounded-full animate-pulse" />
                            Geração de Documentos Oficiais
                        </p>
                        <span className="text-slate-200 dark:text-slate-700">|</span>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Base consolidada</p>
                    </div>
                </div>
            </div>

            {/* Configuration Panel Premium */}
            <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border-[1.5px] border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden group">
                <div className="p-8 border-b border-slate-50 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40">
                    <h2 className="text-xs font-black text-primary uppercase tracking-[0.3em] flex items-center gap-3">
                        <Sliders size={16} strokeWidth={3} />
                        Configuração de Parâmetros
                    </h2>
                </div>

                <div className="p-8 lg:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                        <div className="md:col-span-6 space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Filtro de Aluno / Amostragem</label>
                            <select
                                className="w-full bg-slate-50 dark:bg-slate-900/50 border-[1.5px] border-transparent focus:border-primary/30 rounded-2xl py-4 px-6 text-sm font-black text-slate-700 dark:text-slate-300 outline-none transition-all"
                                value={selectedStudent}
                                onChange={(e) => setSelectedStudent(e.target.value)}
                            >
                                <option value="all">📊 Relatório Consolidado (Todos os Alunos)</option>
                                <option value="student1">Arthur Silva</option>
                                <option value="student2">Beatriz Costa</option>
                                <option value="student3">Caio Mendes</option>
                            </select>
                        </div>

                        <div className="md:col-span-3 space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Data de Início</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="date"
                                    className="w-full bg-slate-50 dark:bg-slate-900/50 border-[1.5px] border-transparent focus:border-primary/30 rounded-2xl py-4 pl-12 pr-6 text-sm font-black text-slate-700 dark:text-slate-300 outline-none transition-all"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="md:col-span-3 space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Data Final</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="date"
                                    className="w-full bg-slate-50 dark:bg-slate-900/50 border-[1.5px] border-transparent focus:border-primary/30 rounded-2xl py-4 pl-12 pr-6 text-sm font-black text-slate-700 dark:text-slate-300 outline-none transition-all"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 p-6 rounded-3xl bg-primary/5 border border-primary/10 flex items-center gap-6">
                        <div className="size-16 rounded-[1.5rem] bg-white dark:bg-slate-900 flex items-center justify-center text-primary shadow-sm">
                            <Users size={28} />
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                {selectedStudent === 'all' ? 'Escopo Geral Ativado' : 'Escopo Individual Ativado'}
                            </h3>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
                                O relatório incluirá dados de assiduidade, desempenho pedagógico e evolução comportamental para {selectedStudent === 'all' ? 'toda a base de alunos' : 'o aluno selecionado'} entre {new Date(startDate).toLocaleDateString()} e {new Date(endDate).toLocaleDateString()}.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Configured Report Types Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {[
                    { title: 'Acompanhamento Diário', cat: 'Interno', desc: 'Gráficos de habilidades, comportamento-ABC e assiduidade.', icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-50' },
                    { title: 'Relatório de Evolução', cat: 'Oficial', desc: 'Resumo completo do progresso para família e convênios.', icon: FileText, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                    { title: 'Atividades Domiciliares', cat: 'Orientação', desc: 'Registro de atividades sugeridas e feedback domiciliar.', icon: Home, color: 'text-purple-500', bg: 'bg-purple-50' },
                    { title: 'Inclusão Escolar', cat: 'Escola', desc: 'Estratégias pedagógicas e adaptações para professores.', icon: School, color: 'text-amber-500', bg: 'bg-amber-50' }
                ].map((report, i) => (
                    <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border-[1.5px] border-slate-100 dark:border-slate-700 shadow-sm flex flex-col group hover:translate-y-[-8px] transition-all duration-300">
                        <div className={`size-16 rounded-2xl ${report.bg} dark:bg-slate-900 ${report.color} flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-inner`}>
                            <report.icon size={32} />
                        </div>

                        <div className="space-y-2 mb-8">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{report.cat}</span>
                            <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight group-hover:text-primary transition-colors">{report.title}</h3>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                                {report.desc}
                            </p>
                        </div>

                        <button
                            onClick={() => handleGenerate(report.title)}
                            className="mt-auto flex items-center justify-center gap-3 w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] group-hover:bg-primary group-hover:text-white transition-all shadow-xl shadow-black/5"
                        >
                            <Download size={16} strokeWidth={3} />
                            Gerar PDF
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
