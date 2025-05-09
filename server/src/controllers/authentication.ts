import express from "express";
import { createUser, getUserBySessionToken, getUserByPhone, getUserById } from "../db/users";
import { authentication, random } from "../helpers";
import { uploadFromBuffer } from "../helpers/cloudinaryHelper";
import { sendOTP, verifyOTP } from '../helpers/twilioHelper';

export const authMe = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const sessionToken = req.cookies['COOKIE-AUTH'];

        if (!sessionToken) {
          return res.status(401).json({ message: 'Access denied. Please log in first.' });
        }
    
        const user = await getUserBySessionToken(sessionToken);
    
        if (!user) {
          return res.status(401).json({ message: 'Invalid or expired session' });
        }
    
        return res.sendStatus(200);
    } 
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const login = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const {phone, password, rememberMe} = req.body;

        if(!phone || !password){
            return res.status(400).json({ message: 'Please make sure all fields are filled in correctly.' });
        }

        const user = await getUserByPhone(phone).select('+authentication.salt +authentication.password');

        if(!user){
            return res.status(403).json({ message: 'Phone number or password is invalid.' });
        }

        const expectedHash = authentication(user.authentication.salt, password);
        if(expectedHash !== user.authentication.password){
            return res.status(403).json({ message: 'Phone number or password is invalid.' });
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('COOKIE-AUTH', user.authentication.sessionToken, {
                domain: '.localhost', 
                path: '/', 
                httpOnly: true,
                sameSite: 'lax',
                maxAge: rememberMe ? 14 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000
        });
        return res.status(200).json(user).end();
    }
    catch (error){
        console.log(error);
        return res.sendStatus(400);
    }
};

export const register = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const {firstName, lastName, phone, dateOfBirth, bloodType, address, emergencyContact, gender, isDisabled, password} = req.body;

        let profilePicUrl

        if(!req.file){
            profilePicUrl = 'https://res.cloudinary.com/dhzzoyfgt/image/upload/v1739299446/no-pic.png';
        }

        if (!firstName || !lastName || !phone || !dateOfBirth || !bloodType || !address || !gender || !isDisabled || !password){
            return res.status(400).json({ message: 'Please make sure all fields are filled in correctly.' });
        }

        const existingUser = await getUserByPhone(phone);

        if(existingUser){
            return res.status(400).json({ message: 'Phone number is already in use' });
        }

        if(password.length < 6){
            return res.status(400).json({ message: 'Password must be at least 6 characters long.' })
        }

        const salt = random();
        
        const user = await createUser({
            firstName,
            lastName,
            phone,
            profilePic: profilePicUrl,
            dateOfBirth,
            bloodType,
            address,
            emergencyContact,
            gender,
            isDisabled,
            authentication: {
                salt,
                password: authentication(salt, password)
            },
        });

        return res.status(200).json(user).end;
    }
    catch (error){
        console.log(error);
        return res.sendStatus(400);
    }
};

export const logout = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const sessionToken = req.cookies['COOKIE-AUTH'];
        
        if (!sessionToken) {
            return res.status(401).json({ message: 'Access denied. Please log in first.' });
        }
        
        const user = await getUserBySessionToken(sessionToken);

        user.authentication.sessionToken = '';
        await user.save();
        res.clearCookie('COOKIE-AUTH');
        return res.status(200).json({ message: 'Successfully logged out' });
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
};

export const uploadPic = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const {id} = req.params;

        const user = await getUserById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (req.file) {
            const options = {folder: 'afetzede_profile_pics'}
            const result = await uploadFromBuffer(req.file.buffer, options);
            user.profilePic = result.secure_url;
        }
        
        await user.save();

        return res.status(200).json(user).end;
    }
    catch (error){
        console.log(error);
        return res.sendStatus(400);
    }
};

export const sendCode = async (req: express.Request, res: express.Response): Promise<any> => {
    const { phone } = req.body as { phone?: string };
    if (!phone) return res.status(400).json({ error: 'Phone number is required.' });

    try {
        const status = await sendOTP(phone);
        res.json({ success: true, status });
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while sending the code.' });
    }
};

export const verifyCode = async (req: express.Request, res: express.Response): Promise<any> => {
    const { phone, code } = req.body as { phone?: string; code?: string };
    if (!phone || !code) return res.sendStatus(400);

    try {
        const isValid = await verifyOTP(phone, code);
        res.json({ success: isValid });
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Verification failed.' });
    }
};