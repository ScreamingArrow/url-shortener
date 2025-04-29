import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterUrlsTable1745797044563 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'urls',
      new TableColumn({
        name: 'metric_id',
        type: 'int',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'urls',
      new TableForeignKey({
        columnNames: ['metric_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'metrics',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('urls', 'metrics_id');
  }
}
