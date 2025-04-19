export const getAccessToken = () => {
  return localStorage.getItem(import.meta.env.VITE_ACCESS_TOKEN_KEY);
};

export const removeAccessToken = () => {
  localStorage.removeItem(import.meta.env.VITE_ACCESS_TOKEN_KEY);
};

export const onLogout = () => {
  localStorage.removeItem(import.meta.env.VITE_ACCESS_TOKEN_KEY);

  window.location.href = "/login";
};

const onLogin = ({ token }: { token: string }) => {
  localStorage.setItem(import.meta.env.VITE_ACCESS_TOKEN_KEY, token);

  window.location.href = "/";
};

const useAuth = () => {
  return {
    isAuthenticated: !!getAccessToken(),
    onLogout,
    onLogin,
  };
};

export default useAuth;
