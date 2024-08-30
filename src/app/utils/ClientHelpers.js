export const getCookie = (name) => {
    if (typeof window !== 'undefined') {
      const value = `; ${document?.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }
    return null;
};

  export const setCookie = (name, value, days) => {
    if (typeof window !== 'undefined') {
      let expires = '';
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = `; expires=${date.toUTCString()}`;
      }
      document.cookie = `${name}=${value || ''}${expires}; path=/; Secure; SameSite=Strict`;
    }
  };
  
  export const deleteCookie = (name) => {
    if (typeof window !== 'undefined') {
      document.cookie = `${name}=; Max-Age=-99999999; path=/;`;
    }
  };