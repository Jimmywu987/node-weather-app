const path = require('path')
const express = require('express');
const { get } = require('http');
const hbs = require('hbs')
const app = express();
const port = process.env.PORT || 3000
const geocode = require('./utils/geocode');
const weatherReport = require('./utils/forrecast');

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')



// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', function(req, res) {
    res.render('index', {
        title: "Weather App",
        name: "Jimmy"
    })
})

app.get('/about', function(req, res) {
res.render('about', {
    title: "About Me",
    name: "Jimmy"
})
})

app.get('/help', function(req, res){
    res.render('help', {
        title: "Need Help?",
        name: 'Jimmy Wu'
    })
})







app.get('/weather', function( req, res) {

    if(!req.query.address){
       return res.send({
            error: "Please enter a valid address."
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, place} = {}) => {
    
        if(error){
          return  res.send({
            error: error
        })
        } 
             weatherReport(latitude, longitude, function(err, {description, temperature, feelLike, humidity} = {}){
                 if(err) {
                     return res.send({
                        error: err
                    })
                 }
                 res.send({
                    location: place,
                    description: description,
                    temperature: temperature,
                    FeelLikeTemperature: feelLike,
                    humidity: humidity
                })
            
        })
    })

})










app.get('/products', (req, res)=>{
    if(!req.query.search){
       return res.send({
            error: 'Your must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', function(req, res){
    res.render('notFound', {
        title: '404',
        name: "Jimmy Wu",
        errorMessage: "Help article not found"
        
    })
})

app.get('*', function(req , res){
    res.render('notFound', {
        title: "404",
        name: "Jimmy Wu",
        errorMessage: "Page not found"
    })
})


app.listen( port, function(req, res){
    
    console.log('Server is now running on port ' + port)
})