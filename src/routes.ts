import Livrocontroller from "./controller/Livrocontroller";
import { Router } from "express";

const routes = Router();

routes.get("/livros", Livrocontroller.getAll)
routes.post("/livro", Livrocontroller.create)
routes.put("/livro/:id", Livrocontroller.edit)
routes.delete("/livro/:id", Livrocontroller.delete)

export default routes