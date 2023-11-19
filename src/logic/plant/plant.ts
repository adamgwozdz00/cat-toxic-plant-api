import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'plant' })
export class Plant {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
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
