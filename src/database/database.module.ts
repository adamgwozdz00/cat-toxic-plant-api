import { Module } from '@nestjs/common';
import { plantRepositoryProvider } from './plant/plant.repository.impl';

@Module({
  providers: [plantRepositoryProvider],
  exports: [plantRepositoryProvider],
})
export class DatabaseModule {}
