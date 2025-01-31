let orcamentoLista = [];

async function orcamentoCarregarDados() {
  const response = await fetch("http://localhost:3000/orcamentos", { method: "GET" })
		.then(async (response) => {
			if (response.status == 200) {
				const data = await response.json();
				orcamentoLista = data;
			}
		}).catch((error)=> {
			console.log({error});
		});
}

async function orcamentoCarregarHTML() {
  const inicioHTML = `
	<main id="main-conteiner">
		<h2>Meus arquivos</h2>
		<div id="file-table" class="file-table">
			<div class="file-header">
				<div class="file-column">COD FAC</div>
				<div class="file-column">JUSTIFICATIVA</div>
				<div class="file-column">CLASSIFICAÇÃO</div>
				<div class="file-column">PROJETO</div>
				<div class="file-column">CENTRO DE CUSTO</div>
				<div class="file-column">CONTA CONTÁBIL</div>
			</div>
  `;

  let rowsHTML = `<div class="file-row">VAZIO</div>`;

  if ( unidadeLista.length ) {
        rowsHTML = orcamentoLista.reduce((acc, cur) => {
		const html = `
			<div class="file-row">
				<div class="file-column">${cur.cod_fac}</div>
				<div class="file-column">${cur.justificativa}</div>
				<div class="file-column">${cur.classificacao}</div>
				<div class="file-column">${cur.projeto ?? " - "}</div>
				<div class="file-column">${cur.centro_custo}</div>
				<div class="file-column">${cur.conta_contabil}</div>
			</div>
		`;
		acc += html;
		return acc;

    },"");
  }
const finalHTML = `</div></main>`;

const elementoHTML = inicioHTML + rowsHTML + finalHTML;

const el = document.getElementById("file-table");

el.innerHTML = elementoHTML;

}




















async function unidadesCarregarHTML() {
  const inicioHTML = `
	<main id="main-conteiner">
		<h2>Meus arquivos</h2>
		<div id="file-table" class="file-table">
			<div class="file-header">
				<div class="file-column">COD FAC</div>
				<div class="file-column">JUSTIFICATIVA</div>
				<div class="file-column">CLASSIFICAÇÃO</div>
				<div class="file-column">PROJETO</div>
				<div class="file-column">CENTRO DE CUSTO</div>
				<div class="file-column">CONTA CONTÁBIL</div>
			</div>
  `;

  const rowsHTML = unidadeList.reduce((acc, cur) => {
		const html = `
			<div class="file-row">
				<div class="file-column">${cur.cod_fac}</div>
				<div class="file-column">${cur.justificativa}</div>
				<div class="file-column">${cur.classificacao}</div>
				<div class="file-column">${cur.projeto ?? " - "}</div>
				<div class="file-column">${cur.centro_custo}</div>
				<div class="file-column">${cur.conta_contabil}</div>
			</div>
		`;
		acc += html;
		return acc;

  },"");

const finalHTML = `</div></main>`;

const elementoHTML = inicioHTML + rowsHTML + fimHTML;

const el = document.getElementById("file-table");

el.innerHTML = elementoHTML;


}




// FUNÇÃO PARA EXIBIR / ESCONDER O MENU
function toggleMenu() {
    const menuItems = document.getElementById('menu-items');
    menuItems.classList.toggle('expanded');
}
// ADICIONANDO LISTENER AO MENU PARA FECHAR QUANDO O MOUSE SAIR
const menu = document.getElementById("menu-items");
menu.addEventListener("mouseleave", toggleMenu);

