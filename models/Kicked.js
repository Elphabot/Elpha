const mongoose = require('mongoose')
const KickedSchema = new mongoose.Schema({
    guild_id: String,
	user_id: String,
    moderatorId: String,
    reason: String,
})
module.exports = mongoose.model('Kicked', KickedSchema)