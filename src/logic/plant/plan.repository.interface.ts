import { Plant } from './plant';

export interface PlantRepository {
  findById(id: number): Promise<Plant>;
  findByName(name: string): Promise<Plant[]>;
  findAllByToxicity(toxicity: boolean): Promise<Plant[]>;
  save(plant: Plant): Promise<number>;
  delete(id: number): Promise<void>;
}
