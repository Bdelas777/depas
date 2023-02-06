import { Router } from "express";
import { createRoom, getRooms, deleteRoom } from "../controllers/room.js";
import auth from "../middleware/auth.js";

const roomRouter = Router();

roomRouter.post("/", auth, createRoom);
roomRouter.get("/", getRooms);
roomRouter.delete("/:roomId", deleteRoom);

export default roomRouter;
