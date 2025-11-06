// src/routes/bus.routes.ts
import { Router } from "express";
import { getAllLines, getLineDetails } from "../services/busService.js";

const router = Router();

router.get("/lines", async (_, res) => res.json(await getAllLines()));
router.get("/lines/:id", async (req, res) => res.json(await getLineDetails(req.params.id)));

export default router;
