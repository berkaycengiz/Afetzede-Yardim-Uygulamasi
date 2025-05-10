import express from 'express';
import { getAllUsers, getUser, updateUser } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares/index';
import upload from '../middlewares/multer';
import { uploadPic } from '../controllers/authentication';

export default (router: express.Router) => {
    router.get('/api/users', isAuthenticated, getAllUsers);
    router.get('/api/user/:username', isAuthenticated, getUser);
    router.patch('/api/user/:id', isAuthenticated, isOwner, updateUser);
    router.post('/profile/picture/:username', isAuthenticated, isOwner, upload.single('profilePic'), uploadPic);
};