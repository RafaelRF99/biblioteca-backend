import { Request, Response, NextFunction  } from 'express';
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
            if (req.body.email === 'admin@hotmail.com' && req.body.pass === 'Goku') {
                const token = jwt.sign({ adminId: 1 }, SECRET, { expiresIn: 3000 });

                return res.json({ auth: true, token });
            }

        } catch (error) {
            return res.status(401).send({ error: "Algo errado aconteceu!", message: error });
        }



    }

}

export default new UserAdmin;