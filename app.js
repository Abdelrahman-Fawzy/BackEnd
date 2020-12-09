const express = require('express')
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.set('view engine', 'pug');

var cors = require('cors')
app.use(cors())

// connect with dataBase
const mongoose = require('mongoose');
mongoose
.connect('mongodb://localhost/Task', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('database connected'))
.catch((err) => console.log(err))

const Leagues = require('./module')

app.post('/save', (req, res) => {
    async function CreateLeague() {

        const homeTeam = req.body.homeTeam
        const awayTeam = req.body.awayTeam
        const startTime = req.body.startTime
        const endTime = req.body.endTime
        const duration = req.body.duration
        const homeTeamScore = req.body.homeTeamScore
        const awayTeamScore = req.body.awayTeamScore
        const isActive = req.body.isActive
        const league = req.body.league

        const leagues = new Leagues({
            homeTeam: homeTeam,
            awayTeam: awayTeam,
            startTime: startTime,
            endTime: endTime,
            duration: duration,
            homeTeamScore: homeTeamScore,
            awayTeamScore: awayTeamScore,
            isActive: isActive,
            league: league
        });
    
        try {
            const league = await leagues.save();
            res.send(league);
        }
        catch(err) {
            console.log(err.message);
        }
    }
    
    CreateLeague()
})

app.get('/get', (req, res) => {
    async function getLeague() {
        const league = await Leagues
        .find()
        res.send(league)
    }
    getLeague()
})

app.put('/update/:id', (req, res) => {
    async function updateLeague() {
        const homeTeam = req.body.homeTeam
        const awayTeam = req.body.awayTeam
        const startTime = req.body.startTime
        const endTime = req.body.endTime
        const duration = req.body.duration
        const homeTeamScore = req.body.homeTeamScore
        const awayTeamScore = req.body.awayTeamScore
        const isActive = req.body.isActive
        const league = req.body.league

        const leaguea = await Leagues.findByIdAndUpdate({_id:req.params.id}, {
            $set : {
                homeTeam: homeTeam,
                awayTeam: awayTeam,
                startTime: startTime,
                endTime: endTime,
                duration: duration,
                homeTeamScore: homeTeamScore,
                awayTeamScore: awayTeamScore,
                isActive: isActive,
                league: league
            }
        });
        res.send(leaguea)
    }
    updateLeague()
})

app.delete('/delete/:id', (req, res) => {
    async function deleteLeague() {
        const league = await Leagues.deleteOne({_id:req.params.id})
        res.send(league)
    }
    deleteLeague()
})

const port = 7070
app.listen(port, () => console.log(`Server Started at Port ${port}`))