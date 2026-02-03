import { useState } from 'react';
import { Search, Plus, Filter, Users, MoreHorizontal, Eye, Edit3, Trash2, CheckCircle2, XCircle, ArrowUpDown } from 'lucide-react';
import { StudentRegistrationWizard } from './StudentRegistrationWizard';
import { StudentDetailView } from './StudentDetailView';

interface Student {
    id: string;
    nome: string;
    escola: string;
    status: 'Ativo' | 'Inativo';
    responsavel: string;
    foto?: string;
    cid?: string;
    serie: string;
    dataNascimento: string;
    genero: string;
    dataCadastro: string;
}

const MOCK_STUDENTS: Student[] = [
    {
        id: '1',
        nome: 'Aline Cely Araujo da Silva',
        escola: 'Escola Municipal Paulo Freire',
        status: 'Ativo',
        responsavel: 'Maria Araujo',
        serie: '3º Ano',
        cid: 'F84.0',
        dataNascimento: '15/05/2016',
        genero: 'Feminino',
        dataCadastro: '20/01/2026'
    },
    {
        id: '2',
        nome: 'Lucas Gabriel Souza',
        escola: 'Colégio Estadual Santos Dumont',
        status: 'Inativo',
        responsavel: 'João Souza',
        serie: '5º Ano',
        cid: 'F90.0',
        dataNascimento: '10/08/2014',
        genero: 'Masculino',
        dataCadastro: '15/01/2026'
    }
];

export const StudentsView = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    if (isRegistering) {
        return (
            <StudentRegistrationWizard
                onCancel={() => setIsRegistering(false)}
                onComplete={() => setIsRegistering(false)}
            />
        );
    }

    if (selectedStudent) {
        return <StudentDetailView student={selectedStudent} onBack={() => setSelectedStudent(null)} />;
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8 pb-12">
            <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        Gestão de <span className="text-primary italic">Alunos</span>
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest rounded-lg border border-primary/10">
                            <Users size={12} strokeWidth={3} />
                            {MOCK_STUDENTS.length} Registros
                        </span>
                        <p className="text-slate-400 text-xs font-medium italic">Base de dados sincronizada em tempo real</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full xl:w-auto">
                    <button className="flex-1 xl:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-xs font-black text-slate-600 dark:text-slate-300 hover:border-primary transition-all uppercase tracking-widest shadow-sm">
                        Relatórios PDF
                    </button>
                    <button
                        onClick={() => setIsRegistering(true)}
                        className="flex-1 xl:flex-none flex items-center justify-center gap-3 px-8 py-3.5 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] group"
                    >
                        <Plus size={20} strokeWidth={3} className="group-hover:rotate-90 transition-transform" />
                        Matricular Novo
                    </button>
                </div>
            </header>

            <div className="bg-white dark:bg-slate-800/80 p-6 md:p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700/50 shadow-sm backdrop-blur-sm">
                <div className="flex flex-col lg:flex-row gap-6 items-end">
                    <div className="flex-1 w-full relative group">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Filtro de busca inteligente</label>
                        <Search className="absolute left-4 top-[46px] text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Pesquisar por nome, responsável ou diagnóstico..."
                            className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold dark:text-white transition-all outline-none"
                        />
                    </div>

                    <div className="w-full lg:w-72">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Estado Civil Escolar</label>
                        <div className="flex bg-slate-50 dark:bg-slate-900/50 p-1 rounded-2xl border-2 border-transparent">
                            {['Todos', 'Ativo', 'Inativo'].map((st) => (
                                <button key={st} className="flex-1 py-2 px-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:text-primary data-[active=true]:bg-white dark:data-[active=true]:bg-slate-800 data-[active=true]:text-primary data-[active=true]:shadow-sm">
                                    {st}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button className="h-[52px] px-6 bg-slate-100 dark:bg-slate-900 rounded-2xl text-slate-500 font-bold flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-850 transition-all border-2 border-transparent">
                        <Filter size={18} />
                        Filtros Avançados
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-[3rem] border border-slate-100 dark:border-slate-700/50 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-900/80 border-b border-slate-100 dark:border-slate-800 text-left">
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                                        Aluno / Identificação <ArrowUpDown size={12} />
                                    </div>
                                </th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Instituição</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Responsável</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status / CID</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ação</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                            {MOCK_STUDENTS.map((student) => (
                                <tr key={student.id} className="group hover:bg-slate-50/40 dark:hover:bg-white/[0.01] transition-all cursor-pointer" onClick={() => setSelectedStudent(student)}>
                                    <td className="px-8 py-7">
                                        <div className="flex items-center gap-5">
                                            <div className="size-14 rounded-2xl bg-primary text-white font-black text-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform relative overflow-hidden">
                                                {student.foto ? <img src={student.foto} alt={student.nome} className="size-full object-cover" /> : student.nome.charAt(0)}
                                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors text-base leading-tight mb-1">{student.nome}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                                                    <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700/50 rounded text-slate-500">{student.serie}</span>
                                                    • Cadastrado em {student.dataCadastro}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-7">
                                        <div className="max-w-[200px]">
                                            <p className="text-sm font-bold text-slate-600 dark:text-slate-400 line-clamp-1 group-hover:text-slate-900 transition-colors">{student.escola}</p>
                                            <p className="text-[10px] text-slate-400 font-medium">Rede Municipal</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-7">
                                        <p className="text-sm font-bold text-slate-900 dark:text-slate-300">{student.responsavel}</p>
                                        <p className="text-[10px] text-slate-400 font-medium italic">Matriz Parental</p>
                                    </td>
                                    <td className="px-8 py-7">
                                        <div className="flex flex-col gap-2">
                                            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest w-fit ${student.status === 'Ativo' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-400 border border-slate-100'
                                                }`}>
                                                <div className={`size-1.5 rounded-full ${student.status === 'Ativo' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                                                {student.status}
                                            </span>
                                            {student.cid && (
                                                <span className="text-[10px] font-black text-primary px-2 py-0.5 bg-primary/5 rounded border border-primary/10 w-fit">
                                                    CID: {student.cid}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-7 text-right">
                                        <div className="flex items-center justify-end gap-2.5 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                            <button className="p-3 bg-white dark:bg-slate-700 shadow-sm text-slate-400 hover:text-primary rounded-xl border border-slate-100 dark:border-slate-600 transition-all hover:scale-110"><Edit3 size={16} /></button>
                                            <button className="p-3 bg-white dark:bg-slate-700 shadow-sm text-slate-400 hover:text-red-500 rounded-xl border border-slate-100 dark:border-slate-600 transition-all hover:scale-110"><Trash2 size={16} /></button>
                                            <button
                                                className="px-6 py-3 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-secondary transition-all shadow-lg shadow-primary/20 active:scale-95 ml-2"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedStudent(student);
                                                }}
                                            >
                                                Prontuário
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
