import mongoose from 'mongoose';

const roomSchema = mongoose.Schema(
  {
    lng: { type: Number, required: true },
    lat: { type: Number, required: true },
    precio: { type: Number, min: 0, max: 12000, default: 0 },
    titulo: { type: String, required: true, minLength: 5, maxLength: 150 },
    descripcion: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 1000,
    },
    imagenes: {
      type: [String],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    uid: { type: String, required: true },
    uName: { type: String, required: true },
    uPhoto: { type: String, default: '' },
  },
  { timestamps: true }
);

const Room = mongoose.model('rooms', roomSchema);

export default Room;