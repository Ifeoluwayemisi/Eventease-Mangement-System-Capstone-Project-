import express from "express";
import { createGuest, loginGuest, deleteGuest, updateGuest, getAllGuest, getGuest } from "../controllers/guestController.js";
import { createGuestValidator, validationInputMiddleware } from "../middlewares/validateinput.js";

const router = express.Router();

router.post("/:eventId", createGuestValidator, validationInputMiddleware, createGuest);

router.get("/:eventId", getAllGuest);

router.get("/guests/:guestId", getGuest);

router.post("/login", loginGuest);

router.put("/guests/:guestId", updateGuest);

router.delete("/guests/:guestId", deleteGuest);


export default router;