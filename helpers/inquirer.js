const inquirer = require("inquirer");

require("colors")

const inquirerMenu = async (message) => {

    console.clear();
    console.log(`--------------------------------`.green)
    console.log(`       ${'SELECT AN OPTION'.green}       `)
    console.log(`--------------------------------`.green)
    console.log()

    const question = [{
        type: 'list'
        , name: 'option'
        , message
        , choices: [
            {
                name: `${'1.'.green} Search city`,
                value: 1
            },
            {
                name: `${'2.'.green} Historical`,
                value: 2
            },
            {
                name: `${'0.'.green} Go Out`,
                value: 0
            },
        ]
    }]

    const { option } = await inquirer.prompt(question)
    return option;
}

const pause = async () => {

    const question = [{
        type: 'input',
        name: 'pause',
        message: `Press ${'ENTER'.green} to continue`
    }]

    const { pause } = await inquirer.prompt(question);
    return pause;
}

const readInput = async (message) => {
    const question = [{
        type: 'input'
        , name: 'parameter'
        , message
    }];

    const { parameter } = await inquirer.prompt(question)
    return parameter
}

const formatCitiesList = async (cities) => {

    const choices = cities.map((city, index) => {
        const i = `${index + 1}.`.green

        return {
            name: `${i} ${city.name}`,
            value: city
        }
    })

    choices.push({
        name: `${'0.'.green} Cancel`,
        value: 0
    })

    const question = [{
        type: 'list',
        name: 'citiesList',
        choices
    }]
    const { citiesList } = await inquirer.prompt(question)
    return citiesList
}

module.exports = {
    formatCitiesList,
    inquirerMenu,
    pause,
    readInput
}

