import express, { Request, Response } from "express";
import { celebrate, Joi, errors, Segments } from "celebrate";

const app = express();

app.use(express.json());

const produtos = ["leite", "café", "Doce de Leite", "Pão", "margarina"];

app.get("/", (request: Request, response: Response) => {
  return response.json({ pro: "ok" });
});

app.get("/produtos", (req: Request, res: Response) => {
  const { filter } = req.query;
  if (!filter) {
    throw new Error("Filter is missing");
  }
  const list = produtos.filter((item) =>
    item.toLowerCase().includes(String(filter).toLowerCase())
  );
  return res.json({ produtos: list });
});

app.post(
  "/produtos",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      produto: Joi.string().required(),
    }),
  }),
  (req: Request, res: Response) => {
    const { produto } = req.body;
    if (!produto) {
      throw new Error("Product is missing");
    }

    produtos.push(produto);
    return res.status(201).json();
  }
);

app.listen(3000, () => {
  console.log("app started -> http://localhost:3000");
});
