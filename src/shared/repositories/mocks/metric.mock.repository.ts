import { faker } from '@faker-js/faker/.';
import { Metric } from '@shared/entities';

export function generateObject(dto?: Partial<Metric>) {
  const object = new Metric();

  object.id = dto?.id || faker.number.int({ min: 1, max: 10000 }),
  object.numberOfClicks = dto?.numberOfClicks || faker.number.int({ min: 1, max: 10000 }),
  object.createdAt = dto?.createdAt || faker.date.past(),
  object.updatedAt = dto?.updatedAt || faker.date.recent(),
  object.deletedAt = dto?.deletedAt || null;

  return object;
}

export const fakeMetric = generateObject();

export const MetricRepositoryMock = jest.fn(() => ({
  create: jest.fn((dto: Partial<Metric>): Promise<Metric> => {
    return Promise.resolve(generateObject(dto));
  }),

  update: jest.fn((dto: Partial<Metric>): Promise<Metric> => {
    return Promise.resolve(generateObject(dto));
  }),
}));
