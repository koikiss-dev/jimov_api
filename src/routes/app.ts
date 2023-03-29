import { Router } from "express";

const r = Router();

//raiz
r.get("/", (_req, res) => {
  res.send({
    message: "Jimov API is up and running 🎬🎉🎉",
    status: "success",
    code: 200,
    additional_info: {
      server: "https://jimov.herokuapp.com/",
      discord: "https://discord.gg/tyZ39GCX7R",
      last_update: "2/15/2023",
    },
  });
});

export default r;
