// Relationship
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RelationshipSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'List' },
    list: { type: Schema.Types.ObjectId, ref: 'Character' }
});

const Relationship = mongoose.model('Relationship', RelationshipSchema);
module.exports = Relationship;
