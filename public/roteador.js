// AS ROTAS CARREGA O HTML DAS '/paginas/*****/arquivo.js

window.roteador = function roteador(rota, param) {
console.log({rota,param})
  switch(rota) {
    case "requisicao-lista":
        window.location.replace("/requisicao-lista");
    break;

    case "requisicao-novo":
        window.location.replace("/requisicao-novo");
    break;

    case "requisicao-selecionada":
        window.location.replace(`/requisicao-selecionada?requisicaoID=${param}`);
    break;

    case "unidade-novo":

    break;

    case "centrocusto-novo":

    break;

    case "contacontabil-novo":

    break;

    case "fornecedor-novo":

    break;

    case "rubrica-novo":

    break;

    case "centrocusto-novo":

    break;

    case "projeto-novo":

    break;

    case "notafiscal-novo":

    break;

    case "orcamento-novo":
        window.location.replace("/orcamento-novo");
    break;

    case "orcamento-lista":
        window.location.replace("/orcamento-lista");
    break;

    case "centrocusto":

    break;

    case "centrocusto":

    break;

    case "centrocusto":

    break;

    

  }

}