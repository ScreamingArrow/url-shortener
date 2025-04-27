import { Injectable } from "@nestjs/common";
import { User } from "@shared/entities";
import { Repository, DataSource, EntityManager, DeepPartial, DeleteResult, IsNull } from "typeorm";

@Injectable()
export class UserRepository {
  private repository: Repository<User>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(User);
  }

  transaction(
    action: (entityManager: EntityManager) => Promise<User | void>,
  ): Promise<User | void> {
    const entityManager = this.dataSource.manager;

    return entityManager.transaction((transactionalEntityManager) => {
      return action(transactionalEntityManager);
    });
  }

  getByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({
      where: { email },
      select: ['id', 'email']
    });
  }

  create(dto: DeepPartial<User>, entityManager?: EntityManager): Promise<User> {
    const object: User = this.repository.create(dto);

    if (entityManager) {
      return entityManager.save(object);
    }

    return this.repository.save(object);
  }

  delete(id: string, entityManager?: EntityManager): Promise<DeleteResult> {
    if (entityManager) {
      return entityManager.softDelete(User, { id, deletedAt: IsNull() });
    }

    return this.repository.softDelete({ id, deletedAt: IsNull() });
  }
}