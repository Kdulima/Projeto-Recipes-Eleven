// Creditos da função capitalize para https://www.horadecodar.com.br/2020/10/05/primeira-letra-de-uma-string-em-maiusculo-em-javascript/

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function handleHeaderName(string) {
  const test1 = string === 'explorar bebidas ingredientes';
  const test2 = string === 'explorar comidas ingredientes';
  const test3 = string === 'explorar comidas area';

  if (test1 || test2) return 'Explorar Ingredientes';
  if (test3) return 'Explorar Origem';

  return string;
}

export function getPageName(pathname, setPageName) {
  const pageName = pathname
    .split('/')
    .join(' ')
    .split('-')
    .join(' ')
    .trim();

  setPageName(pageName);
}
