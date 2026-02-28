import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../servicios/supabaseClient.js';
import triaUsernameImg from '../../assets/username_vacy.png';

import { validateUsername } from '../../compartido/utilidades/validarUsuario.js';

export default function UsernameModal({ profile, onComplete }) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalHeight = document.body.style.height;
    
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';

    const preventDefault = (e) => e.preventDefault();
    document.addEventListener('touchmove', preventDefault, { passive: false });

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.height = originalHeight;
      document.removeEventListener('touchmove', preventDefault);
    };
  }, []);

  const handleFinish = async () => {
    // 1. BLINDATGE DE SEGURETAT
    if (!profile?.id) {
      setError("Error de sesión. Inténtalo de nuevo.");
      return;
    }

    const { isValid, message } = validateUsername(username);
    if (!isValid) {
      setError(message);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data, error: updateError } = await supabase
        .from('profiles')
        .update({ 
          username: username, 
          is_setup: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', profile.id)
        .select()
        .single();

      if (updateError) {
        if (updateError.code === '23505') {
          setError("Nombre de usuario en uso. Prueba con otro.");
        } else {
          setError("Hubo un error. Inténtalo de nuevo.");
        }
      } else if (data) {
        onComplete(username); 
        navigate('/'); 
      }
    } catch (err) {
      setError("Error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 backdrop-brightness-50 flex items-center justify-center z-9999 overflow-hidden touch-none">
      <div className="relative w-full h-full flex items-center justify-center p-6 -translate-y-30">
        
        <img 
          src={triaUsernameImg} 
          alt="Escena Vacy"
          className="absolute w-full h-auto max-h-[85%] object-contain pointer-events-none" 
        />

        <div className="absolute top-[61%] left-1/2 transform -translate-x-1/2 flex items-center h-18 w-full max-w-[320px] bg-[#3a2d22] p-2 rounded-[30px_15px_40px_20px] border-b-12 border-[#251c15] overflow-hidden shadow-lg"
          style={{
            backgroundColor: '#3a2d22',
            backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(0deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 4px'
          }}
        >
          <div className={`translate-y-0.75 translate-x-0.75 grow bg-[#f5f0e8] rounded-xl flex items-center px-4 py-2 shadow-[inset_0_4px_8px_rgba(0,0,0,0.5)] transition-all duration-300 ${error ? 'ring-4 ring-red-500/50' : ''}`}>
            <input 
              type="text" 
              placeholder="nombre_de_usuario"
              className="w-full bg-transparent text-[#3a2d22] font-black text-xl outline-none placeholder:text-[#3a2d22]/20"
              value={username}
              onChange={(e) => {
                setError(""); 
                const filteredValue = e.target.value
                  .toLowerCase()
                  .replace(/[^a-z0-9_]/g, "");
                setUsername(filteredValue);
              }}
            />
          </div>

          <button 
            onClick={handleFinish}
            disabled={loading}
            className="px-5 text-[#f5f0e8] font-black text-3xl hover:scale-110 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? "..." : ">"}
          </button>
        </div>

        {error && (
          <div className="absolute top-[72%] bg-red-800 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}