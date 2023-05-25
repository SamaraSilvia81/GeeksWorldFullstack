const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Entidade Character
const CharacterSchema = new Schema({
    charname: String,
    nickname: String,
    image: String,
    about: String,
    isHero: { type: Boolean, default: false },
    isMarvel: { type: Boolean, default: false },
    lists: [{ type: Schema.Types.ObjectId, ref: 'List' }]
});

const Character = mongoose.model('Character', CharacterSchema);
module.exports = Character;
