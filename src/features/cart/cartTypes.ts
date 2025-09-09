import type { Ingredient } from "../data/pizzasData";

export type CartPizza = {
  id: number;
  name: string;
  basePrice: number;
  ingredients: Ingredient[];
  image?: string
};