let requisicaoLista = [];

// CARREGA OS DADOS DAS REQUISIÇÕES DO BACK.
async function requisicoesCarregarDados() {
  const response = await fetch("http://localhost:3000/requisicoes", { method: "GET" })
    .then(async (response) => {
      if (response.status == 200) {
        const data = await response.json();
        requisicaoLista = data;
        }
    }).catch((error)=> {
        console.log({error});
    });
}



/*
* ----------------------------------------------------------------------------------
* REQUISIÇÃO LISTA
* ----------------------------------------------------------------------------------
*/
function requisicaoListaHTML() {
  let styleSheet = `<link rel="stylesheet" href="css/requisicao_lista.css">`;
  let inicioHTML = `
	<div id="table">
	<h2>Lista de requisições</h2>
	${menuAcoes("requisicoes-inicial")}
	<div id="file-table" class="file-table">
		<div class="file-header">
			<div class="file-column">DATA SOLICITAÇÃO</div>
			<div class="file-column">REQ</div>
			<div class="file-column">JUSTIFICATIVA</div>
			<div class="file-column">ORÇADO</div>
			<div class="file-column">CLASSIFICAÇÃO</div>
			<div class="file-column">URGENTE</div>
		</div>
  `;

  let rowsHTML = `<div class="file-row-empyt">VAZIO</div>`;

  if (requisicaoLista.length) {
        rowsHTML = requisicaoLista.reduce((acc, cur) => {
		const html = `
			<div class="file-row" data-id="${cur.id}">
				<div class="file-column">${cur.dt_solicitacao_req}</div>
				<div class="file-column">${cur.req}</div>
				<div class="file-column">${cur.justificativa}</div>
				<div class="file-column">${cur.orcado}</div>
				<div class="file-column">${cur.classificacao}</div>
				<div class="file-column">${cur.urgente}</div>
			</div>
		`;
		acc += html;
		return acc;

    },"");
  } else {
        inicioHTML =`<h2>Lista de requisições</h2><div id="file-table" class="file-table">`;
  }

const finalHTML = `</div></div>`;

const elementoHTML = styleSheet + inicioHTML + rowsHTML + finalHTML;

const el = document.getElementById("main-conteiner");

el.innerHTML = elementoHTML;

// ## LOCALIZAÇÃO: /script.js
// adicioa a cada linha um evento para quando o mouse passar por cima mudar a cor.
addEventSelectedRow();
// ##LOCALIZAÇÃO: /acoes.js
eventoAdicionarMenuAcoes();


const orcadoEl = document.getElementById("file-row");
orcadoEl.addEventListener("click",(e)=>requisicaoInfoHTML()); // EVENTO CLICK DO ORÇAMENTO

}


/*
* ----------------------------------------------------------------------------------
* REQUISIÇÃO NOVO
* ----------------------------------------------------------------------------------
*/
function requisicaoNovoHTML() {

let styleSheet = "";
let initialHTML = "";
let centerHTML = "";
let finalHTML = "";
let actionsJS = "";

styleSheet = `<link rel="stylesheet" href="css/requisicao_novo.css">`;

initialHTML = `
  <div class="form-container">
    <h2>Requisição de Materiais</h2>

    <label class="form-input-label" for="req">Requisição (ID):</label>
    <input type="text" id="req" class="form-input" name="req">

    <label class="form-input-label" for="orcado">Orçado:</label>
    <select id="orcado" class="form-input" name="orcado" click="mudarFormularioOrcado(this)">
      <option value="SIM">SIM</option>
      <option value="NAO" selected>NÃO</option>
    </select>

    <hr class="form-hr"></hr>
    <div id="form-orcado-fields"></div>
    <hr class="form-hr"></hr>

    <label class="form-input-label" for="orgente">Urgente:</label>
    <select id="orgente" class="form-input" name="urgente">
      <option value="SIM">SIM</option>
      <option value="NAO" selected>NAO</option>
    </select>

    ${componentSelectHTML("mes-lista")}

    <label class="form-input-label" for="valor_orcado">Valor orçado:</label>
    <input type="text" id="valor_orcado" class="form-input"  name="valor_orcado">

    <label class="form-input-label" for="detalhes_pedido">Detalhes do Pedido:</label>
    <textarea id="detalhes_pedido" class="form-input form-textarea" name="detalhes_pedido">material para manutenção</textarea>

    <label class="form-input-label" for="observacoes">Observações:</label>
    <textarea id="observacoes" class="form-input form-textarea" name="observacoes">várias observações</textarea>

    <button type="button" id="submitBtn" class="form-button">Enviar</button>
  </div>
`;

actionsJS = ``;

// ###  FINALIZAÇÃO HTML #############################################
const elementoHTML = styleSheet + initialHTML + centerHTML + finalHTML + actionsJS;
const el = document.getElementById("main-conteiner");
el.innerHTML = elementoHTML;


// ###  ADICIONANDO OS EVENT LISTENERS DO HTML ########################
const orcadoEl = document.getElementById("orcado");
orcado.addEventListener("change",(e)=>selecionaOrcado(e)); // EVENTO DO SELECT DO ORÇADO

// ###  INICIALIZAÇÃO DAS FUNÇÕES INICIAIS HTML ########################
selecionaOrcado({target:{value: "NAO"}}); // SELECIONA O ORÇADO "NÃO COMO PADRÃO INICIAL


/*
* ----------------------------------------------------------------------------------
* REQUISIÇÃO INFORMAÇÕES
* ----------------------------------------------------------------------------------
*/
function requisicaoInfoHTML(orcadoEl) {

let styleSheet = "";
let initialHTML = "";
let centerHTML = "";
let finalHTML = "";
let actionsJS = "";

styleSheet = `<link rel="stylesheet" href="css/requisicao_info.css">`;

initialHTML = `
  <div class="form-container">
    <h2>Requisição de Materiais</h2>

    <div class="req-info-block">
      <label class="form-input-label" for="req">Requisição (ID):</label>
      <input type="text" id="req" class="form-input" name="req" readonly/>

      <label class="form-input-label" for="dt_registro">Data registro:</label>
      <input type="text" id="dt_registro" class="form-input" name="dt_registro" readonly/>

      <label class="form-input-label" for="status">Status:</label>
      <input type="text" id="status" class="form-input" name="status" readonly/>
    </div>

    <label class="form-input-label" for="orcado">Orçado:</label>
    <input id="orcado" class="form-input" name="orcado" readonly/>

    <hr class="form-hr"></hr>
    <div id="form-orcado-fields"></div>
    <hr class="form-hr"></hr>

    <label class="form-input-label" for="orgente">Urgente:</label>
    <select id="orgente" class="form-input" name="urgente" readonly>
      <option value="SIM">SIM</option>
      <option value="NAO" selected>NAO</option>
    </select>

    ${componentSelectHTML("mes-lista")}

    <label class="form-input-label" for="valor_orcado">Valor orçado:</label>
    <input type="text" id="valor_orcado" class="form-input"  name="valor_orcado" readonly>

    <label class="form-input-label" for="detalhes_pedido">Detalhes do Pedido:</label>
    <textarea id="detalhes_pedido" class="form-input form-textarea" name="detalhes_pedido">material para manutenção</textarea>

    <label class="form-input-label" for="observacoes">Observações:</label>
    <textarea id="observacoes" class="form-input form-textarea" name="observacoes">várias observações</textarea>

    <button type="button" id="submitBtn" class="form-button">Enviar</button>
  </div>
`;

actionsJS = ``;

// ###  FINALIZAÇÃO HTML #############################################
const elementoHTML = styleSheet + initialHTML + centerHTML + finalHTML + actionsJS;
const el = document.getElementById("main-conteiner");
el.innerHTML = elementoHTML;


// ###  ADICIONANDO OS EVENT LISTENERS DO HTML ########################
const orcadoEl = document.getElementById("orcado");
orcado.addEventListener("change",(e)=>selecionaOrcado(e)); // EVENTO DO SELECT DO ORÇADO


// ###  INICIALIZAÇÃO DAS FUNÇÕES INICIAIS HTML ########################
selecionaOrcado({target:{value: "NAO"}}); // SELECIONA O ORÇADO "NÃO COMO PADRÃO INICIAL



}










// #################################################################
// ###  FUNÇÕES #####################################################
// #################################################################
function selecionaOrcado(event){
const orcamentoBoxEl = document.getElementById("form-orcado-fields");

let orcadoHTML = "";
let disableField = false;

if (event.target.value == "SIM") {
    orcadoHTML += `${componentSelectHTML("orcamento-lista")}`;
    disableField = true;
}

orcadoHTML += `
    ${componentSelectHTML("centro-custo-lista", disableField)}
    ${componentSelectHTML("conta-contabil-lista", disableField)}
    ${componentSelectHTML("unidade-lista", disableField)}

    <label class="form-input-label" for="classificacao">Classificação:</label>
    <select id="classificacao" class="form-input" name="classificacao" disabled="${disableField}">
      <option value="">Selecione uma opção</option>
      <option value="CAPEX">CAPEX</option>
      <option value="OPEX">OPEX</option>
    </select>

    ${componentSelectHTML("projeto-lista", disableField)}
    
    <label class="form-input-label" for="justificativa">Justificativa:</label>
    <textarea id="justificativa" class="form-input form-textarea" name="justificativa" disabled="${disableField}">Material de Manut</textarea>
`;

orcamentoBoxEl.innerHTML = orcadoHTML;

}

}


















