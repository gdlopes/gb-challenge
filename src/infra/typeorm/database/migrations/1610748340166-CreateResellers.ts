import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateResellers1610748340166 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'resellers',
				columns: [
					{
						name: 'id',
						type: 'varchar',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'name',
						type: 'varchar',
						isNullable: false
					},
					{
						name: 'document',
						type: 'varchar',
						isUnique: true,
						isNullable: false
					},
					{
						name: 'email',
						type: 'varchar',
						isUnique: true,
						isNullable: false
					},
					{
						name: 'password',
						type: 'varchar',
						isNullable: false
					},
				]
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('resellers');
	}
}
