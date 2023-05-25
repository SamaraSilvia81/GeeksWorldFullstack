const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }]
});

/*UserSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isNew) {
        return next();
    }
    try {
        const List = mongoose.model('List');
        const myList = await List.create({ listname: 'MyList', owner: user });
        user.lists.push(myList);
        next();
    } catch (error) {
        next(error);
    }
});*/

const User = mongoose.model('User', UserSchema);
module.exports = User;
