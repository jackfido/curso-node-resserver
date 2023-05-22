const {model, Schema} = require('mongoose');

const ProductsSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required.']
    },
    description: {
        type: String
    },
    img:  {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    price: {
        type: Number,
        default: 0.0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
});

ProductsSchema.methods.toJSON = function() {
    const {__v, _id, status, ...products} = this.toObject();

    products.uid = _id;

    return products;
}

module.exports = model('Product', ProductsSchema);