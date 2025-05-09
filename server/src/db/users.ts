import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: String, required: true, unique: true},
    profilePic: {type: String},
    dateOfBirth: {type: Date, required: true},
    bloodType: {type: String, enum:['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', '0+', '0-'], required: true},
    address: {type: String, required: true},
    emergencyContact: {type: String, required: false},
    gender: {type: String, enum: ['Male', 'Female', 'Other'], required: true},
    isDisabled: {type: String, enum: ['Yes', 'No'], required: true},
    authentication: {
        password: {type: String, required: true, select: false},
        salt: {type: String, select: false},
        sessionToken: {type: String, select: false}
    },
});

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByPhone = (phone: string) => UserModel.findOne({phone});
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({'authentication.sessionToken': sessionToken,});
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values); 