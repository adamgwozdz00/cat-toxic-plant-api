import { Module } from '@nestjs/common';
import { PlantRepositoryImpl } from './plant/plant.repository.impl';

@Module({
  providers: [{ provide: 'PlantRepository', useValue: PlantRepositoryImpl }],
  exports: [{ provide: 'PlantRepository', useValue: PlantRepositoryImpl }],
})
export class DatabaseModule {}
