import axios from "axios"

const { CancelToken } = axios;

export const bookingSearch = (input: any) => {
    const options = {
        method: 'GET',
        url: 'https://booking-com.p.rapidapi.com/v1/hotels/locations',
        params: { locale: 'en-gb', name: input },
        headers: {
            'X-RapidAPI-Key': X_RAPID_API_KEY,
            'X-RapidAPI-Host': X_RAPID_API_HOST
        }
    };

    if (input && input.length >= 2) {
        try {
            const source = CancelToken.source();
            const request = axios.request(options)

            return {
                async process(callback: any) {
                    request.then((response: any) => {
                        const json = response.data;
                        if (json) {
                            callback(
                                json.map((address: any) => {
                                    return {
                                        city: address.city_name,
                                        latitude: address.latitude,
                                        longitude: address.longitude,
                                        destId: address.dest_id,
                                        country: address.country,
                                        destType: address.dest_type,
                                        image: address.image_url
                                    };
                                })
                            );
                        }
                    });
                },
                cancel() {
                    source.cancel();
                },
            };
        } catch (error: any) {
            console.log(error);
        }
    }
    return {
        process() {
            return [];
        },
        cancel() { undefined },
    };
};

export const bookingHotelsSearch = (data: any) => {
    console.log(data)
    const options = {
        method: 'GET',
        url: 'https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates',
        params: {
            checkout_date: data.checkout_date,
            units: 'metric',
            latitude: data.latitude,
            longitude: data.longitude,
            locale: 'en-gb',
            adults_number: data.adults_number,
            order_by: 'popularity',
            filter_by_currency: 'USD',
            checkin_date: data.checkin_date,
            room_number: data.room_number,
            page_number: '0'
        },
        headers: {
            'X-RapidAPI-Key': X_RAPID_API_KEY,
            'X-RapidAPI-Host': X_RAPID_API_HOST
        }
    };

    return axios.request(options)
}