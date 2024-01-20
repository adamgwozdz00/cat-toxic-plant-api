import { Module } from '@nestjs/common';
import { PlantService } from './plant/plant.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [PlantService],
  exports: [PlantService],
  imports: [DatabaseModule],
})
export class LogicModule {}
