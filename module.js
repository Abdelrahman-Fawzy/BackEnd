const mongoose = require('mongoose')

const leagueSchema = mongoose.Schema({
    homeTeam: {
        type: String
    },
    awayTeam: {
        type: String
    },
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    duration: {
        type: Number
    },
    homeTeamScore: {
        type: Number
    },
    awayTeamScore: {
        type: Number
    },
    isActive: {
        type: false
    },
    league: {
        type: String
    }
});

const Leagues = module.exports = mongoose.model('Leagues', leagueSchema)