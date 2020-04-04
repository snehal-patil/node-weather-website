// import { response } from "express"

// console.log('Client side javascript loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((response)=> {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const mgsOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    console.log(location)

    mgsOne.textContent = 'Loading..'
    //msgTwo.textContent = ' '

    const url = 'http://localhost:3000/weather?address=' + location

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return mgsOne.textContent = data.error
            }

            mgsOne.textContent = data.location
            msgTwo.textContent = data.forecastData

        })
    })

})

