import Livro from '../database/schemas/Livro'
import {Request, Response} from 'express'

class LivroController {

    async getAll(req: Request, res: Response) {
        try {
            const livros = await Livro.find();

            return res.json(livros);

        } catch (error) {
            return res.status(500).send({error: "Algo errado aconteceu!", message: error});
        }
    }

    async create(req: Request, res: Response) {
        const { title, author, local, category, bookCover, lauch, createAt } = req.body;

        try {
            const titleExists = await Livro.findOne({title});

            if(titleExists) {
                return res.status(400).json({
                    error: "Algo de errado aconteceu",
                    message: "Livro já existe!"
                });
            }

            const livro = await Livro.create({
                title,
                author,
                local,
                category,
                bookCover,
                lauch,
                createAt
            });
            return res.json(livro);

        } catch (error) {
            return res.status(500).send({error: "Falha no registrar", message: error});
        }
    }

    async edit(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const updatedLivro = await Livro.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    
            if (!updatedLivro) {
                return res.status(404).json({
                    error: "Livro não encontrado",
                    message: "O livro com o ID fornecido não foi encontrado no banco de dados."
                });
            }
    
            return res.json(updatedLivro);
        } catch (error) {
            return res.status(500).send({ error: "Falha ao atualizar o livro", message: error });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = req.params.id;

            const deletedLivro = await Livro.findByIdAndDelete(id);

            if (!deletedLivro) {
                return res.status(404).json({
                    error: "Livro não encontrado",
                    message: "O livro com o ID fornecido não foi encontrado no banco de dados."
                });
            }

            return res.json({
                message: "Livro excluído com sucesso",
                deletedLivro
            });
        } catch (error) {
            return res.status(500).send({ error: "Falha ao excluir o livro", message: error });
        }
    }

    async filterCategory(req: Request, res: Response) {
        try {
            const { category } = req.query;

            const livros = await Livro.find({category});
            return res.json(livros);
    } catch (error) {
        return res.status(500).send({ error: "Falha ao buscar livros por categoria", message: error });
    }
    }
}
export default new LivroController;