// =====================================================================
// DESAFIO PRÁTICO: O MAGO DA INTEGRAÇÃO (Preparatório Jitterbit)
// =====================================================================

console.log("Iniciando o processamento da API de Pedidos...\n");

// ---------------------------------------------------------------------
// 1. VARIÁVEIS E OPERADORES LÓGICOS 
// ---------------------------------------------------------------------
const tokenValido = true;
const sistemaEmManutencao = false;

// Regra: O acesso só é permitido SE o token for válido E o sistema NÃO estiver em manutenção.
let acessoPermitido = !sistemaEmManutencao
console.log(`1. Acesso Permitido? ${acessoPermitido}`);


// ---------------------------------------------------------------------
// 2. MANIPULAÇÃO DE ARRAYS (push, filter, map)
// ---------------------------------------------------------------------
let pedidosJson = [
    { id: 1, produto: "Licença API", status: "concluido", valor: 150 },
    { id: 2, produto: "Suporte", status: "pendente", valor: 50 }
];

pedidosJson.push({id: 3, produto: "treinamento", status: "concluido", valor: 200 })

console.table(pedidosJson)
// O novo pedido deve ser: { id: 3, produto: "Treinamento", status: "concluido", valor: 200 }

let pedidosConcluidos = pedidosJson.filter((pedido) => {
    return pedido.status === "concluido";
    }
)

console.log("\n1. valores filtrados por concluidos:", pedidosConcluidos)


// Exemplo do resultado esperado: [8-10]
let valoresPedidos = pedidosJson.map((valor) => {
    return valor.valor
})
console.log("\n2. Valores extraídos via Map:", valoresPedidos);


// ---------------------------------------------------------------------
// 3. TRATAMENTO DE ERROS (try, catch, throw)
// ---------------------------------------------------------------------
function calcularMediaDeVendas(totalVendas, quantidadeDias) {
    // Dentro do try: se "quantidadeDias" for estritamente igual a 0, use "throw new Error" 
    // com a mensagem "Divisão por zero não é permitida."
    // Caso contrário, retorne totalVendas / quantidadeDias.
    // Dentro do catch: retorne "Erro: " + o texto do erro.
    
    try {

        if (quantidadeDias === 0) {
            throw new Error ("Divisão por zero não é permitida")
        }

            return totalVendas / quantidadeDias

    } catch (erro) {
        return "Erro: " + erro.message;
    }


}

console.log("\n3a. Média normal:", calcularMediaDeVendas(20, 2)); // Deve retornar 10
console.log("3b. Média com erro:", calcularMediaDeVendas(6, 0));  // Deve retornar Erro


// ---------------------------------------------------------------------
// 4. LÓGICA E ALGORITMOS CLÁSSICOS 
// ---------------------------------------------------------------------

function somaImpares(n) {
    let soma = 0
    while (n >= 1) {
        if (n % 2 != 0) {
            soma += n
        }
        n--;
    }
    return soma;
}

console.log("\n4a. Soma dos ímpares até 5 (esperado 9):", somaImpares(5));

function inverterPalavra(palavra) {

    return palavra .split('').reverse().join('');
};


console.log("4b. Palavra invertida (javascript):", inverterPalavra("javascript")); // tpircsavaj


// ---------------------------------------------------------------------
// 5. O ENIGMA DO SWITCH 
// ---------------------------------------------------------------------
function pegadinhaDoSwitch(palavra) {
    let resultado = "";
    switch (palavra) {
        case "ACB":
            resultado = "C";
            break;
        case "BC":
            resultado = "ab"
        case "ABC":
            resultado = "A";
        case "B":
            resultado = "Hello";
            break;
        default:
            resultado = "Palavra não encontrada";
            break;
    }
    return resultado;
}
console.log("\n5. Resultado do Switch para 'BC':", pegadinhaDoSwitch("BC"));


// ---------------------------------------------------------------------
// 6. PROGRAMAÇÃO ASSÍNCRONA (async/await e Promises)
// ---------------------------------------------------------------------


async function getData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(pedidosConcluidos);
        }, 1000);
    })
}

// Função principal que invoca a Promise
async function iniciarSistema() {
    console.log("\n6. Buscando dados assincronamente...");
    try {
        let dados = await getData(); 
        console.log("Dados recebidos com sucesso:", dados);
    } catch (error) {
        console.log("Falha ao buscar dados.");
    }
}
iniciarSistema();
