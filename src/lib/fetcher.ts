export async function fetcher<T = any>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Erro ao buscar dados');
  }
  return response.json();
} 