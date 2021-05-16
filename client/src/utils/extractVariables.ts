export default function extractVariables(params: URLSearchParams) {
  const possibleVariables = ['cuisine', 'dining', 'keyword'];
  const variables = { keyword: '', opennow: true };
  for (const v of possibleVariables) {
    if (params.has(v)) {
      variables.keyword += `${params.get(v)} `;
    }
  }
  return variables;
}
