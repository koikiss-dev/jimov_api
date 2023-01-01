import { Router } from "express";

const r = Router();

//raiz
r.get("/", (req, res) => {
  res.send({
    data: "Servidor de anime corriendo :)",
    status: "ok"
  });
});

export default r
