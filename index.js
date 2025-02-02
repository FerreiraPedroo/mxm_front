const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


// #################################################################
// ###  CAMINHO DOS ARQUIVOS  ######################################
// #################################################################
const contaContabeisPath = path.join(__dirname, "public/dados", "conta_contabeis.json");
const notasFiscaisPath = path.join(__dirname, "public/dados", "notas_fiscais.json");
const centrosCustoPath = path.join(__dirname, "public/dados", "centros_custo.json");
const fornecedoresPath = path.join(__dirname, "public/dados", "fornecedores.json");
const orcamentosValoresPath = path.join(__dirname, "public/dados", "orcamentos_valores.json");
const requisicoesPath = path.join(__dirname, "public/dados", "requisicoes.json");
const orcamentosPath = path.join(__dirname, "public/dados", "orcamentos.json");
const unidadesPath = path.join(__dirname, "public/dados", "unidades.json");
const projetosPath = path.join(__dirname, "public/dados", "projetos.json");
const rubricasPath = path.join(__dirname, "public/dados", "rubricas.json");



// #################################################################
// ###  PÁGINAS HTML  ##############################################
// #################################################################

// ###  INDEX  #####################################################
// ROTA PARA SERVIR O ARQUIVO PRINCIPAL
app.get('/', (req, res) => {
 res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ###  REQUISIÇÕES  ###############################################
app.get('/requisicao-lista', (req, res) => {
 res.sendFile(path.join(__dirname, 'public', 'paginas/requisicaoLista/requisicaoLista.html'));
});
app.get('/requisicao-novo', (req, res) => {
 res.sendFile(path.join(__dirname, 'public', 'paginas/requisicaoNovo/requisicaoNovo.html'));
});
app.get('/requisicao-selecionada', async (req, res) => {
 res.sendFile(path.join(__dirname, 'public', 'paginas/requisicaoSelecionada/requisicaoSelecionada.html'));
});

// ###  ORÇAMENTOS  ################################################
app.get('/orcamento-lista', (req, res) => {
 res.sendFile(path.join(__dirname, 'public', 'paginas/orcamentoLista/orcamentoLista.html'));
});






// #################################################################
// ###  DADOS: LISTA DADOS  ########################################
// #################################################################
app.get('/unidades', async (req, res) => {
 const fileInfo = await carregarArquivo(unidadesPath);
 return res.status(200).send(fileInfo);
});

app.get("/orcamentos", async (req, res) => {
 const fileInfo = await carregarArquivo(orcamentosPath);
 return res.status(200).send(fileInfo);
});

app.get("/centros-custo", async (req, res) => {
 const fileInfo = await carregarArquivo(centrosCustoPath);
 return res.status(200).send(fileInfo);
});

app.get("/contas-contabeis", async (req, res) => {
 const fileInfo = await carregarArquivo(contaContabeisPath);
 return res.status(200).send(fileInfo);
});

app.get("/rubricas", async (req, res) => {
 const fileInfo = await carregarArquivo(rubricasPath);
 return res.status(200).send(fileInfo);
});

app.get("/orcamento-valores", async (req, res) => {
 const fileInfo = await carregarArquivo(orcamentosValoresPath);
 return res.status(200).send(fileInfo);
});

app.get("/fornecedores", async (req, res) => {
 const fileInfo = await carregarArquivo(fornecedoresPath);
 return res.status(200).send(fileInfo);
});

// #################################################################
// #################################################################
// ###  REQUISIÇÃO  ################################################
// #################################################################
// #################################################################

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ### LISTA DE REQUISIÇÕES  +++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.get("/requisicoes", async (req, res) => {
 const caminhoArquivo = path.join(__dirname, 'public/dados', 'requisicoes.json');
 const fileInfo = await carregarArquivo(caminhoArquivo);
 return res.status(200).send(fileInfo);
});

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ### REQUISIÇÃO: NOVA REQUISIÇÃO  ++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.post('/requisicoes', async (req, res) => {
 const caminhoArquivo = path.join(__dirname, 'public/dados', 'requisicoes.json');
 const fileInfo = await carregarArquivo(caminhoArquivo);

 let nextID = 1;
 if (fileInfo.length) {
  nextID = Number(fileInfo[fileInfo.length - 1].id) + 1
 }

 const novaReqInfo = Object.entries(req.body).reduce((acc, [key, value]) => {
  if (value == "NULL") {
   acc[key] = null;
  } else {
   acc[key] = value;
  }
  return acc
 }, {})

 const dt_solicitacao_req = new Date().toLocaleString("pt-BR").split(",")[0];

 fileInfo.push({
  ...novaReqInfo,
  dt_solicitacao_req,
  id: nextID
 })

 const reqList = await salvarArquivo(caminhoArquivo, fileInfo)

 return res.status(200).send(reqList);
});


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ### REQUISIÇÃO SELECIONADA  +++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.get("/requisicoes/:requisicaoID", async (req, res) => {
 try {

  const { requisicaoID } = req.params;

  const contaContabeisInfo = await carregarArquivo(contaContabeisPath);
  const centrosCustoInfo = await carregarArquivo(centrosCustoPath);
  const orcamentosInfo = await carregarArquivo(orcamentosPath);
  const unidadesInfo = await carregarArquivo(unidadesPath);
  const projetosInfo = await carregarArquivo(projetosPath);


  const requisicoesInfo = await carregarArquivo(requisicoesPath);
  const requisicaoSelecionadaInfo = requisicoesInfo.find((req) => req.id == requisicaoID);

  if (!requisicaoSelecionadaInfo) {
   return res.status(200).send({ codStatus: 204, message: "Requisição não encontrada", data: null })
  }

  orcamentosInfo.every((orcamento) => {
   if (orcamento.id == requisicaoSelecionadaInfo.orcamento_id) {
    requisicaoSelecionadaInfo["orcamento"] = orcamento;
    return false;
   }
   return true;
  })

  centrosCustoInfo.every((ccusto) => {
   if (ccusto.id == requisicaoSelecionadaInfo.centro_custo_id) {
    requisicaoSelecionadaInfo["centro_custo"] = ccusto;
    return false;
   }
   return true;
  })

  unidadesInfo.every((unidade) => {
   if (unidade.id == requisicaoSelecionadaInfo.unidade_id) {
    requisicaoSelecionadaInfo["unidade"] = unidade;
    return false;
   }
   return true;
  })

  contaContabeisInfo.every((ccontabil) => {
   if (ccontabil.id == requisicaoSelecionadaInfo.conta_contabil_id) {
    requisicaoSelecionadaInfo["conta_contabil"] = ccontabil;
    return false;
   }
   return true;
  })

  if (requisicaoSelecionadaInfo.projeto_id) {
   projetosInfo.every((projeto) => {
    if (projeto.id == requisicaoSelecionadaInfo.projeto_id) {
     requisicaoSelecionadaInfo["projeto"] = projeto;
     return false;
    }
    return true;
   })
  } else {
   requisicaoSelecionadaInfo["projeto"] = "";
  }
  res.status(200).send(requisicaoSelecionadaInfo);

 } catch (err) {
  return res.status(500).send({ codStatus: 500, message: err })
 }

});


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ### NOTAS FISCAIS - LISTAGEM POR REQUISIÇÃO
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.get("/notas-fiscais/requisicao/:requisicaoID", async (req, res) => {
 try {
  const { requisicaoID } = req.params;

  const notasFiscaisPath = path.join(__dirname, 'public/dados', 'notas_fiscais.json');
  const fornecedoresPath = path.join(__dirname, 'public/dados', 'fornecedores.json');

  let notasFiscaisInfo = await carregarArquivo(notasFiscaisPath);
  let fornecedorInfo = await carregarArquivo(fornecedoresPath);

  let notasFiscaisInfoFiltrado = notasFiscaisInfo.filter((nf) => nf.req_id == requisicaoID).map((nf) => {
   const fornecedorEncontrado = fornecedorInfo.find((fornecedor) => fornecedor.id == nf.fornecedor_id);
   if (fornecedorEncontrado) {
    nf.fornecedor = fornecedorEncontrado;
   }
   return nf;
  });

  res.status(200).send({ codStatus: 200, message: "OK", data: notasFiscaisInfoFiltrado });

 } catch (err) {
  res.status(500).send(err);
 }
});

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ### NOTA FISCAL - CADASTRAR
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.post("/notas-fiscais", async (req, res) => {
 try {
  const nfData = req.body;
  console.log(nfData)
  if (!nfData.req_id) {
   throw { codStatus: 422, message: "Id da requisição não enviado.", data: null };
  }

  let nfsInfo = await carregarArquivo(notasFiscaisPath);
  let nfExistente = nfsInfo.filter((nf) => nf.nf_numero == nfData.nf_numero && nf.fornecedor_id == nfData.fornecedor_id);

  if (nfExistente.length) {
   throw { codStatus: 422, message: "A nota fiscal desse fornecedor já foi cadastrada.", data: null }
  }

  let nfID = 1;

  if (nfsInfo.length) {
   nfID = nfsInfo[nfsInfo.length - 1].id + 1
  }

  const nfInfo = { ...nfData, id: nfID };
  nfsInfo.push(nfInfo);

  await salvarArquivo(notasFiscaisPath, nfsInfo)

  return res.status(200).send({ codStatus: 200, message: "OK", data: nfsInfo });

 } catch (err) {
  if (err.codStatus) {
   return res.status(err.codStatus).send(err)
  }
  return res.status(500).send(err);
 }
});

















// FUNÇÕES PARA SALVAR E CARREGAR ARQUIVO.
async function salvarArquivo(caminhoArquivo, dados) {
 try {
  const jsonData = JSON.stringify(dados, null, 2);
  await fs.writeFile(caminhoArquivo, jsonData, 'utf8');

  return { codStatus: 200, message: "OK" };
 } catch (err) {
  console.error("Erro ao salvar o arquivo JSON:", err.message);
  throw { codStatus: 500, message: err };
 }
}

async function carregarArquivo(caminhoArquivo) {
 try {
  const data = await fs.readFile(caminhoArquivo, 'utf8');
  const jsonData = JSON.parse(data);

  return jsonData;
 } catch (err) {
  console.error('Erro ao carregar o arquivo JSON:', err);
  throw { codStatus: 500, message: err };
 }
}







// Inicie o servidor
app.listen(PORT, () => {
 console.log(`Servidor rodando em http://localhost:${PORT}`);
});
