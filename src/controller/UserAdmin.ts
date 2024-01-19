import Admin from '../database/schemas/Admin';

import { Request, Response, NextFunction  } from 'express';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

const SECRET = '123';

class UserAdmin {

    verifyJWT(req: Request, res: Response, next: NextFunction) {

        const token = req.headers['x-access-token'] as string;
        if (!token) return res.status(401).send({ auth: false, message: 'Token não fornecido.' });


        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
              return res.status(500).send({ auth: false, message: 'Falha ao autenticar o token.' });
            }
      
            console.log(decoded);
            next();
          });

    }

    async valid(req: Request, res: Response) {
        try {
          const { email, password } = req.body;
          const user = await Admin.findOne({ email });
    
          if (!user || !bcrypt.compareSync(password, user.password as string)) {
            return res.status(401).send({ auth: false, message: 'E-mail ou senha inválidos.' });
          }
    
          const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: '1h' });
    
          return res.json({ auth: true, token });
        } catch (error) {
          return res.status(500).send({ auth: false, message: 'Erro interno do servidor.' });
        }
      }

    async create(req: Request, res: Response) {
        const { email, password } = req.body;


        const userExists = await Admin.findOne({email});

        if(userExists) {
            return res.status(400).json({
                error: "Oops",
                message: "Email já cadastrado!!!"
            })
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10)

            const user = await Admin.create({
                email,
                password: hashedPassword
            })

            return res.json(user);

        } catch (error) {
            return res.status(500).send({ error: "Algo errado aconteceu!", message: error });
        }
    }

}

export default new UserAdmin;