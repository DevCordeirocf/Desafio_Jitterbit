const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient

const authRoutes = require('./routes/authRoutes')

const app = express();
app.use(express.json());




app.get('/order', (req, res) =>  {

    res.send()
})


app.get('/order/list')


app.put('/order/')

app.delete('/order/')







app.listen(3000, () => {
    console.log("Servidor rodando na url: http://localhost:3000")
})