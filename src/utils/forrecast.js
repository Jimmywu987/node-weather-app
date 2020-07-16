const request = require('postman-request');


const weatherReport = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=4abbf6ca850776308af9dab1167a095d&units=m&query=${latitude},${longitude}`;

    request({ url: url, json: true}, function(error, res){

        if(error) {
            callback('Unable to connect to location services!', undefined)
        } else if (res.body.error) {
            callback("Unable to find the location, please try again", undefined)
        } else {
            callback(undefined, {
                description: res.body.current.weather_descriptions,
                temperature: res.body.current.temperature,
                feelLike: res.body.current.feelslike,
                humidity: res.body.current.humidity

            })
        }
        

    })
}

module.exports = weatherReport;