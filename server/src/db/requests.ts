import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema({
  requestedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  type: {type: String, enum: ['barinma', 'gida', 'su', 'ilac', 'ilk yardim', 'giyim', 'ulasim', 'enkaz', 'yangin', 'diger'], required: true},
  description: {type: String,},
  photo: {type: String},
  status: {type: String, enum: ['in_progress', 'resolved'], default: 'in_progress'},
  location: {lat: { type: Number, required: true }, lng: { type: Number, required: true}},
},{timestamps: true}
);

export const RequestModel = mongoose.model('Request', RequestSchema);

export const createRequest = (values: Record<string, any>) => new RequestModel(values).save().then(req => req.toObject());
export const getRequests = () => RequestModel.find({}, 'location type status');
export const getRequestById = (id: string) => RequestModel.findById(id).populate('user');
