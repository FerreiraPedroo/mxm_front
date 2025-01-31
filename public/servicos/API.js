class API {
 static URLBase = "http://localhost:3000"
 constructor() {}
 
 static async getFetch(URL, method, headersData = "", bodyData = "") {
  const fetchConfig = { method }
  if(headersData) fetchConfig["headers"] = headersData;
  if(bodyData) fetchConfig["body"] = bodyData;

  const resposta = await fetch(URL, fetchConfig)
  const respostaData = await resposta.json();
  return respostaData;
 }

 // REQUISIÇÃO LISTA  ////////////////////////////////////////////////////////////////////////////////////////////
 static async reqLista() {
  const resposta = await this.getFetch(`${this.URLBase}/requisicoes`, "GET");
  return resposta;
 }

 // REQUISIÇÃO SELECIONADA  //////////////////////////////////////////////////////////////////////////////////////
 static async reqSelecionada(requisicaoID) {
  const resposta = await this.getFetch(`${this.URLBase}/requisicao-selecionada/${requisicaoID}`, "GET");
  return resposta;
 }
 
 // REQUISIÇÃO SELECIONADA - NOTA FISCAL LISTA  //////////////////////////////////////////////////////////////////
 static async reqSelecionadaNFs(requisicaoID) {
  const resposta = await this.getFetch(`${this.URLBase}/requisicao-selecionada/${requisicaoID}/notas-fiscais`, "GET");
  return resposta;
 }
 
 // NOTA FISCAL SALVAR  //////////////////////////////////////////////////////////////////////////////////////////
 static async notaFiscalSalvar(nfData) {
  const resposta = await this.getFetch(`${this.URLBase}/nota-fiscal`, "POST", null, nfData);
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
    }).catch((error)=> {
        console.log({error});
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
    }).catch((error)=> {
        console.log({error});
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
    }).catch((error)=> {
        console.log({error});
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
    }).catch((error)=> {
        console.log({error});
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
    }).catch((error)=> {
        console.log({error});
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
    }).catch((error)=> {
        console.log({error});
    });
  return response;
}



// #################################################################
// ###  REQUISIÇÃO: SALVAR  ########################################
// #################################################################
async function salvarNovaRequisicao(data) {
 const responseFetch = await fetch("http://localhost:3000/requisicao-novo", {
  method: "POST",
  headers: {"content-type": "application/json"},
  body: JSON.stringify(data)
 })
 const responseData = await responseFetch.json()
 return responseData;
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
  }).catch((error)=> {
   console.log({error});
   return [];
  });
 return response;
}









