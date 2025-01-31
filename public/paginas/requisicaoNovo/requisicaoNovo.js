let orcamentoListaInfo = [];
let contaContabilListaInfo = [];
let centrosCustoListaInfo = [];
let unidadeListaListaInfo = [];
let projetosListaInfo = [];
let rubricasListaInfo = [];
const mesesDoAno = ["JANEIRO-25","FEVEREIRO-25","MARÇO-25","ABRIL-25","MAIO-25","JUNHO-25","JULHO-25","AGOSTO-25","SETEMBRO-25","OUTUBRO-25","NOVEMBRO-25","DEZEMBRO-25"];


// #################################################################
// ###  INICIALIZAÇÃO DOS SCRIPTS DA PÁGINA  #######################
// #################################################################
(async () => {
//carregarMenuPrincipal();

contaContabilListaInfo = await contasContabeisCarregarDados();
orcamentoListaInfo = await orcamentosCarregarDados();
unidadeListaInfo = await unidadesCarregarDados();
centrosCustoListaInfo = await centrosCustoCarregarDados();
rubricasListaInfo = await rubricasCarregarDados();
// projetosListaInfo = await projetosCarregarDados();


// ###  CARREGAR HTML ADICIONAL ########################
let componentesHTML = "";

componentesHTML += componentesHTML("orcamento", orcamentoListaInfo, true);
componentesHTML += componentesHTML("orcamento", orcamentoListaInfo, true);

componentesHTML += componentesHTML("orcamento", orcamentoListaInfo, true);

componentesHTML += `<div class="input-dual-box">`;
componentesHTML += componentesHTML("centros_custo", centrosCustoListaInfo, false);
componentesHTML += componentesHTML("unidade", unidadeListaInfo, false);
componentesHTML += `</div>`;

componentesHTML += componentesHTML("conta_contabil", contaContabilListaInfo, false);

componentesHTML += componentesHTML("classificacao", false);
componentesHTML += componentesHTML("projeto", [], false);
componentesHTML += componentesHTML("justificativa", [], false);

const componentesEl = document.getElementById("formulario-campos");
componentesEl.innerHTML = componentesHTML;

const valorOrcadoEl = document.getElementById("mes_orcado");
valorOrcadoEl.innerHTML = mesesDoAno.reduce((acc,mes)=> acc + `<option value="${mes}">${mes}</option>`,"<option value=''>-</option>");



// ###  ADICIONANDO OS EVENT LISTENERS DO HTML ########################
const orcadoEl = document.getElementById("orcado");
orcadoEl.addEventListener("change",(e)=>selecionaOrcado(e)); // EVENTO DO SELECT DO ORÇADO

const formEl = document.getElementById("form-container");
formEl.addEventListener("submit",(e)=>enviarFormularioNovaRequisicao(e)); // EVENTO ENVIAR FORMULARIO


})();



// #################################################################
// ###  TEXT AREA  #################################################
// #################################################################
function componentTextAreaHTML(nomeTextArea, disabled) {
let textAreaHTML = "";

 switch (nomeTextArea) {

  case "justificativa":
    textAreaHTML += `
    <div>
      <label class="form-input-label" for="justificativa">Justificativa:</label>
      <textarea id="justificativa" class="form-input form-textarea" name="justificativa" ${disabled && "disabled"}></textarea>
    </div>
    `;
  break;


  default:
  break;

 }

 return textAreaHTML;
}








// #################################################################
// ###  SELECIONA ORÇADO - SIM/NÃO  ################################
// #################################################################
function selecionaOrcado(event){
const contaContabilEl = document.getElementById("conta_contabil_id");
const centrosCustoEl = document.getElementById("centro_custo_id");
const classificacaoEl = document.getElementById("classificacao");
const justificativaEl = document.getElementById("justificativa");
const orcamentoEl = document.getElementById("orcamento_id");
const unidadeEl = document.getElementById("unidade_id");
const projetoEl = document.getElementById("projeto_id");
const valorOrcadoEl = document.getElementById("mes_orcado");

if (event.target.value == "NAO") {
  centrosCustoEl.selectedIndex = 0;
  centrosCustoEl.removeAttribute("disabled");

  contaContabilEl.selectedIndex = 0;
  contaContabilEl.removeAttribute("disabled");

  classificacaoEl.selectedIndex = 0;
  classificacaoEl.removeAttribute("disabled");

  justificativaEl.selectedIndex = 0;
  justificativaEl.removeAttribute("disabled");

  orcamentoEl.selectedIndex = 0;
  orcamentoEl.setAttribute("disabled",true);

  unidadeEl.selectedIndex = 0;
  unidadeEl.removeAttribute("disabled");

  projetoEl.selectedIndex = 0;
  projetoEl.removeAttribute("disabled");

 valorOrcadoEl.innerHTML = mesesDoAno.reduce((acc,mes)=> acc + `<option value="${mes}">${mes}</option>`,"<option value=''>-</option>");

} else {
  centrosCustoEl.selectedIndex = 0;
  centrosCustoEl.setAttribute("disabled",true);

  contaContabilEl.selectedIndex = 0;
  contaContabilEl.setAttribute("disabled",true);

  classificacaoEl.selectedIndex = 0;
  classificacaoEl.setAttribute("disabled",true);

  justificativaEl.selectedIndex = 0;
  justificativaEl.setAttribute("disabled",true);

  orcamentoEl.selectedIndex = 0;
  orcamentoEl.removeAttribute("disabled");

  unidadeEl.selectedIndex = 0;
  unidadeEl.setAttribute("disabled",true);

  projetoEl.selectedIndex = 0;
  projetoEl.setAttribute("disabled",true);
}

}


// #################################################################
// ###  ORÇAMENTO SELECIONADO  #####################################
// #################################################################
async function orcamentoSelecionado(id){

const contaContabilEl = document.getElementById("conta_contabil_id");
const centrosCustoEl = document.getElementById("centro_custo_id");
const classificacaoEl = document.getElementById("classificacao");
const justificativaEl = document.getElementById("justificativa");
const orcamentoEl = document.getElementById("orcamento_id");
const unidadeEl = document.getElementById("unidade_id");
const projetoEl = document.getElementById("projeto_id");
const valorOrcadoEl = document.getElementById("mes_orcado");

const orcamentoInfo = orcamentoListaInfo.find((orc)=> orc.id == id);

if (orcamentoInfo) {
 contaContabilEl.value = orcamentoInfo.conta_contabil_id;
 centrosCustoEl.value = orcamentoInfo.centro_custo_id; 
 justificativaEl.value = orcamentoInfo.justificativa;
 classificacaoEl.value = orcamentoInfo.classificacao;

 const centroCustoFind = centrosCustoListaInfo.find((ccusto) => ccusto.id == orcamentoInfo.centro_custo_id);
 unidadeEl.value = centroCustoFind.unidade_id;

 if(orcamentoInfo.projeto_id != "NULL"){
  projetoEl.value = orcamentoInfo.projeto_id;
 }


 const orcamentoValores = await orcamentoValoresCarregarDados();
 valorOrcadoEl.innerHTML = `<option value="">-</option>`;

 orcamentoValores.forEach((orcado)=>{
  const optionEl = document.createElement("option");
  optionEl.value = orcado.id;
  optionEl.innerText = orcado.mes + " - R$" + orcado.valor;
  valorOrcadoEl.appendChild(optionEl)
 })


} else {
 contaContabilEl.value = "";
 centrosCustoEl.value = "";
 justificativaEl.value = "";
 classificacaoEl.value = "";
 unidadeEl.value = "";
 projetoEl.value = "";

 const optionEl = document.createElement("option");
 optionEl.value = "";
 optionEl.innerText = "-";
 valorOrcadoEl.innerText = "";
 valorOrcadoEl.appendChild(optionEl);
 valorOrcadoEl.selected = "";

 centrosCustoEl.selectedIndex = 0;
 centrosCustoEl.setAttribute("disabled",true);

 classificacaoEl.selectedIndex = 0;
 classificacaoEl.setAttribute("disabled",true);

 justificativaEl.selectedIndex = 0;
 justificativaEl.setAttribute("disabled",true);

 orcamentoEl.selectedIndex = 0;
 orcamentoEl.removeAttribute("disabled");

 unidadeEl.selectedIndex = 0;
 unidadeEl.setAttribute("disabled",true);

 projetoEl.selectedIndex = 0;
 projetoEl.setAttribute("disabled",true);
}

}







// #################################################################
// ###  ENVIAR FORMULARIO  #########################################
// #################################################################
async function enviarFormularioNovaRequisicao(e){
 e.preventDefault();
 const tamanho = e.target.length - 1;
 
 const reqInfo = {}
 for(let pos=0; pos < tamanho; pos++) {
  reqInfo[e.target[pos].name] = e.target[pos].value ? e.target[pos].value: "NULL"; 
 }

 const novaRequisicao = await salvarNovaRequisicao(reqInfo);

 if(novaRequisicao.codStatus == 200){
  openNotification()
 }
}




// #################################################################
// ###  NOTIFICAÇÃO  ###############################################
// #################################################################
function openNotification() {
 const notificationEl = document.getElementById("notification-container");
 notificationEl.style.display = "flex";
}

function closeNotification() {
 const notificationEl = document.getElementById("notification-container");
 window.location.reload();
}
















