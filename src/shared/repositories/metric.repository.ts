import { Injectable } from '@nestjs/common';
import { Metric } from '@shared/entities';
import { Repository, DataSource, EntityManager, DeepPartial } from 'typeorm';

@Injectable()
export class MetricRepository {
  private repository: Repository<Metric>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Metric);
  }

  transaction(
    action: (entityManager: EntityManager) => Promise<Metric | void>,
  ): Promise<Metric | void> {
    const entityManager = this.dataSource.manager;

    return entityManager.transaction((transactionalEntityManager) => {
      return action(transactionalEntityManager);
    });
  }

  create(
    dto: DeepPartial<Metric>,
    entityManager?: EntityManager,
  ): Promise<Metric> {
    const object: Metric = this.repository.create(dto);

    if (entityManager) {
      return entityManager.save(object);
    }

    return this.repository.save(object);
  }

  update(
    data: Partial<Metric>,
    entityManager?: EntityManager,
  ): Promise<Metric> {
    if (entityManager) {
      return entityManager.save(data) as Promise<Metric>;
    }

    return this.repository.save(data);
  }
}
