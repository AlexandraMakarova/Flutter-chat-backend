const { Schema, model } = require('mongoose');

const MessageSchema = Schema({
    from: {
        type: Schema.Types.ObjectId, 
        reference: 'User',
        required: true,
    },
    to: {
        type: Schema.Types.ObjectId, 
        reference: 'User',
        required: true,
    },
    message: {
        type: String, 
        required: true,
    },
}, {
    timestamps:true
});

MessageSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    return object;
});

module.exports = model('Message', MessageSchema);