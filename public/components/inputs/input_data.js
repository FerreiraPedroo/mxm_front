export function inputDate(titulo, id, name) {
 return `
  <style>
.data-box {
 display: flex;
 flex-direction: column;
 align-items: start;
 gap: 4px;
}
.data-titulo {
 font-size: 1.0rem;
}
.data-input {
 padding: 8px 10px;
 border-radius: 6px;
 font-size: 1rem;
 outline: none;
 border: 0;
}
  </style>
  <div class="data-box">
   <div class="data-titulo">${titulo}</div>
   <input type="date" id="${id}" class="data-input" name="${name}" />
  </div>
 `;
}


/*
.data-box {
 display: flex;
 flex-direction: column;
 align-items: start;
 gap: 4px;
}
.data-titulo {
 font-size: 1.0rem;
}
.data-input {
 padding: 8px 10px;
 border-radius: 6px;
 font-size: 1rem;
 outline: none;
 border: 0;
}
*/