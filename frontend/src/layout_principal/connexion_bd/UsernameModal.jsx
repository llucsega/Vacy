// UsernameModal.jsx
export default function UsernameModal({ profile, onComplete }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    // Aquí anirà la lògica per fer l'UPDATE a Supabase
    // posant is_setup = true
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#f5f0e8] rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative border-4 border-[#6b4f3a]">
        
        {/* Títol i Input central */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#6b4f3a] mb-4 font-serif">¡Bienvenido a Vacy!</h2>
          <input 
            type="text" 
            placeholder="@tu_usuario"
            className="w-full p-4 rounded-xl border-2 border-[#6b4f3a] text-xl outline-none focus:ring-2 ring-[#a67c52]"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, ""))}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        {/* Les dues mascotes Vacy (Contenidors) */}
        <div className="flex justify-between items-end mt-12 gap-4">
          
          {/* Vacy Esquerra - L'explicació tècnica */}
          <div className="flex-1 flex flex-col items-center">
            <div className="bg-white p-3 rounded-2xl shadow-sm mb-2 text-sm border border-[#6b4f3a]">
              "Es tu identificador único en la comunidad, como tu DNI de chef."
            </div>
            <div className="w-24 h-24 bg-[#a67c52] rounded-full flex items-center justify-center text-white">
              🥑 {/* Aquí aniria la teva mascota asseguda */}
            </div>
          </div>

          {/* Botó de confirmar al mig */}
          <button 
            onClick={handleSubmit}
            className="bg-[#6b4f3a] text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform"
          >
            ¡LISTO!
          </button>

          {/* Vacy Dreta - Les regles */}
          <div className="flex-1 flex flex-col items-center text-right">
            <div className="bg-white p-3 rounded-2xl shadow-sm mb-2 text-sm border border-[#6b4f3a]">
              "Escribe tu nombre de usuario, recuerda: todo junto, sin caracteres especiales y en minúsculas."
            </div>
            <div className="w-24 h-24 bg-[#a67c52] rounded-full flex items-center justify-center text-white">
              🗿 {/* Aquí aniria la teva mascota amb la bafarada */}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}