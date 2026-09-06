const baseURL = `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_KEY}`;

export const getWeatherDataForCity = async (city) => {
    // const response = await fetch(`${baseURL}&q=${city}&aqi=yes`);
    // return await response.json();

    const requestUrl = `${baseURL}&q=${city}&aqi=yes`;
    const response = await fetch(requestUrl);
    return await response.json();
};

export const getWeatherDataForLocation = async (lat, lon) => {
    const response = await fetch(`${baseURL}&q=${lat},${lon}&aqi=yes`);
    return await response.json();
};