const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/cefa841718abf2b0fd3c84d20e81a786/' + latitude + ',' + longitude

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback(undefined,'Unable toconnect to weather service!')
        } else if (body.error) {
           callback(undefined, body.error)
        } else {
            const temp = body.currently.temperature
            const precipProbability = body.currently.precipProbability
            callback(undefined, 'It is currently ' + temp + ' degrees out. There is a ' + precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast