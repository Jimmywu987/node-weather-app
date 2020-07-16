const request = require('postman-request');


const geocode = (address, callback) => {
    const url1 = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiamltbXl3dTEyMyIsImEiOiJja2NtemRyenAwMXBqMnpta3ZtZ3YzMTZvIn0.-6oSqXUbjtrBQmtx2ewkbQ&limit=1`
    request({url: url1, json: true}, function(error, res){
        if(error) {
            callback('Unable to connect to location services!', undefined)
        } else if (res.body.features.length === 0){
            callback('Unable to find location, Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: res.body.features[0].center[1],
                longitude: res.body.features[0].center[0],
                place: res.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;