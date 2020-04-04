const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2xhc2hzbmVoYWwiLCJhIjoiY2s4ZmprZno2MDQzYjNscGJnNHZvYXY1bCJ9.389yNwMMuHVOe7y_El97cg&limit=1'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable connect to geoLocation service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location try another', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode