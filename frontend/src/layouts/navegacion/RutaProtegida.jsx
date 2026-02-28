import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../infraestructura/autenticacion/ContextoAutenticacion';

export const ProtectedRoute = () => {
  const { session, profile, loading } = useAuth();

  // 1. Si encara estem comprovant si l'usuari existeix, no fem res.
  // Això evita que l'app "parpellegi" o ens enviï a llocs equivocats per error.
  if (loading) return null;

  // 2. Si NO hi ha sessió (usuari no loguejat), el deixem passar a la Home 
  // perquè pugui veure el botó d'"Acceder" del Header.
  if (!session) {
    return <Outlet />;
  }

  // 3. LA CLAU DE L'ARQUITECTURA:
  // Si hi ha sessió però el perfil NO està configurat (is_setup: false),
  // el bloquegem i l'enviem a la ruta de la Vacy.
  if (profile && !profile.is_setup) {
    return <Navigate to="/onboarding" replace />;
  }

  // 4. Si té sessió i el perfil està OK, el deixem veure la ruta que hagi demanat.
  return <Outlet />;
};