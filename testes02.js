// -=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//                    questão 13 do pdf
// -=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

const candidato = "Luis Eduardo"
const FezTesteTeorico = true
const pontos = 10
const eEsforcado = true

if (candidato && FezTesteTeorico && ( pontos >= 7 || eEsforcado)) {
    console.log(`Candidato: ${candidato}\nPontos: ${pontos}\nAprovado!`);
}
else {
    console.log("Candidato não está apto")
}


// -=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//                    questão 14 do pdf
// -=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var selecionados = [
    { id: 1, Nome: "Luis Eduardo", Cargo: "Analista de Sistemas", nota: 7, repositório: "Bom" },
    { id: 2, Nome: "Rafeal",       Cargo: "Analista de Sistemas", nota: 8, repositório: "mediano" }
];

var selecionadosNotArray = "Luis Eduardo"

function contratarFuncionario(lista) {
    try{

        if(!Array.isArray(lista)) {
            throw new Error("Os dados enviados não é um array de candidatos")
        }

        lista.forEach(candidato => {
        if (candidato.nota >= 7) {
            console.log(`candidato ${candidato.Nome} APROVADO!)`)
        }
    });
    } catch (error) {
        console.error("Erro ao processar contratação: ", error.message)
    }
}

contratarFuncionario(selecionadosNotArray)


console.log(
    "-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=",
    "questão 15 do pdf",
    "-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-="
)
// -=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//                    questão 15 do pdf
// -=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=


aplicativos = [
    {id: 1, nome: "Instagram", leads: 200, seguidores: 50000},
    {id: 2, nome: "TIkTok", leads: 50}   
]

function appMerge(apps) {
    try {
        if (!Array.isArray(apps)) {
            throw new Error("Os dados enviados não é um array de aplicativos")
        }
        apps.forEach(app => {
            if(app.leads == undefined || app.seguidores == undefined) {
                throw new Error(`Dados insuficientes do app ${app.nome} do ID: ${app.id}`)
            }

            console.log(`Processando dados do app: ${app.nome}...`)      
        });
    } catch(error) {
        console.error("Ocorreu um erro na junção dos dados dos apps:", error.message)
    }
}

appMerge(aplicativos)