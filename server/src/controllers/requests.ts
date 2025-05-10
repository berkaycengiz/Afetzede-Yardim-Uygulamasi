import { uploadFromBuffer } from "../helpers/cloudinaryHelper";
import { createRequest, getRequests } from "../db/requests";
import { getUserById } from "../db/users";
import express from "express";
import { get } from "lodash";

export const newRequest = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const userId = get(req, 'identity._id');
        const { type, location, photo, description } = req.body;
        let photoUrl = ""

        const existing = await getUserById(userId);

        if (existing) {
          return res.status(400).json({ message: "Mevcut talebiniz bulunmaktadır." });
        }

        if (!location){
          return res.status(400).json({ message: "Konum bilgileriniz alınamadı." });
        }
      
        if (!type || !description) {
          return res.status(400).json({ message: "Tüm alanları dolduğunuzdan emin olun." });
        }
      
        if (description.length > 60){
          return res.status(400).json({ message: "Açıklama 120 karakterden fazla olamaz." });
        }

        if (req.file) {
          const options = {folder: 'requests'}
          const result = await uploadFromBuffer(req.file.buffer, options);
          photoUrl = result.secure_url;
        }
      
        const newRequest = await createRequest({
          requestedBy: userId,
          type,
          location,
          photo,
          description,
        });

        return res.status(200).json(newRequest).end;
    } 
    catch (err) {
        return res.status(500).json({ message: "Talep oluşturulamadı." });
    }
};

export const getAllRequests = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const requests = await getRequests();

        return res.status(200).json(requests);
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
};