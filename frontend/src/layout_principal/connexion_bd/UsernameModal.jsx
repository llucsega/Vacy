import { useState } from 'react';
import { supabase } from './supabaseClient.js';
import triaUsernameImg from '../../assets/username_vacy.png';

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
    <div className="absolute inset-0 backdrop-brightness-75 flex items-center justify-center z-9999 rounded-[inherit] overflow-hidden">
      
      <div className="relative w-full h-full flex items-center justify-center p-6">
        
        <img 
          src={triaUsernameImg} 
          alt="Escena Vacy"
          className="absolute w-full h-auto max-h-[85%] object-contain pointer-events-none" 
        />

        {/* LA CAPSA DE FUSTA "VACY STYLE" */}
        <div className="absolute top-[61%] left-1/2 transform -translate-x-1/2 flex items-center h-18 w-full max-w-[320px] bg-[#3a2d22] p-2 rounded-[30px_15px_40px_20px] border-b-12 border-[#251c15] overflow-hidden shadow-lg"
          style={{
            backgroundColor: '#3a2d22',
            backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(0deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 4px'
          }}
        >
    
          {/* Zona d'escriptura (Fusta clara) */}
          <div className="translate-y-0.75 translate-x-0.75 grow bg-[#f5f0e8] rounded-xl flex items-center px-4 py-2 shadow-[inset_0_4px_8px_rgba(0,0,0,0.5)]">
            <input 
              type="text" 
              placeholder="nombre_de_usuario"
              className="w-full bg-transparent text-[#3a2d22] font-black text-xl outline-none placeholder:text-[#3a2d22]/20"
              value={username}
              onChange={(e) => {
                setError(""); // Neteja l'error quan l'usuari torna a escriure
                // Regex: Converteix a minúscules i elimina tot el que no sigui lletra a-z, número 0-9 o _
                const filteredValue = e.target.value
                  .toLowerCase()
                  .replace(/[^a-z0-9_]/g, "");
                setUsername(filteredValue);
              }}
            />
          </div>

          {/* El botó ">" (Integrat a la fusta fosca) */}
          <button 
            onClick={handleFinish}
            disabled={loading}
            className="px-5 text-[#f5f0e8] font-black text-3xl hover:scale-110 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? "..." : ">"}
          </button>
        </div>
      </div>
    </div>
  );
}