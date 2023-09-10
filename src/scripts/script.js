const url = 'https://ip-geo-location.p.rapidapi.com/ip/check?format=json';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'ad919e9a88msh75f514635c55e02p1fbf09jsn4d121fc660af',
        'X-RapidAPI-Host': 'ip-geo-location.p.rapidapi.com'
    }
};

try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
} catch (error) {
    console.error(error);
}

async function position() {
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}


export default { position };