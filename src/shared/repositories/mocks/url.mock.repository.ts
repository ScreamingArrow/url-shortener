import { faker } from '@faker-js/faker/.';
import { Url } from '@shared/entities';
import { fakeUser } from './user.mock.repository';
import { DeleteResult } from 'typeorm';
import { OptionsDTO } from '@shared/dtos';
import { fakeMetric } from './metric.mock.repository';

export function generateObject(dto?: Partial<Url>) {
  const object = new Url();

  (object.id = dto?.id || faker.number.int({ min: 1, max: 10000 })),
    (object.originalUrl = dto?.originalUrl || faker.internet.domainName()),
    (object.shortId = dto?.shortId || faker.lorem.words({ min: 6, max: 6 })),
    (object.user = dto?.user || fakeUser),
    (object.metric = dto?.metric || fakeMetric),
    (object.createdAt = dto?.createdAt || faker.date.past()),
    (object.updatedAt = dto?.updatedAt || faker.date.recent()),
    (object.deletedAt = dto?.deletedAt || null);

  return object;
}

export const fakeUrl = generateObject();

export const UrlRepositoryMock = jest.fn(() => ({
  getById: jest.fn((id: number): Promise<Url | null> => {
    return Promise.resolve(id ? generateObject() : null);
  }),

  getByShortId: jest.fn((shortId: string): Promise<Url | null> => {
    return Promise.resolve(shortId ? generateObject() : null);
  }),

  list: jest.fn((id: number, options: OptionsDTO): Promise<[Url[], number]> => {
    return Promise.resolve(
      id && options.page && options.pageSize ? [[generateObject()], 1] : null,
    );
  }),

  create: jest.fn((dto: Partial<Url>): Promise<Url> => {
    return Promise.resolve(generateObject(dto));
  }),

  update: jest.fn((dto: Partial<Url>): Promise<Url> => {
    return Promise.resolve(generateObject(dto));
  }),

  delete: jest.fn((id: string): Promise<DeleteResult> => {
    return Promise.resolve(id ? new DeleteResult() : null);
  }),
}));
