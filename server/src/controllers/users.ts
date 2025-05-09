import express from 'express';
import { getUserById, getUsers } from '../db/users';
import { authentication } from '../helpers/index';

export const getUser = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const {id} = req.params;

        const user = await getUserById(id);

        return res.json(user);
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getAllUsers = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const users = await getUsers();

        return res.status(200).json(users);
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
};

export const updateUser = async (req: express.Request, res: express.Response): Promise<any> => {
    // try{
    //     const {id} = req.params;
    //     const {username, password} = req.body;

    //     const user = await getUserById(id);

    //     if (username && username !== user.username) {
    //         const existingUser = getUserByUsername(username);
    //         if (!existingUser) {
    //             user.username = username;
    //         } 
    //         else {
    //             return res.status(400).json({ message: 'Username already taken' });
    //         }
    //     }

    //     if (password) {
    //         user.authentication.password = authentication(user.authentication.salt, password);
    //     }

    //     await user.save();
        
    //     return res.status(200).json(user).end();
    // }
    // catch(error){
    //     console.log(error);
    //     return res.sendStatus(400);
    // }
};

