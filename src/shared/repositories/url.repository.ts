import { Injectable } from '@nestjs/common';
import { OptionsDTO } from '@shared/dtos';
import { Url } from '@shared/entities';
import {
  DataSource,
  DeepPartial,
  DeleteResult,
  EntityManager,
  IsNull,
  Repository,
} from 'typeorm';

@Injectable()
export class UrlRepository {
  private repository: Repository<Url>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Url);
  }

  transaction(
    action: (entityManager: EntityManager) => Promise<Url | void>,
  ): Promise<Url | void> {
    const entityManager = this.dataSource.manager;

    return entityManager.transaction((transactionalEntityManager) => {
      return action(transactionalEntityManager);
    });
  }

  getByShortId(shortId: string): Promise<Url | null> {
    return this.repository.findOne({
      where: { shortId },
      relations: {
        metric: true,
      },
    });
  }

  getById(id: number): Promise<Url | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  create(dto: DeepPartial<Url>, entityManager?: EntityManager): Promise<Url> {
    const object: Url = this.repository.create(dto);

    if (entityManager) {
      return entityManager.save(object);
    }

    return this.repository.save(object);
  }

  delete(id: number, entityManager?: EntityManager): Promise<DeleteResult> {
    if (entityManager) {
      return entityManager.softDelete(Url, { id, deletedAt: IsNull() });
    }

    return this.repository.softDelete({ id, deletedAt: IsNull() });
  }

  list(id: number, options: OptionsDTO): Promise<[Url[], number] | null> {
    return this.repository.findAndCount({
      take: options.pageSize ? options.pageSize : 10,
      skip:
        options.page && options.pageSize
          ? (options.page - 1) * options.pageSize
          : 0,
      where: { user: { id } },
      relations: {
        metric: true,
      },
    });
  }

  update(data: Partial<Url>, entityManager?: EntityManager): Promise<Url> {
    if (entityManager) {
      return entityManager.save(data) as Promise<Url>;
    }

    return this.repository.save(data);
  }
}
