export class Plant {
  id: number;
  name: string;
  toxicity: boolean;

  constructor(name: string, toxicity: boolean) {
    this.name = name;
    this.toxicity = toxicity;
  }

  update(name: string, toxicity: boolean) {
    this.name = name;
    this.toxicity = toxicity;
  }
}

export type PlantDTO = {
  name: string;
  toxicity: boolean;
};
