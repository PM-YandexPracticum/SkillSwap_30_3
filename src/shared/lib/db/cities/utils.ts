import { TCity } from './types';

export async function readAllCities(): Promise<TCity[]> {
  const response = await fetch('/db/cities.json');
  return await response.json();
}
