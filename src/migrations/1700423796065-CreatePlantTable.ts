import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePlantTable1700423796065 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Running migration 1: CreateOfferTable1699632902522');
    await queryRunner.query(`
        CREATE TABLE plant
        (
            id  BIGSERIAL PRIMARY KEY,
            name VARCHAR(255),
            toxicity BOOLEAN
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE plant;`);
  }
}
