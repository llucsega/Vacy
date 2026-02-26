import { useState } from 'react';
import { supabase } from './supabaseClient.js';

export default function UsernameModal({ profile, onComplete }) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFinish = async () => {
    if (username.length < 3) {
      setError("Mínimo 3 caracteres");
      return;
    }
    setLoading(true);

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ 
        username: username, 
        is_setup: true 
      })
      .eq('id', profile.id);

    if (updateError) {
      setError("Este nombre ya existe o es inválido");
      setLoading(false);
    } else {
      onComplete(); 
    }
  };

  return (
    <div className="absolute inset-0 bg-[#3a2d22]/90 backdrop-blur-md flex items-center justify-center z-9999 p-4 rounded-[inherit]">
      <div className="bg-[#f5f0e8] rounded-[40px] p-8 max-w-[90%] w-full shadow-2xl border-4 border-[#6b4f3a] flex flex-col items-center relative overflow-hidden">
        
        {/* Títol estil Vacy */}
        <h2 className="text-3xl font-black text-[#6b4f3a] mb-6 text-center leading-tight">
          ¡CASI ESTAMOS! <br/> <span className="text-xl font-medium opacity-80">Elige tu nombre de usuario</span>
        </h2>

        {/* Input Central */}
        <div className="w-full mb-10">
          <input 
            type="text" 
            placeholder="ej: cheflucas"
            className="w-full p-5 rounded-2xl border-b-8 border-r-8 border-2 border-[#6b4f3a] text-2xl font-bold text-[#6b4f3a] outline-none bg-white placeholder:opacity-20 transition-all focus:translate-x-1 focus:translate-y-1 focus:border-b-4 focus:border-r-4"
            value={username}
            onChange={(e) => {
              setError("");
              setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""));
            }}
          />
          {error && <p className="text-red-500 font-bold mt-2 text-center">{error}</p>}
        </div>

        {/* Zona de Mascotes i Missatges */}
        <div className="flex justify-between items-end w-full gap-2 relative h-32">
          
          {/* Vacy Esquerra (L'Explicador) */}
          <div className="flex flex-col items-center w-1/3 group">
             <div className="bg-white p-2 rounded-xl text-[11px] font-bold border-2 border-[#6b4f3a] mb-2 shadow-sm animate-bounce">
               "Es como tu DNI de chef"
             </div>
             <div className="text-6xl drop-shadow-md cursor-pointer transition-transform hover:scale-110">🥑</div>
          </div>

          {/* Botó "Listo" al mig */}
          <div className="flex flex-col items-center mb-4">
            <button 
                onClick={handleFinish}
                disabled={loading || !username}
                className="bg-[#6b4f3a] text-[#f5f0e8] px-8 py-4 rounded-2xl font-black text-xl border-b-4 border-[#3a2d22] active:translate-y-1 active:border-b-0 disabled:opacity-30 disabled:grayscale transition-all"
            >
                {loading ? "GUARDANDO..." : "¡LISTO!"}
            </button>
          </div>

          {/* Vacy Dreta (El de les regles) */}
          <div className="flex flex-col items-center w-1/3">
             <div className="bg-white p-2 rounded-xl text-[11px] font-bold border-2 border-[#6b4f3a] mb-2 shadow-sm leading-tight text-center">
               "Minúsculas y todo junto"
             </div>
             <div className="text-6xl drop-shadow-md cursor-pointer transition-transform hover:rotate-12">🗿</div>
          </div>
        </div>

      </div>
    </div>
  );
}