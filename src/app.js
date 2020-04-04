const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

//Setup for static directory to use
app.use(express.static(publicDirPath))

app.listen(port, () => {
    console.log('server is up and running on port '+ port)
}) //one time you have to mention

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App HBS',
        name: 'snehal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        about: 'About page in HBS'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        help: 'This is help page with hbs'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address

    if (!address) {
        return res.send({
            error: 'You must provide address term'
        })
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecastData,
                location,
                address
            })

        })

    })

    // res.send({
    //     forecast: 'no rain',
    //     location: 'Mumbai',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

/* app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
}) */

/* app.get('/help', (req, res) => {
    res.send([{
        name: 'snehal',
        location: 'kharghar'
    },
    {
        name: 'pramod',
        location: 'kharghar'
    }])
})

app.get('/about', (req, res) => {
    res.send('<h1>About page</h1>')
}) */