import express from "express";
import { createGuest, loginGuest, deleteGuest, updateGuest, getAllGuest, getGuest, getCheckedInGuestbyEvents, } from "../controllers/guestController.js";
import { createGuestValidator, validationInputMiddleware } from "../middlewares/validateinput.js";

const router = express.Router();

router.post("/event/:eventId", createGuestValidator, validationInputMiddleware, createGuest);

router.get("/event/:eventId", getAllGuest);

router.get("/:guestId", getGuest);

router.get("/analytics/:eventId/checkedin", getCheckedInGuestbyEvents);

router.post("/login", loginGuest);

router.put("/:guestId", updateGuest);

router.delete("/:guestId", deleteGuest);


export default router;