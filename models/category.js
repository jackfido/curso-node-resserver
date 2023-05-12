const {model, Schema} = require('mongoose');

const CategoriesSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required.']
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
});

CategoriesSchema.methods.toJSON = function() {
    const {__v, _id, status, ...category} = this.toObject();

    category.uid = _id;

    return category;
}

module.exports = model('Category', CategoriesSchema);