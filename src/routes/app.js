import { Router } from "express";

const r = Router();

//raiz
r.get("/", (req, res) => {
  res.send({
    data: "Anime api running :)",
    status: 200
  });
});

export default r
