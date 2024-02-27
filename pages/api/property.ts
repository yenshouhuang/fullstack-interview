// Next.js API route or component fetching data.json
import type { Property } from '../../types/Property';

export async function fetchProperties(): Promise<Property[]> {
  // If using static data placed in the public directory
  const response = await fetch('/data.json');
  const properties: Property[] = await response.json();
  return properties;
}