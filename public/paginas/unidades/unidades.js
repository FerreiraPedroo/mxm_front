let unidadeLista = [];

async function unidadeCarregarDados() {
  const response = await fetch("http://localhost:3000/unidades", { method: "GET" })
		.then(async (response) => {
			if (response.status == 200) {
				const data = await response.json();
				unidadeLista = data;
			}

		}).catch((error)=> {
			console.log({error});
		});
}

async function unidadesCarregarHTML() {
  let inicioHTML = `
	<h2>Lista das unidades</h2>
	<div id="file-table" class="file-table">
		<div class="file-header">
			<div class="file-column">SIGLA</div>
			<div class="file-column">NOME</div>
			<div class="file-column">ENDEREÇO</div>
			<div class="file-column">DESCRIÇÃO</div>
			<div class="file-column">STATUS</div>
		</div>
  `;

  let rowsHTML = `<div class="file-row">VAZIO</div>`;

  if (unidadeLista.length) {
        rowsHTML = unidadeLista.reduce((acc, cur) => {
		const html = `
			<div class="file-row">
				<div class="file-column">${cur.sigla}</div>
				<div class="file-column">${cur.nome}</div>
				<div class="file-column">${cur.endereco}</div>
				<div class="file-column">${cur.descricao == "NULL" ? "-" : cur.descricao }</div>
				<div class="file-column">${cur.status}</div>
			</div>
		`;
		acc += html;
		return acc;

    },"");
  } else {
	inicioHTML = `<h2>Lista das unidades</h2><div id="file-table" class="file-table">`;
}

const finalHTML = `</div>`;

const elementoHTML = inicioHTML + rowsHTML + finalHTML;

const el = document.getElementById("table");

el.innerHTML = elementoHTML;

toggleMenu();
addEventSelectedRow();


}

