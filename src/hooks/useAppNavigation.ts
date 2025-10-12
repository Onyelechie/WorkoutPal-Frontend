import { useNavigate } from 'react-router';

/* Hook for navigating to different pages */
export function useAppNavigation() {
  const navigate = useNavigate();

  return {
    goHome: () => navigate('/landing')
  , Profile: () => navigate('/profile')
  , Login: () => navigate('/login')

  };
};