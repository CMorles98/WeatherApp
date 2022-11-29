
const fs = require('fs');

const axios = require('axios').default;

class Cities {

    async searchCity(cityName = '') {
        try {
            const instance = axios.create({
                baseURL: process.env['MAPBOX_API_URL'].replace('{cityName}', cityName),
                params: {
                    'access_token': process.env['MAPBOX_TOKEN'],
                    'languaje': 'es',
                    'limit': 5
                }
            })

            const { data } = await instance.get();
            return data.features.map(city => ({
                id: city.id,
                lat: city.center[1],
                lon: city.center[0],
                name: city.place_name,
            }))

        } catch (error) {
            return []
        }

    }

    async searchWeather({ lat, lon, name }) {
        try {
            const instance = axios.create({
                baseURL: process.env['OWEATHER_API_URL'],
                params: {
                    'lang': 'es',
                    'units': 'metric',
                    'appid': process.env['OWEATHER_TOKEN'],
                    lat,
                    lon
                }
            })

            const { data } = await instance.get();
            return {
                name,
                lat,
                lon,
                description: data.weather[0].description,
                temp: data.main.temp,
                min: data.main.temp_min,
                max: data.main.temp_max,
            }

        } catch (error) {
            return []
        }


    }

    async addToHistorical(name) {

        if (this.historical.find(c => name === c) !== undefined)
            return

        this.historical.unshift(name)

        this.historical = this.historical.slice(0, 5)

        this.SaveDb()
    }

    ReadDb() {

        if(!fs.existsSync(this.dbPath))
        {
            fs.mkdirSync(this.dbPath)
            return
        }

        const db = fs.readFileSync(this.fullPath, { encoding: 'utf-8' })
        const data = JSON.parse(db)

        this.historical = data.historical;
    }

    SaveDb() {
        const payload = {
            historical: this.historical
        }
        fs.writeFileSync(this.fullPath, JSON.stringify(payload))
    }

    constructor() {
        this.dbPath = './db'
        this.fullPath = './db/database.json'
        this.historical = []    

        this.ReadDb()
    }

}



module.exports = Cities