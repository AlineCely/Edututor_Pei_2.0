import { Shield, Smartphone, LogOut } from 'lucide-react';

export const SecurityTab = () => {
    return (
        <div className="animate-in fade-in slide-in-from-left-4 duration-500 max-w-4xl space-y-12">
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight italic">Segurança da <span className="text-primary">Conta</span></h2>
                    <div className="h-px flex-1 bg-slate-100 dark:bg-slate-700" />
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2.5rem] border-[1.5px] border-transparent hover:border-primary/20 transition-all">
                    <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6 px-1">Alterar Senha de Acesso</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Senha Atual</label>
                            <input type="password" placeholder="••••••••" className="w-full bg-white dark:bg-slate-900 border-[1.5px] border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold focus:border-primary/50 transition-all outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Nova Senha</label>
                            <input type="password" placeholder="Nova senha forte" className="w-full bg-white dark:bg-slate-900 border-[1.5px] border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold focus:border-primary/50 transition-all outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Confirmar Senha</label>
                            <input type="password" placeholder="Repita a nova senha" className="w-full bg-white dark:bg-slate-900 border-[1.5px] border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold focus:border-primary/50 transition-all outline-none" />
                        </div>
                    </div>
                    <div className="flex justify-end mt-8">
                        <button className="px-10 py-4 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all">Atualizar Credenciais</button>
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight italic">Sessões e <span className="text-primary">Dispositivos</span></h2>
                    <div className="h-px flex-1 bg-slate-100 dark:bg-slate-700" />
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2.5rem] border-[1.5px] border-transparent transition-all space-y-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-5">
                            <div className="size-14 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                                <Shield size={28} />
                            </div>
                            <div>
                                <p className="font-black text-slate-900 dark:text-white">Autenticação Segura</p>
                                <p className="text-xs font-medium text-slate-500">Sua conta está protegida por criptografia de ponta a ponta.</p>
                            </div>
                        </div>
                        <button className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline px-4 py-2 bg-red-50 dark:bg-red-500/10 rounded-xl">Encerrar Todas</button>
                    </div>

                    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-between group">
                        <div className="flex items-center gap-5">
                            <div className="size-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                                <Smartphone size={24} />
                            </div>
                            <div>
                                <p className="font-black text-slate-900 dark:text-white flex items-center gap-2">
                                    ESTE DISPOSITIVO
                                    <span className="text-[8px] bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full">ATIVO</span>
                                </p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Chrome em Linux • São Paulo, Brasil</p>
                            </div>
                        </div>
                        <LogOut size={18} className="text-slate-300 pointer-events-none" />
                    </div>
                </div>
            </section>
        </div>
    );
};
