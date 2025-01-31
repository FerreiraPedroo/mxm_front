/**
* No parametro 'listaCampos' o primeiro elemento será o valor da option do select, caso queira que o
* valor seja exibido no texto de exibição da option repetir o primeiro elemento.
* Ex: ["ID", "ID", "nome"] -> o valor da option é ID e o texto exibido será 'ID + nome'
* 
*
*/
class ComponentInputHTML {
 constructor(){}

 static getHTML(tipoInput, nomeInput, nomeLabel, listaDados = [], listaCampos = []) {

  switch(tipoInput) {
   case "text":
    return this.inputText(nomeInput, nomeLabel);
   break;

   case "textarea":
    return this.inputTextArea(nomeInput, nomeLabel);
   break;

   case "select":
    return this.inputSelect(nomeInput, nomeLabel, listaDados, listaCampos)
   break;

   case "date":
    return this.inputDate(nomeInput, nomeLabel)
   break;

   case "text":
   break;
  }

 }

 static inputText(nomeInput, nomeLabel) {
  return `
  <div class="input-box">
   <label class="input-label" for="${nomeInput}">${nomeLabel}</label>
   <input type="text" id="${nomeInput}" class="input-data-info" name="${nomeInput}" />
  </div>
 `;
 }
 
 static inputTextArea(nomeInput, nomeLabel) {
  return `
  <div class="input-box">
   <label class="input-label" for="${nomeInput}">${nomeLabel}</label>
   <textarea id="${nomeInput}" class="input-data-info textarea-data-info" name="${nomeInput}"></textarea>
  </div>
 `;
 }

 static inputDate(nomeInput, nomeLabel) {
  return `
  <div class="input-box">
   <label class="input-label" for="${nomeInput}">${nomeLabel}</label>
   <input type="date" id="${nomeInput}" class="input-data-info" name="${nomeInput}" />
  </div>
 `;
 }

 // NO PARAMENTRO 'listaCampos' O PRIMEIRO ELEMENTO REPRESENTA O VALOR DO OPTION
 // ELE É EXLCUIDO (SLICE) DO NOME QUE SERÁ EXIBIDO NO OPTION.
 static inputSelect(nomeInput, nomeLabel, listaDados, listaCampos) {
  return `
    <div class="input-box">
     <label class="input-label" for="${nomeInput}">${nomeLabel}:</label>
     <select id="${nomeInput}" class="input-data-info" name="${nomeInput}">
      <option value="" selected>Selecione uma opção</option>
      ${
       listaDados.reduce((acc, cur) => {
        acc+=`<option value="${listaCampos[0]}">${
          Object.entries(cur).reduce((acc,[key,value],index) => {
           if(listaCampos.slice(1).includes(key)){
            if(acc) acc += " - ";
            acc = acc + value;
           }
           return acc;
          },"")
         }</option>`;
        return acc;
       },"")
      }
     </select>
    </div>`;
 }
 
}





// #################################################################
// ###  INPUT READONLY  ############################################
// #################################################################
function componenteInputReadOnlyHTML(nomeInput, nomeLabel, textoExibido) {
 let HTML = "";

 HTML = `
  <div class="input-box">
   <label class="input-label" for="${nomeInput}">${nomeLabel}</label>
   <input type="text" id="${nomeInput}" class="input-data-info" name="${nomeInput}" readonly value="${textoExibido}" />
  </div>
 `;

 return HTML;
}


// #################################################################
// ###  INPUT  #####################################################
// #################################################################
function componenteInputHTML(nomeInput, nomeLabel) {
 let HTML = "";

 HTML = `
  <div class="input-box">
   <label class="input-label" for="${nomeInput}">${nomeLabel}</label>
   <input type="text" id="${nomeInput}" class="input-data-info" name="${nomeInput}" />
  </div>
 `;

 return HTML;

}



// #################################################################
// ###  TEXTAREA READONLY  #########################################
// #################################################################
function componenteTextAreaReadOnlyHTML(nomeInput, nomeLabel) {
 let HTML = "";

 HTML = `
  <div class="input-box">
   <label class="input-label" for="${nomeInput}">${nomeLabel}</label>
   <textarea id="${nomeInput}" class="input-data-info textarea-data-info" name="${nomeInput}" readonly ></textarea>
  </div>
 `;

 return HTML;

}




// #################################################################
// ###  SELECT  ####################################################
// #################################################################

function componentesHTML(nomeHTML, listaDados, disabled) {
let HTML = "";

 switch (nomeHTML) {
  case "orcamento":
   HTML = `
    <div id="orcamento_box" class="input-box">
     <label class="input-label" for="orcamento_id">Orçamento:</label>
     <select id="orcamento_id" class="input-data-info" name="orcamento_id" onchange="orcamentoSelecionado(this.value)" ${disabled ? "disabled" : ""}>
      <option value="" selected>Selecione uma opção</option>
      ${
       listaDados.reduce((acc, cur) => {
        acc+=` <option value="${cur.id}">${cur.cod_fac + " - " + cur.justificativa}</option>`;
        return acc;
       },"")
      }
     </select>
    </div>`;
   break;
  
  case "unidade":
   HTML = `
    <div id="unidade_box" class="input-box">
     <label class="input-label" for="unidade_id">Unidade:</label>
     <select id="unidade_id" class="input-data-info" name="unidade_id" ${disabled ? "disabled" : ""}>
      <option value="" selected>Selecione uma opção</option>
      ${
       listaDados.reduce((acc, cur) => {
       acc+=` <option value="${cur.id}">${cur.sigla + " - " + cur.nome}</option>`;
       return acc;
       },"")
      }
     </select>
    </div>`;
  break;

  case "centros_custo":
   HTML = `
    <div id="centro_custo_box" class="input-box">
     <label class="input-label" for="centro_custo_id">Centros de custo:</label>
     <select id="centro_custo_id" class="input-data-info" name="centro_custo_id" ${disabled ? "disabled" : ""} >
      <option value="" selected>Selecione uma opção</option>
      ${
       listaDados.reduce((acc, cur) => {
        acc+=` <option value="${cur.id}">${cur.codigo + " - " + cur.nome + " - " + cur.unidade}</option>`;
        return acc;
       },"")
      }
     </select>
    </div>`;
  break;

  case "classificacao":
   HTML = `
    <div id="classificacao_box" class="input-box">
     <label class="input-label" for="classificacao">Classificação:</label>
     <select id="classificacao" class="input-data-info" name="classificacao" ${disabled ? "disabled" : ""} >
      <option value="">Selecione uma opção</option>
      <option value="CAPEX">CAPEX</option>
      <option value="OPEX">OPEX</option>
     </select>
    </div>`;
  break;

  case "projeto":
   HTML = `
    <div id="projeto_box" class="input-box">
     <label class="input-label" for="projeto_id">Projeto:</label>
     <select id="projeto_id" class="input-data-info" name="projeto_id" ${disabled ? "disabled" : ""}>
      <option value="">Selecione uma opção</option>
      ${
       listaDados.reduce((acc, cur) => {
        acc+=` <option value="${cur.id}">${cur.nome}</option>`;
        return acc;
       },"")
      }
     </select>
    </div>`;
  break;

  case "conta_contabil":
   HTML = `
    <div id="conta_contabil_box" class="input-box">
     <label class="input-label" for="conta_contabil_id">Conta contábil:</label>
     <select id="conta_contabil_id" class="input-data-info" name="conta_contabil_id" ${disabled ? "disabled" : ""} >
      <option value="">Selecione uma opção</option>
      ${
       listaDados.reduce((acc, cur) => {
        acc+=` <option value="${cur.id}">${cur.nome}</option>`;
        return acc;
       },"")
      }
     </select>
    </div>`;
  break;

  case "fornecedor":
   HTML = `
    <div id="fornecedor_box" class="input-box">
     <label class="input-label" for="fornecedor_id">Fornecedor:</label>
     <select id="fornecedor_id" class="input-data-info" name="fornecedor_id" ${disabled ? "disabled" : ""} >
      <option value="">Selecione uma opção</option>
      ${
       listaDados.reduce((acc, cur) => {
        acc+=` <option value="${cur.id}">${cur.nome}</option>`;
        return acc;
       },"")
      }
     </select>
    </div>`;
  break;

  case "tipo_requisicao":
   HTML = `
    <div id="tipo_requisicao_box" class="input-box">
     <label class="input-label" for="tipo_requisicao">Tipo de requisição:</label>
     <select type="text" id="tipo_requisicao" class="input-data-info" name="tipo_requisicao" ${disabled ? "disabled" : ""}>
      <option value="">-</option>
      <option value="MATERIAL">MATERIAL</option>
      <option value="SERVIÇO">SERVIÇO</option>
     </select>
    </div>`;
  break;

  case "orcado":
   HTML = `
    <div id="orcado_box" class="input-box">
     <label class="input-label" for="orcado">Orçado:</label>
      <select id="orcado" class="input-data-info" name="orcado" ${disabled ? "disabled" : ""}>
       <option value="SIM">SIM</option>
       <option value="NAO" selected>NÃO</option>
      </select>
    </div>`;
  break;

  case "urgente":
   HTML = `
    <div id="urgente_box" class="input-box">
     <label class="input-label" for="urgente">Urgente:</label>
      <select id="urgente" class="input-data-info" name="urgente" ${disabled ? "disabled" : ""}>
       <option value="SIM">SIM</option>
       <option value="NAO" selected>NÃO</option>
      </select>
    </div>`;
  break;

  case "mes_orcado":
   HTML = `
    <div id="mes_orcado_box" class="input-box">
     <label class="input-label" for="mes_orcado">Custo p/mês:</label>
     <select type="text" id="mes_orcado" class="input-data-info" name="mes_orcado">
     </select>
    </div>`;
  break;

// #################################################################
// ###  TEXTAREA  ##################################################
// #################################################################

  case "justificativa":
   HTML = `
    <div id="justificativa_box" class="input-box">
     <label class="input-label" for="justificativa">Justificativa:</label>
     <textarea id="justificativa" class="input-data-info form-textarea" name="justificativa" ${disabled && "disabled"}></textarea>
    </div>`;
  break;

  case "detalhes_pedido":
   HTML = `
    <div id="detalhes_pedido_box" class="input-box">
     <label class="input-label" for="detalhes_pedido">Detalhes do Pedido:</label>
     <textarea id="detalhes_pedido" class="input-data-info form-textarea" name="detalhes_pedido"></textarea>
    </div>`;
  break;

  case "observacao":
   HTML = `
    <div id="observacao_box" class="input-box">
     <label class="input-label" for="observacao">Observações:</label>
     <textarea id="observacao" class="input-data-info form-textarea" name="observacao"></textarea>
    </div>`;
  break;

// #################################################################
// ###  INPUTS  ####################################################
// #################################################################
  case "requisicao":
   HTML = `
    <div id="req_box" class="input-box">
      <label class="input-label" for="req">Nº Requisição:</label>
      <input type="text" id="req" class="input-data-info" name="req" ${disabled && "disabled"} />
    </div>
   `;
  break;

  case "data_envio_req":
   HTML = `
    <div id="dt_envio_req_box" class="input-box">
      <label class="input-label" for="dt_envio_req">Data de envio:</label>
      <input type="date" id="dt_envio_req" class="input-data-info" name="dt_envio_req" ${disabled && "disabled"} />
    </div>
   `;
  break;

  case "nf_numero":
   HTML = `
    <div id="nf_numero_box" class="input-box">
      <label class="input-label" for="nf_numero">Número da NF:</label>
      <input type="text" id="nf_numero" class="input-data-info" name="nf_numero" ${disabled && "disabled"} />
    </div>
   `;
  break;

  case "valor":
   HTML = `
    <div id="valor_box" class="input-box">
      <label class="input-label" for="valor">Valor:</label>
      <input type="number" min="0.00" step="0.01" id="valor" class="input-data-info" name="valor" ${disabled && "disabled"} />
    </div>
   `;
  break;


  default:

  break;

 }

 return HTML;
}
