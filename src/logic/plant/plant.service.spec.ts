import { PlantService } from './plant.service';
import { PlantRepository } from './plan.repository.interface';
import { Plant, PlantDTO } from './plant';

describe('PlantServiceTest', () => {
  let instanceUnderTest: PlantService;
  let repo: MockPlantRepository;

  beforeEach(() => {
    repo = new MockPlantRepository();
    instanceUnderTest = new PlantService(repo);
  });

  it('should create plant', async () => {
    // given
    const plant = { name: 'Hortensja', toxicity: true } as PlantDTO;

    // when
    const result = await instanceUnderTest.create(plant);

    // then
    assertPlantsPersisted(1);
    await assertCreatedPlantExists(result, 'Hortensja', true);
  });

  it('should update plant', async () => {
    // given
    const plant = { name: 'Sebula', toxicity: true } as PlantDTO;
    const plantId = await instanceUnderTest.create(plant);

    // when
    const result = await instanceUnderTest.update(plantId, {
      name: 'Cebula',
      toxicity: false,
    });

    // then
    assertPlantsPersisted(1);
    await assertCreatedPlantExists(result, 'Cebula', false);
  });

  it('should delete plant', async () => {
    // given
    const firstPlantId = await instanceUnderTest.create({
      name: 'Cebula',
      toxicity: false,
    });
    const secondPlantId = await instanceUnderTest.create({
      name: 'Hortensja',
      toxicity: true,
    });

    // when
    await instanceUnderTest.delete(firstPlantId);

    // then
    assertPlantsPersisted(1);
    await assertCreatedPlantExists(secondPlantId, 'Hortensja', true);
  });

  it('should get plants by name', async () => {
    // given
    const firstPlantId = await instanceUnderTest.create({
      name: 'Cebula',
      toxicity: false,
    });
    const secondPlantId = await instanceUnderTest.create({
      name: 'Hortensja',
      toxicity: true,
    });

    const thirdPlantId = await instanceUnderTest.create({
      name: 'Hortensja',
      toxicity: true,
    });

    // when
    const result = await instanceUnderTest.getByName('Hortensja');

    // then
    assertPlantsPersisted(3);
    await assertCreatedPlantExists(firstPlantId, 'Cebula', false);
    await assertCreatedPlantExists(secondPlantId, 'Hortensja', true);
    await assertCreatedPlantExists(thirdPlantId, 'Hortensja', true);
    await assertResultPlantSize(result, 2);
  });

  it('should get plants by toxicity', async () => {
    // given
    const firstPlantId = await instanceUnderTest.create({
      name: 'Cebula',
      toxicity: false,
    });
    const secondPlantId = await instanceUnderTest.create({
      name: 'Hortensja',
      toxicity: true,
    });

    const thirdPlantId = await instanceUnderTest.create({
      name: 'Hortensja',
      toxicity: true,
    });

    // when
    const result = await instanceUnderTest.getAllByToxicity(false);

    // then
    assertPlantsPersisted(3);
    await assertCreatedPlantExists(firstPlantId, 'Cebula', false);
    await assertCreatedPlantExists(secondPlantId, 'Hortensja', true);
    await assertCreatedPlantExists(thirdPlantId, 'Hortensja', true);
    await assertResultPlantSize(result, 1);
  });

  async function assertResultPlantSize(
    result: Plant[],
    numberOfResults: number,
  ) {
    expect(numberOfResults).toBe(result.length);
  }

  async function assertCreatedPlantExists(
    id: number,
    name: string,
    toxicity: boolean,
  ) {
    const actual = await repo.findById(id);
    expect(actual.id).toBe(id);
    expect(actual.name).toBe(name);
    expect(actual.toxicity).toBe(toxicity);
  }

  function assertPlantsPersisted(count: number) {
    expect(count).toBe(repo.getSize());
  }
});

class MockPlantRepository implements PlantRepository {
  private readonly map: Map<number, Plant>;
  private index: number = 0;

  constructor() {
    this.map = new Map();
  }

  async delete(id: number): Promise<void> {
    this.map.delete(id);
  }

  findAllByToxicity(toxicity: boolean): Promise<Plant[]> {
    return Promise.resolve(
      [...this.map.values()].filter((v) => v.toxicity == toxicity),
    );
  }

  findById(id: number): Promise<Plant> {
    return Promise.resolve(this.map.get(id));
  }

  findByName(name: string): Promise<Plant[]> {
    return Promise.resolve(
      [...this.map.values()].filter((v) => v.name == name),
    );
  }

  save(plant: Plant): Promise<number> {
    if (!plant.id) {
      plant.id = ++this.index;
    }
    this.map.set(plant.id, plant);
    return Promise.resolve(plant.id);
  }

  getSize() {
    return this.map.size;
  }
}
