import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from "../../servicios/supabaseClient.js";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  
  // MILLORA: Separem els tipus de càrrega
  const [initialized, setInitialized] = useState(false); // S'ha comprovat la sessió inicial?
  const [profileLoading, setProfileLoading] = useState(false); // S'estan descarregant les dades del perfil?

  const fetchProfile = async (userId) => {
    setProfileLoading(true); // Comença la càrrega específica del perfil
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      setProfile(data);
    } catch (err) {
      console.error("Error carregant el perfil:", err);
      setProfile(null); // <--- MILLORA DEL JEFE: Si falla, ens assegurem que el perfil estigui buit
    } finally {
      setProfileLoading(false); // Acaba la càrrega del perfil
      setInitialized(true);     // Un cop tenim el perfil (o l'error), l'app ja està inicialitzada
    }
  };

  useEffect(() => {
    // Comprovar sessió inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchProfile(session.user.id);
      } else {
        setInitialized(true); // Si no hi ha sessió, l'app ja està llesta
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        // EL DETALL PRO: Reiniciem initialized a false mentre busquem el nou perfil
        setInitialized(false); 
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setInitialized(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Compartim tota aquesta info amb la resta de l'app
  return (
    <AuthContext.Provider value={{ 
      session, 
      user: session?.user, 
      profile, 
      loading: !initialized, // "loading" ara només és TRUE fins que l'app arrenca del tot
      profileLoading,        // Per si vols posar un spinner petit a la web sense bloquejar-ho tot
      setProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// El "hook" per fer-ho servir fàcilment a qualsevol component
export const useAuth = () => useContext(AuthContext);