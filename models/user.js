const {model, Schema} = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required.']
    },
    email:  {
        type: String,
        required: [true, 'eMail is required.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Name is required.']
    },
    img:  {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status:  {
        type: Boolean,
        default: true
    },
    isGoogleUser: {
        type: Boolean,
        default: false
    },
});

UserSchema.methods.toJSON = function() {
    const {__v, password, ...user} = this.toObject();

    return user;
}

module.exports = model('User', UserSchema);