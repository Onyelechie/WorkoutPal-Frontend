import { useNavigate } from 'react-router';

/* Hook for navigating to different pages */
export function useAppNavigation() {
  const navigate = useNavigate();

  return {
    navHome: () => navigate('/home'), 
    navProfile: () => navigate('/profile'),
    navLogin: () => navigate('/login'),
    navRoutine: () => navigate('/routine')
  };
};