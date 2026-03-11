import express from 'express';
import authRoutes from './src/routes/authRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rotas de Autenticação (Abertas)
app.use('/auth', authRoutes);

// Rotas de Pedidos (Protegidas)
app.use('/order', orderRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.json({ message: 'API Desafio Jitterbit Rodando' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na url: http://localhost:${PORT}`);
});
