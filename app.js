const { inquirerMenu, pause, readInput, formatCitiesList } = require("./helpers/inquirer")

const Cities = require("./models/cities")

const colors = require('colors')
require("dotenv").config()

const main = async () => {

    let option = ''
    const cities = new Cities()

    do {

        option = await inquirerMenu("What do you want to do?");

        if (option === 1) {

            const input = await readInput(`${'City:'.green}`)
            const citiesList = await cities.searchCity(input)

            const selectedCity = await formatCitiesList(citiesList)

            if (selectedCity === 0)
                continue;

            const { name, lat, lon, temp, min, max, description } = await cities.searchWeather(selectedCity)

            await cities.addToHistorical(name)

            // console.clear()
            console.log('\nCity information\n'.green)
            console.log('City:', name.green)
            console.log('Lat:', lat)
            console.log('Lon:', lon)
            console.log('Temperature:', temp)
            console.log('Min:', min)
            console.log('Max:', max)
            console.log('Weather:', description.green)
            await pause()

        }
        else if (option === 2) {
            cities.historical.forEach( name => {
                console.log(name)
            })
            await pause()
        }
    }
    while (option !== 0);
}

main();

