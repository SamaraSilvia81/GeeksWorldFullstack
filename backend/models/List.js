const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Entidade List
const ListSchema = new Schema({
    listname: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    characters: [{ type: Schema.Types.ObjectId, ref: 'Character' }]
});


const List = mongoose.model('List', ListSchema);
module.exports = List;
