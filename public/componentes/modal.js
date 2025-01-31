// #################################################################
// #################################################################
// ###  MODAL: SELECIONAR E ABRIR O MODAL  #########################
// #################################################################
// #################################################################
async function modalOpen(modalSelecionado) {
 const modalEl = document.getElementById("modal-container");
 let HTML = "";

 switch(modalSelecionado) {
  case "requisicao-selecionada-nota-fiscal":
   const HTMLFilho = await reqSelecionadaNotaFiscalHTML();
   HTML += modalHTML("REGISTRO DE NOTA FISCAL", HTMLFilho)
  break;

  case "":
  break;

  case "":
  break;
 }

 modalEl.innerHTML = HTML; 
 modalEl.style.display = "flex";
}

// #################################################################
// #################################################################
// ###  MODAL: FECHAR O MODAL  #####################################
// #################################################################
// #################################################################
function modalClose() {
 const modalEl = document.getElementById("modal-container");
 modalEl.innerHTML = "";
 modalEl.style.display = "none";
}

// #################################################################
// #################################################################
// ###  ESTRUTURA DO MODAL  ########################################
// #################################################################
// #################################################################

function modalHTML(titulo, HTMLFilho) {
 let HTML = "";

 HTML += `
  <div id="modal-container-fundos">
   <div id="modal-container-frente">
    <div id="modal-cabecalho">
     <div id="modal-cabecalho-titulo">${titulo}</div>
       <div id="modal-cabecalho-botao-fechar" onclick="modalClose()">X</div>
     </div>
     <div id="modal-conteudo">${HTMLFilho}</div>
    </div>
   </div>
  </div>`;

 return HTML;
}




// #################################################################
// #################################################################
// ###  DADOS DO MODAL  ############################################
// #################################################################
// #################################################################
// ----------------------------------------------------------------
// --- MODAL HTML: REGISTRO DE NOTA FISCAL  -----------------------
// ----------------------------------------------------------------
async function reqSelecionadaNotaFiscalHTML () {
 //const fornecedorList = await APIFornecedoresCarregarDados();
 const fornecedorList = []

 return `
   <form id="modal-conteudo-box" method="POST" onsubmit="cadastrarNF(this)" >
    <div class="modal-input-dual-box">
     ${ComponentInputHTML.getHTML("date","dt_recebimento", "Data de recebimento")}
     ${ComponentInputHTML.getHTML("text","pedido_compras", "Pedido de compras")}
    </div>
    <div class="modal-input-dual-box">
     ${ComponentInputHTML.getHTML("text", "nf_numero", "Número da NF")}
     ${ComponentInputHTML.getHTML("text", "valor", "Valor da NF")}
    </div>
    ${ComponentInputHTML.getHTML("select","fornecedor", "Fornecedor", fornecedorList, ["id","nome"])}
    ${ComponentInputHTML.getHTML("textarea", "observacao", "Observação")}
     <div id="modal-botoes-box">
      <input type="submit" id="modal-botao" value="SALVAR"></input>
     </div>
   </form>
   `;
}

async function cadastrarNF(e) {
 event.preventDefault();

 const entries = new FormData(e);
 const nfData = Object.fromEntries(entries);

 const urlParams = new URLSearchParams(window.location.search);
 nfData["requisicaoID"] = urlParams.get("requisicaoID");

 console.log(nfData)

 const response = await API.notaFiscalSalvar(nfData)
  .then(async (response) => {
   if (response.status == 200) {
    modalClose()
   }
  }).catch((error)=> {
   alert("ERRO AO SALVAR A NOTA FISCAL TENTE NOVAMENTE")
   console.log({error});
  });

}



 //const urlParams = new URLSearchParams(window.location.search);
 //const requisicaoID = urlParams.get("requisicaoID");
 // const numeroNF = document.getElementById("nf_numero").value;
 // const valorNF = document.getElementById("valor").value;
 // const fornecedor = document.getElementById("fornecedor").value;
 // const pedidoCompra = document.getElementById("pedido_compras").value;
 // const dataRecebimento = document.getElementById("dt_recebimento").value;
 // const observacao = document.getElementById("observacao").value;
 // console.log({numeroNF,valorNF,fornecedor,pedidoCompra,dataRecebimento,observacao});


