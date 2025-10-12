import { useNavigate } from 'react-router-dom';

/* Hook for navigating to different pages */
export function useAppNavigation() {
  const navigate = useNavigate();

  return {
    goHome: () => navigate('/landing')
  };
};