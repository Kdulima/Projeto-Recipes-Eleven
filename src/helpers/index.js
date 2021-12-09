// Creditos da função capitalize para https://www.horadecodar.com.br/2020/10/05/primeira-letra-de-uma-string-em-maiusculo-em-javascript/

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function handleHeaderName(string) {
  const isExploreDrinks = string === 'explorar bebidas ingredientes';
  const isExploreFoods = string === 'explorar comidas ingredientes';
  const isExploreOrigin = string === 'explorar comidas area';

  if (isExploreDrinks || isExploreFoods) return 'Explorar Ingredientes';
  if (isExploreOrigin) return 'Explorar Origem';

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
