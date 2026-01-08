import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ auth, proyectos }) {
    const [editandoId, setEditandoId] = useState(null);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        titulo: '',
        tecnologias: '',
        descripcion: '',
        imagen_url: '',
        link_proyecto: '', 
        link_github: '',   
    });

    const enviar = (e) => {
        e.preventDefault();
        if (editandoId) {
            put(route('proyectos.update', editandoId), {
                onSuccess: () => { 
                    cancelarEdicion();
                    alert('Proyecto actualizado correctamente');
                }
            });
        } else {
            post(route('proyectos.store'), {
                onSuccess: () => {
                    reset();
                    alert('¡Proyecto publicado con éxito!');
                }
            });
        }
    };

    const cargarProyecto = (p) => {
        setEditandoId(p.id);
        setData({
            titulo: p.titulo,
            tecnologias: p.tecnologias,
            descripcion: p.descripcion,
            imagen_url: p.imagen_url || '',
            link_proyecto: p.link_proyecto || '',
            link_github: p.link_github || '',
        });
    };

    const cancelarEdicion = () => {
        setEditandoId(null);
        reset();
    };

    const eliminarProyecto = (id) => {
        if (confirm('¿Estás seguro de eliminar este proyecto?')) {
            router.delete(route('proyectos.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-black text-xl text-white italic uppercase tracking-widest italic">Panel de Administración</h2>}
        >
            <Head title="Admin - Mis Proyectos" />

            <div className="py-12 bg-[#050508] min-h-screen text-white">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
                    
                    {/* FORMULARIO DINÁMICO */}
                    <div className={`p-8 rounded-[3rem] shadow-2xl h-fit border transition-all duration-500 ${editandoId ? 'bg-zinc-900 border-yellow-500/50' : 'bg-[#0f111a] border-white/5'}`}>
                        <div className="mb-8">
                            <h2 className="text-2xl font-black italic uppercase">{editandoId ? '⚡ Editando Proyecto' : '🚀 Publicar Proyecto'}</h2>
                            <p className="text-zinc-500 text-xs italic">
                                {editandoId ? 'Modificando un registro existente.' : 'Agrega un nuevo trabajo a tu galería.'}
                            </p>
                        </div>

                        <form onSubmit={enviar} className="space-y-4">
                            <input type="text" placeholder="Título" className="w-full bg-black/40 border-white/10 rounded-2xl text-sm"
                                value={data.titulo} onChange={e => setData('titulo', e.target.value)} />
                            
                            <input type="text" placeholder="Tecnologías" className="w-full bg-black/40 border-white/10 rounded-2xl text-sm"
                                value={data.tecnologias} onChange={e => setData('tecnologias', e.target.value)} />

                            <input type="text" placeholder="URL Imagen" className="w-full bg-black/40 border-white/10 rounded-2xl text-sm"
                                value={data.imagen_url} onChange={e => setData('imagen_url', e.target.value)} />

                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="GitHub URL" className="w-full bg-black/40 border-white/10 rounded-2xl text-sm"
                                    value={data.link_github} onChange={e => setData('link_github', e.target.value)} />
                                <input type="text" placeholder="Demo URL" className="w-full bg-black/40 border-white/10 rounded-2xl text-sm"
                                    value={data.link_proyecto} onChange={e => setData('link_proyecto', e.target.value)} />
                            </div>

                            <textarea placeholder="Descripción técnica..." className="w-full bg-black/40 border-white/10 rounded-2xl text-sm h-32"
                                value={data.descripcion} onChange={e => setData('descripcion', e.target.value)}></textarea>

                            <div className="flex gap-4">
                                <button disabled={processing} className={`flex-1 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${editandoId ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                                    {editandoId ? 'Guardar Cambios' : 'Publicar Ahora'}
                                </button>
                                {editandoId && (
                                    <button type="button" onClick={cancelarEdicion} className="bg-zinc-700 px-6 rounded-2xl font-black uppercase text-[10px] hover:bg-zinc-600">X</button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* LISTADO DE GESTIÓN */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-black italic uppercase text-zinc-600 tracking-tighter">Proyectos Publicados ({proyectos.length})</h2>
                        <div className="grid gap-4">
                            {proyectos.map(p => (
                                <div key={p.id} className="bg-[#0f111a] p-4 rounded-[2rem] border border-white/5 flex gap-4 items-center group hover:border-blue-500/30 transition-all">
                                    <img src={p.imagen_url} className="w-16 h-16 rounded-xl object-cover grayscale group-hover:grayscale-0" />
                                    <div className="flex-1">
                                        <h4 className="font-bold italic uppercase text-sm leading-tight">{p.titulo}</h4>
                                        <p className="text-[9px] text-blue-500 font-black uppercase">{p.tecnologias}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => cargarProyecto(p)} className="text-yellow-500 hover:text-yellow-400 text-[10px] font-black uppercase italic">Editar</button>
                                        <button onClick={() => eliminarProyecto(p.id)} className="text-red-500 hover:text-red-400 text-[10px] font-black uppercase italic">Eliminar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}