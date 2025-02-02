class API {
 static URLBase = "http://localhost:3000"
 constructor() { }

 static async getDados(URL, method, headersData = "", bodyData = "") {
  const fetchConfig = { method }
  if (headersData) fetchConfig["headers"] = headersData;
  if (bodyData) fetchConfig["body"] = JSON.stringify(bodyData);

  let respostaData = null
  try {
   const resposta = await fetch(URL, fetchConfig)
   respostaData = await resposta.json();

  } catch (error) {
   console.log({ error })
  }
  return respostaData;
 }

 // REQUISIÇÃO LISTA  ////////////////////////////////////////////////////////////////////////////////////////////
 static async reqLista() {
  const resposta = await this.getDados(`${this.URLBase}/requisicoes`, "GET");
  return resposta;
 }

 // REQUISIÇÃO SALVAR  /////////////////////////////////////////////////////////////////////////////////////////////////
 static async reqNovo(data) {
  const resposta = await this.getDados(`${this.URLBase}/requisicoes`, "POST", { "content-type": "application/json" }, data);
  return resposta;
 }

 // REQUISIÇÃO SELECIONADA  //////////////////////////////////////////////////////////////////////////////////////
 static async reqSelecionada(requisicaoID) {
  const resposta = await this.getDados(`${this.URLBase}/requisicoes/${requisicaoID}`, "GET");
  return resposta;
 }

 // REQUISIÇÃO SELECIONADA - TAB - MATERIAIS LISTA  ////////////////////////////////////////////////////////////////////
 static async reqSelecionadaMateriais(requisicaoID) {
  const resposta = await this.getDados(`${this.URLBase}/requisicoes/${requisicaoID}/materiais`, "GET");
  return resposta;
 }

 // NOTA FISCAL - LISTA  //////////////////////////////////////////////////////////////////
 static async reqSelecionadaNFs(requisicaoID) {
  const resposta = await this.getDados(`${this.URLBase}/notas-fiscais/requisicao/${requisicaoID}`, "GET");
  return resposta;
 }

 // NOTA FISCAL - CADASTRAR  ///////////////////////////////////////////////////////////////////////////////////////////////
 static async notaFiscalCadastrar(nfData) {
  const resposta = await this.getDados(`${this.URLBase}/notas-fiscais`, "POST", { "content-type": "application/json" }, nfData);
  return resposta;
 }

 
 // FORNECEDOR LISTA  ////////////////////////////////////////////////////////////////////////////////////////////
 static async fornecedorLista() {
  const resposta = await this.getDados(`${this.URLBase}/fornecedores`, "GET");
  return resposta;
 }


}


// #################################################################
// ###  ORÇAMENTO  ##################################################
// #################################################################
async function orcamentosCarregarDados() {
 const response = await fetch("http://localhost:3000/orcamentos", { method: "GET" })
  .then(async (response) => {
   if (response.status == 200) {
    const data = await response.json();
    return data;
   }
  }).catch((error) => {
   console.log({ error });
  });
 return response;
}


// #################################################################
// ###  UNIDADES  ####################################################
// #################################################################
async function unidadesCarregarDados() {
 const response = await fetch("http://localhost:3000/unidades", { method: "GET" })
  .then(async (response) => {
   if (response.status == 200) {
    const data = await response.json();
    return data;
   }
  }).catch((error) => {
   console.log({ error });
  });
 return response;
}


// #################################################################
// ###  CENTROS DE CUSTO  ############################################
// #################################################################
async function centrosCustoCarregarDados() {
 const response = await fetch("http://localhost:3000/centros-custo", { method: "GET" })
  .then(async (response) => {
   if (response.status == 200) {
    const data = await response.json();
    return data;
   }
  }).catch((error) => {
   console.log({ error });
  });
 return response;
}


// #################################################################
// ###  CONTAS CONTABÉIS  ############################################
// #################################################################
async function contasContabeisCarregarDados() {
 const response = await fetch("http://localhost:3000/contas-contabeis", { method: "GET" })
  .then(async (response) => {
   if (response.status == 200) {
    const data = await response.json();
    return data;
   }
  }).catch((error) => {
   console.log({ error });
  });
 return response;
}


// #################################################################
// ###  RUBRICAS  ##################################################
// #################################################################
async function rubricasCarregarDados() {
 const response = await fetch("http://localhost:3000/rubricas", { method: "GET" })
  .then(async (response) => {
   if (response.status == 200) {
    const data = await response.json();
    return data;
   }
  }).catch((error) => {
   console.log({ error });
  });
 return response;
}


// #################################################################
// ###  ORÇAMENTO  #################################################
// #################################################################
async function orcamentoValoresCarregarDados() {
 const response = await fetch("http://localhost:3000/orcamento-valores", { method: "GET" })
  .then(async (response) => {
   if (response.status == 200) {
    const data = await response.json();
    return data;
   }
  }).catch((error) => {
   console.log({ error });
  });
 return response;
}


// #################################################################
// #################################################################
// ###  FORNECEDOR: LISTA  #########################################
// #################################################################
// #################################################################

// ----------------------------------------------------------------
// --- LISTA DE FORNECEDORES  -------------------------------------
// ----------------------------------------------------------------
async function APIFornecedoresCarregarDados() {
 const response = await fetch(`http://localhost:3000/fornecedores`, { method: "GET" })
  .then(async (response) => {
   if (response.status == 200) {
    const data = await response.json();
    return data;
   }
  }).catch((error) => {
   console.log({ error });
   return [];
  });
 return response;
}









