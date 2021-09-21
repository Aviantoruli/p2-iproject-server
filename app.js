const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const axios = require('axios')
const router = express.Router()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())



app.get('/anime', (req, res) => {
    axios({
        ethod: 'GET',
        url: 'https://animi.p.rapidapi.com/name',
        params: { name: 'log -horizon' },
        headers: {
            'x-rapidapi-host': 'animi.p.rapidapi.com',
            'x-rapidapi-key': '2fae79f64emshb211f3595ca3edap149741jsn40fca561ec62'
        }


    })
        .then((respon) => {
            console.log(respon)
            // res.status(200).json(respon.data)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.use(router)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


