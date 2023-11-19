import { PlantRepository } from '../../logic/plant/plan.repository.interface';
import { Plant } from '../../logic/plant/plant';
import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PlantPersistentRepositoryImpl implements PlantRepository {
  constructor(
    @Inject('PlantTypeOrmProvider') private manager: Repository<Plant>,
  ) {}
  async delete(id: number): Promise<void> {
    await this.manager.delete(id);
  }

  findAllByToxicity(toxicity: boolean): Promise<Plant[]> {
    return this.manager
      .createQueryBuilder('plant')
      .where('plant.toxicity = :toxicity', { toxicity: toxicity })
      .getMany();
  }

  findById(id: number): Promise<Plant> {
    return this.manager.findOneBy({ id: id });
  }

  findByName(name: string): Promise<Plant[]> {
    return this.manager.findBy({ name: name });
  }

  async save(plant: Plant): Promise<number> {
    const result = await this.manager.save(plant);
    return result.id;
  }
}

export const plantTypeOrmProvider = {
  provide: 'PlantTypeOrmProvider',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Plant),
  inject: ['DATA_SOURCE'],
};

export const plantPersistentRepositoryProvider = {
  provide: 'PersistentPlantRepository',
  useClass: PlantPersistentRepositoryImpl,
};
