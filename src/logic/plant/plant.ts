import { ApiProperty } from '@nestjs/swagger';

export class Plant {
  id: number;
  name: string;
  toxicity: boolean;

  constructor(name: string, toxicity: boolean) {
    this.name = name;
    this.toxicity = toxicity;
  }

  update(name: string, toxicity: boolean) {
    this.name = name;
    this.toxicity = toxicity;
  }
}

export class PlantDTO {
  @ApiProperty()
  name: string;
  @ApiProperty({ type: Boolean })
  toxicity: boolean;
}
