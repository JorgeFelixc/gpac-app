const api = (uri: string) => (endpoint: string) => {
  return {
    get: async () => {
      try {
        const res = await fetch(uri+endpoint, {
          headers: {
            'Authorization': localStorage.getItem('token') || ''
          }
        });
        const data = await res.json();
        return data;
      } catch (error) {
        return error;
      }
    },
    getBase64: async () => {
      try {
        const res = await fetch(uri+endpoint, {
          headers: {
            'Authorization': localStorage.getItem('token') || ''
          }
        });
        const data = await res.text();
        return data;
      } catch (error) {
        return error;
      }
    },
    post: async <T>(body: T) => {
      try {
        const res = await fetch(uri+endpoint, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token') || ''
          }
        });
        const data = await res.json();
        return data;
      } catch (error) {
        return error;
      }
      
    },
    put: async <T>(data: T) => {
      try{
        return fetch(uri+endpoint, {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token') || ''
          }
        });
      } catch (error) {
        return error;
      }
    },
    delete: async<T>() => { 
      try{
        return fetch(uri+endpoint, { 
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token') || ''
          }
        });
      }
      catch(error){
        return error
      }
    }
  }
}
// export default api('http://localhost:1337/');
// export default api('http://192.168.1.61:1337/');
export default api('https://askjxguaknff8kf.imcaiap.org.mx/');
