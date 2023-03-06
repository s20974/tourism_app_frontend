import { AnyARecord } from "dns";

function toQueryParams(object: any) {
	return Object.keys(object)
		.filter(key => !!object[key])
		.map(key => key + "=" + encodeURIComponent(object[key]))
		.join("&")
}

async function reverse(params: {latitude: any, longitude: AnyARecord}) { 
    let queryParams;

    if (params.latitude && params.latitude)
        queryParams = {lat : `${params.latitude}`, lon : `${params.longitude}`};
    else return

    queryParams = { key: PTIVATE_LOCATION_TOKEN, format: 'json', ...queryParams }

    const url = `https://us1.locationiq.com/v1/reverse.php?${toQueryParams(queryParams)}&accept-language=en`;

    return await fetch(url);
}

export function getUserCountryCity(lat: any, lon: any){
    return reverse({
        latitude: lat,
        longitude: lon,
    })
}