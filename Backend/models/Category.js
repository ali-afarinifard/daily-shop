const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
    name: { type: String, required: true },
    parent: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
    properties: [
        {
            name: { type: String, required: true },
            values: [{ type: String, required: true }]
        }
    ]
});

module.exports = mongoose.model('Category', CategorySchema);
