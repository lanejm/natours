const fs = require('fs')
const express = require('express')

const app = express()

app.use(express.json()) //middleware

// app.get('/', (req, res) => {
//     res.status(200).json({message: 'Hello from the server side!', app: "Natours"})
// })

// app.post('/',  (req, res) => {
//     res.send('You can post to this endpoint...')
// })

const tours = JSON.parse(fs.readFileSync('./starter/dev-data/data/tours-simple.json'))

//GET all tours
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length, //not necessary but it's good practice to return a count of items in an array
        data: {
            tours: tours
        }
        
    })
})

//GET tour by id
app.get('/api/v1/tours/:id', (req, res) => {

    const id = req.params.id * 1 //convert string to a number
    const tour = tours.find(el => el.id === id)
    //error handling
    // if(id > tours.length) {
    if(!tour){
        return  res.status(404).json({
                status: 'fail',
                message: `Tour with id ${id} not found.`
             });
    }

    

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
        
    })
})

//handle POST request to add new tour
app.post('/api/v1/tours', (req, res) => {
    const newId = tours[tours.length - 1].id + 1
    const newTour = Object.assign({ id: newId  }, req.body)

    tours.push(newTour)
    fs.writeFile('./starter/dev-data/data/tours-simple.json', JSON.stringify(tours),
    err => {
        res.status(201).json({
            status: 'created',
            data: {
                tour: newTour
            }
        })
    }
    )
})

//PATCH requests
app.patch('/api/v1/tours/:id', (req,res)=>{

    const id = req.params.id * 1 //convert string to a number
    const tour = tours.find(el => el.id === id)
    if(!tour){
        return  res.status(404).json({
                status: 'fail',
                message: `Tour with id ${id} not found.`
             });
    }
    
    res.status(200).json({
        status: 'success',
        data: {
            tour: "<Updated tour here...>"
        }
    })
} );

const port = 3000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})