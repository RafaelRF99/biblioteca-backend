import Livrocontroller from "./controller/Livrocontroller";
import UserAdmin from "./controller/UserAdmin";

import { Router } from "express";

const routes = Router();

routes.get("/livro", Livrocontroller.getAll);
routes.post("/livro", UserAdmin.verifyJWT, Livrocontroller.create);
routes.put("/livro/:id", UserAdmin.verifyJWT, Livrocontroller.edit);
routes.delete("/livro/:id", UserAdmin.verifyJWT, Livrocontroller.delete);
routes.get("/livro/filter", Livrocontroller.filterCategory);

routes.post("/admin", UserAdmin.valid);



export default routes;