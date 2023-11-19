import { Module } from '@nestjs/common';
import { databaseProvider } from '../typeorm.config';
import {
  plantPersistentRepositoryProvider,
  plantTypeOrmProvider,
} from './plant/plant.persistent.repository.impl';
import { plantRepositoryProvider } from './plant/plant.repository.impl';

@Module({
  providers: [
    plantRepositoryProvider,
    databaseProvider,
    plantTypeOrmProvider,
    plantPersistentRepositoryProvider,
  ],
  exports: [
    plantRepositoryProvider,
    databaseProvider,
    plantTypeOrmProvider,
    plantPersistentRepositoryProvider,
  ],
})
export class DatabaseModule {}
