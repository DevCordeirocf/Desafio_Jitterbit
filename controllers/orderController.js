import prisma from '../config/prisma.js';

// Mapeamento: transforma o formato do JSON de entrada (português) para o banco de dados (inglês)
const mapOrderToDb = (data) => {
  return {
    orderId: data.numeroPedido,
    value: data.valorTotal,
    creationDate: new Date(data.dataCriacao),
    items: {
      create: data.items.map((item) => ({
        productId: item.idItem.toString(),
        quantity: item.quantidadeItem,
        price: item.valorItem,
      })),
    },
  };
};

// Mapeamento: transforma o formato do banco de dados (inglês) para o JSON de saída (português)
const mapOrderToResponse = (order) => {
  return {
    numeroPedido: order.orderId,
    valorTotal: order.value,
    dataCriacao: order.creationDate,
    items: order.items.map((item) => ({
      idItem: item.productId,
      quantidadeItem: item.quantity,
      valorItem: item.price,
    })),
  };
};

export const createOrder = async (req, res) => {
  try {
    const orderData = mapOrderToDb(req.body);
    const order = await prisma.order.create({
      data: orderData,
      include: { items: true },
    });
    res.status(201).json(mapOrderToResponse(order));
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar pedido', details: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { orderId: id },
      include: { items: true },
    });

    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    res.json(mapOrderToResponse(order));
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pedido', details: error.message });
  }
};

export const listOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: { items: true },
    });
    res.json(orders.map(mapOrderToResponse));
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar pedidos', details: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

    // Atualiza os campos básicos do pedido
    const updatedOrder = await prisma.order.update({
      where: { orderId: id },
      data: {
        orderId: numeroPedido,
        value: valorTotal,
        creationDate: dataCriacao ? new Date(dataCriacao) : undefined,
      },
      include: { items: true },
    });

    // Se itens forem fornecidos, podemos optar por substituir ou apenas atualizar
    // Para simplificar e seguir o CRUD, vamos atualizar apenas os dados do pedido base
    // Caso queira atualizar itens, a lógica seria mais complexa (delete + create ou update individual)

    res.json(mapOrderToResponse(updatedOrder));
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar pedido', details: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Primeiro deleta os itens relacionados devido à restrição de chave estrangeira
    await prisma.orderItem.deleteMany({
      where: { orderId: (await prisma.order.findUnique({ where: { orderId: id } }))?.id },
    });

    await prisma.order.delete({
      where: { orderId: id },
    });

    res.json({ message: 'Pedido deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar pedido', details: error.message });
  }
};
