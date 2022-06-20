import mongoose from    'mongoose';
import Note from '../models/note.js';

// get all notes controller
export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find();

        res.status(200).json(notes);
    } catch (error) {
        res.status(404).json(error);
    }
}

// create a new note
export const createNote = async (req, res) => {
    const getedNote = req.body;

    const newNote = new Note(getedNote);
    try {
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(404).json(error);
    }
}

export const updateNote = async (req, res) => { 
    const {id} = req.params;
    const {name, note} = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Note not found with id: ${id}`);
    
    const updatedNote = {name , note , _id :id};
    try {
        await Note.findByIdAndUpdate(id , updatedNote , {new: true});
        res.json(updatedNote);
    } catch (error) {
        console.log(error);
    }

}

export const deleteNote = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Note not found with id: ${id}`);

    try {
        await Note.findByIdAndRemove(id);
        res.json({message : 'Note deleted successfully'});
    } catch (error) {
        console.error(error);
    }
}



