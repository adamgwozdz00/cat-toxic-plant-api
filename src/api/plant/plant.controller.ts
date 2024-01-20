import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { PlantService } from 'src/logic/plant/plant.service';
import { PlantDTO } from 'src/logic/plant/plant';

@Controller('plants')
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

  @Get(':id')
  getById(@Param('id') id: number): Promise<PlantDTO> {
    return this.plantService.getById(id);
  }

  @Get('/name/:name')
  getByName(@Param('name') name: string): Promise<PlantDTO[]> {
    return this.plantService.getByName(name);
  }

  @Get('toxicity/:isToxic')
  getAllByToxicity(@Param('isToxic') isToxic: boolean): Promise<PlantDTO[]> {
    return this.plantService.getAllByToxicity(String(isToxic) === 'true');
  }

  @Post()
  @ApiBody({ type: PlantDTO })
  create(@Body() plant: PlantDTO): Promise<number> {
    return this.plantService.create(plant);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() plant: PlantDTO): Promise<number> {
    return this.plantService.update(id, plant);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.plantService.delete(id);
  }
}
