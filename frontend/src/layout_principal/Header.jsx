import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './connexion_bd/supabaseClient.js';

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    
    <header className="relative z-40 w-full px-6 pt-6 pb-2 flex items-center gap-3">
      
      {/* 1. LOGO VACY */}
      <div 
        className="text-3xl font-bold text-[#834b13]" 
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        VACY
      </div>

      {/* 2. BUSCADOR */}
      <Link 
        to="/buscar" 
        className="flex-1 relative -right-2 cursor-pointer active:scale-[0.97] transition-all duration-200"
      >
        <input 
          type="text" 
          placeholder="Buscar..." 
          readOnly 
          className="w-full bg-[#dabda0]/60 shadow-inner border-none rounded-full py-1.5 px-4 text-sm focus:outline-none placeholder-[#4b3621]/40 text-[#4b3621] cursor-pointer"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </Link>

      {/* 3. ACCIÓ DRETA */}
      <div className="flex items-center justify-end min-w-16.25">
        {user ? (
          <div 
            className="w-11 h-11 rounded-full mr-0.5 bg-[#834b13]/20 border-2 border-[#834b13]/30 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform overflow-hidden shadow-sm"
            onClick={async () => {
              await supabase.auth.signOut();
            }}
          >
            {/* Verifiquem la URL de la imatge de Google */}
            {user.user_metadata?.avatar_url || user.user_metadata?.picture ? (
              <img 
                src={user.user_metadata.avatar_url || user.user_metadata.picture} 
                alt="Avatar" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Si la imatge falla, posem una inicial
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `<span class="text-[#834b13] font-bold text-xs">${user.user_metadata?.full_name?.charAt(0) || "U"}</span>`;
                }}
              />
            ) : (
              <span className="text-[#834b13] font-bold text-xs">
                {user.user_metadata?.full_name?.charAt(0) || "U"}
              </span>
            )}
          </div>
        ) : (
          <button 
            className="text-[#4b3621] font-semibold text-sm hover:opacity-70 transition-opacity whitespace-nowrap"
            onClick={async () => {
              await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: { redirectTo: window.location.origin }
              });
            }}
          >
            Acceder
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;