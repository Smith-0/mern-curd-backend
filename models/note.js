import mongoose from 'mongoose';

const noteSchema = mongoose.Schema({
    name: String,
    note: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Note = mongoose.model('Note' , noteSchema);

export default Note;