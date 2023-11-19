import { Module } from '@nestjs/common';
import { PlantRepositoryImpl } from './plant/plant.repository.impl';

@Module({
  providers: [PlantRepositoryImpl],
  exports: [PlantRepositoryImpl],
})
export class DatabaseModule {}
