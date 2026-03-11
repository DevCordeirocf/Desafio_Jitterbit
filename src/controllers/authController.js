  import bcrypt from 'bcryptjs';
  import jwt from 'jsonwebtoken';
  import prisma from '../config/prisma.js';

  const JWT_SECRET = process.env.JWT_SECRET || 'jitterbit_secret_key';

  export const signup = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
      }

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Usuário já existe' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      res.status(201).json({ message: 'Usuário criado com sucesso', userId: user.id });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
    }
  };

  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: '24h',
      });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao fazer login', details: error.message });
    }
  };
