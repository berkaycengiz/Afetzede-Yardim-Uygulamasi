import express from 'express';
import { isAuthenticated } from '../middlewares/index';
import { getAllRequests, newRequest } from '../controllers/requests';

export default (router: express.Router) => {
    router.post('/api/map', isAuthenticated, newRequest);
    router.get('/api/map', getAllRequests);
};