export const dateFormat=(date:Date|number)=> {
    const dataNow =new Intl.DateTimeFormat('pt-BR', { 
        weekday: 'long', day: '2-digit', month: 'long'
    }).format(date);
    return dataNow.charAt(0).toUpperCase() + dataNow.slice(1)
    }