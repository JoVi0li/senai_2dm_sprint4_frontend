export const parseJwt = () =>{
    let base64 = localStorage.getItem('userToken').split('.')[1];

    return JSON.parse(window.atob(base64))
}

export const userAutenticado = () => localStorage.getItem('userToken') !== null;