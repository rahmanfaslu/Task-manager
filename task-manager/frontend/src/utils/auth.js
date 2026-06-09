
export const setToken = (token) => {
  document.cookie = `token=${token}; path=/; max-age=604800; SameSite=Lax`;
};
 
export const getToken = () => {
  const name = 'token=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};
 
export const removeToken = () => {
  document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax';
};
  
export const setUserName = (name) => {
  sessionStorage.setItem('userName', name);
};
 
export const getUserName = () => {
  return sessionStorage.getItem('userName') || '';
}; 
export const removeUserName = () => {
  sessionStorage.removeItem('userName');
};
