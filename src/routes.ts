import Livrocontroller from "./controller/Livrocontroller";
import { Router } from "express";

const routes = Router();

routes.get("/livro", Livrocontroller.getAll)
routes.post("/livro", Livrocontroller.create)
routes.put("/livro/:id", Livrocontroller.edit)
routes.delete("/livro/:id", Livrocontroller.delete)

routes.get("/livro/filter", Livrocontroller.filterCategory)

export default routes