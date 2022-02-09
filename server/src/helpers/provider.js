import fetch from 'node-fetch'

const providerEndpoint = `https://${process.env.PROVIDER_ENDPOINT}/api/v2`
const providerKey = process.env.PROVIDER_APIKEY




export async function sendOrderProvider() {
    try {
        const params = {
            key: providerKey,
            action: "add",
            service: "374",
            link: "123.com",
            quantity: "100"
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
        console.log(response);
    } catch (err) {
        console.error(err);
    }
    
}


export async function checkStatus() {
    try {
        const params = {
            key: providerKey,
            action: "status",
            order: "34804"
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
        console.log(response);
    } catch (err) {
        console.error(err);
    }
}


