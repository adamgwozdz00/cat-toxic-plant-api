import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { LogicModule } from 'src/logic/logic.module';
import { PlantController } from './plant/plant.controller';

@Module({
  imports: [DatabaseModule, LogicModule],
  controllers: [PlantController],
})
export class ApiModule {}
