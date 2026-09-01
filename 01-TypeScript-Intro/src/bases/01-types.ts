//Export -> para hacer disponible una variable en otros archivos
export const name = "Aletsis";
console.log(name);

let age = 35;
let isValid = true;

const templateString = `
Esto es un template string
multilinea
que puede tener 
" dobles
' simples 
expresiones ${1 + 1}
números: ${age}
booloneanos :${isValid}
`
console.log(templateString);