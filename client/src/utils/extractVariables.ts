export default function extractVariables(params: URLSearchParams) {
  const possibleVariables = ['cuisine', 'dining', 'open', 'keyword'];
  const variables = { keyword: '', open: true };
  for (const v of possibleVariables) {
    if (params.has(v)) {
      if (v !== 'open') {
        variables.keyword += `${params.get(v)} `;
      } else {
        variables.open = params.get(v) === 'true' ? true : false;
      }
    }
  }
  return variables;
}
