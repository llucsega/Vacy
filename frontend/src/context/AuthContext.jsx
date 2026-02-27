import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from "../layout_principal/connexion_bd/supabaseClient.js";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Funció per buscar el perfil a la base de dades
  const fetchProfile = async (userId) => {
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 2. Comprovar si ja hi ha una sessió activa en carregar la web
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // 3. L'ÚNIC "listener" de tota l'app que escolta canvis de sessió
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // 4. Compartim tota aquesta info amb la resta de l'app
  return (
    <AuthContext.Provider value={{ session, user: session?.user, profile, loading, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

// 5. El "hook" per fer-ho servir fàcilment a qualsevol component
export const useAuth = () => useContext(AuthContext);