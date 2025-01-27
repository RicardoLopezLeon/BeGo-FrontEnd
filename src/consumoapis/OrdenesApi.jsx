async function OrdenesApi(){
    try{
        const result = await fetch("https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders/upcoming")
        const data = await result.json()
        return data.result
    }catch{
        console.error('Error al botener las órdenes', error);
        return []
    } 
}

async function DetallesApi() {
    try{
        const result = await fetch('https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders')
        const data = await result.json()
        return data.result
    }catch{
        console.error('Error al obtener los detalles de la orden', error)
        return []
    }
    
}

export {OrdenesApi, DetallesApi}