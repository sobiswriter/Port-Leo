import type { UniverseId } from '../types/universe';

export interface ColorPalette {
  name: string;
  primary: string;
  secondary: string;
  highlight: string;
  background: string;
  hue: number;
}

// Dusty, low-saturation pigments keep the dark worlds and paper surfaces coherent.
const parchment: ColorPalette = { name: 'Warm parchment', primary: '#b9a385', secondary: '#817663', highlight: '#ded4bd', background: '#0c0b09', hue: 38 };
const sage: ColorPalette = { name: 'Silver sage', primary: '#8fa99a', secondary: '#657e78', highlight: '#c7d4c6', background: '#090d0b', hue: 145 };
const slate: ColorPalette = { name: 'Moonlit slate', primary: '#92a5bd', secondary: '#68788f', highlight: '#cbd5de', background: '#090c10', hue: 215 };
const mauve: ColorPalette = { name: 'Dusty lilac', primary: '#aa96b7', secondary: '#796d8b', highlight: '#d9cbdc', background: '#0d0a10', hue: 275 };
const copper: ColorPalette = { name: 'Faded copper', primary: '#b69481', secondary: '#876d68', highlight: '#dec9b9', background: '#100b09', hue: 20 };
const tide: ColorPalette = { name: 'Quiet tide', primary: '#86aeb0', secondary: '#657f91', highlight: '#c5d9d5', background: '#090d10', hue: 185 };

export const colorPalettes: Record<UniverseId, ColorPalette[]> = {
  arrival: [parchment, sage, slate, copper],
  builder: [slate, sage, mauve, parchment],
  'ai-lab': [mauve, tide, slate, sage],
  research: [slate, mauve, tide, parchment],
  arsenal: [sage, tide, parchment, slate],
  journey: [mauve, slate, copper, tide],
  about: [parchment, copper, sage, mauve],
  beyond: [tide, slate, mauve, copper],
};
