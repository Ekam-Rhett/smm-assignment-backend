import fetch from 'node-fetch'

const providerEndpoint = `https://${process.env.PROVIDER_ENDPOINT}/api/v2`
const providerKey = process.env.PROVIDER_APIKEY


console.log(providerEndpoint);

export async function sendOrderProvider(orderData) {
    try {
        const params = {
            key: providerKey,
            action: "add",
            service: orderData.service,
            link: orderData.link,
            quantity: orderData.quantity
        }

        const options = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify( params )
        }
    
        const placeOrder = await fetch(providerEndpoint, options);
        const response = await placeOrder.json();
        let orderStatus = await checkStatus(response.order)
        let finalResponse = {
            order: response.order,
            charge: orderStatus.charge,
            startCount: orderStatus.start_count,
            orderStatus: orderStatus.status,
            orderRemains: orderStatus.remains
        }
        return finalResponse;
    } catch (err) {
        console.error(err);
    }
    
}


export async function checkStatus(exteneralId) {
    try {
        const params = {
            key: providerKey,
            action: "status",
            order: exteneralId
        }

        const options = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify( params )
        }

        const checkStatus = await fetch(providerEndpoint, options);
        const response = await checkStatus.json();
        return response;
    } catch (err) {
        console.error(err.message);
    }
}


export async function getServices() {
    try {
        const request = await fetch(`${providerEndpoint}?key=${providerKey}&action=services`);
        const services = await request.json();
        return services;
    } catch (err) {
        console.error(err.message)
    }
}