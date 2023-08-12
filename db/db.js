import express from 'express';
import mongoose from 'mongoose';

const users = new mongoose.Schema({
    name: {
        type: 'string',
        required: true
    },
    last_name: {
        type: String, 
        required: true
    },
    email: {
        type: String
    }
})
const usersModel = mongoose.model('users', users);

export default usersModel