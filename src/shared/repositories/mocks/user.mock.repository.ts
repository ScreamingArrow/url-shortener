import { faker } from '@faker-js/faker';
import { User } from '@shared/entities';
import { DeleteResult } from 'typeorm';

export function generateObject(dto?: Partial<User>) {
  const object = new User();

  (object.id = dto?.id || faker.number.int({ min: 1, max: 10000 })),
    (object.email = dto?.email || faker.internet.email()),
    (object.password = dto?.password || faker.internet.password()),
    (object.createdAt = dto?.createdAt || faker.date.past()),
    (object.updatedAt = dto?.updatedAt || faker.date.recent()),
    (object.deletedAt = dto?.deletedAt || null);

  return object;
}

export const fakeUser = generateObject();

export const UserRepositoryMock = jest.fn(() => ({
  getById: jest.fn((id: number): Promise<User | null> => {
    return Promise.resolve(id ? generateObject() : null);
  }),

  getByEmail: jest.fn((email: string): Promise<User | null> => {
    return Promise.resolve(email ? generateObject() : null);
  }),

  create: jest.fn((dto: Partial<User>): Promise<User> => {
    return Promise.resolve(generateObject(dto));
  }),

  delete: jest.fn((id: string): Promise<DeleteResult> => {
    return Promise.resolve(id ? new DeleteResult() : null);
  }),
}));
