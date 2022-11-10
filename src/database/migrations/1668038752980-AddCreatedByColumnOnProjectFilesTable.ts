import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddCreatedByColumnOnProjectFilesTable1668038752980 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('project_files', new TableColumn({
        name: 'created_by',
        type: 'uuid',
        isNullable: true
      }))

      await queryRunner.createForeignKey('project_files', new TableForeignKey({
        name: 'fk_project_files_users',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['created_by'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('project_files', 'fk_project_files_users')
      await queryRunner.dropColumn('users', 'avatar')
    }

}
