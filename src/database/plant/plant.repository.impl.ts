import { PlantRepository } from 'src/logic/plant/plan.repository';
import { Plant } from 'src/logic/plant/plant';

export class PlantRepositoryImpl implements PlantRepository {
  private plants: Plant[] = [];

  async findById(id) {
    return this.plants.find((plant) => plant.id === id);
  }
  async findByName(name) {
    return this.plants.find((plant) => plant.name === name);
  }
  async findAllByToxicity(toxicity) {
    return this.plants.filter((plant) => plant.toxicity === toxicity);
  }
  async save(plant) {
    const index = this.plants.findIndex((p) => p.id === plant.id);
    if (index !== -1) {
      this.plants[index] = plant;
      return plant.id;
    }
    this.plants.push(plant);
    return plant.id;
  }
  async delete(id) {
    this.plants = this.plants.filter((plant) => plant.id !== id);
  }
}
