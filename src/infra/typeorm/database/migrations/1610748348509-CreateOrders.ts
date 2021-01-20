import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOrders1610748348509 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'orders',
				columns: [
					{
						name: 'id',
						type: 'varchar',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'code',
						type: 'varchar',
						isNullable: false
					},
					{
						name: 'value',
						type: 'varchar',
						isNullable: false
					},
					{
						name: 'cashbackValue',
						type: 'varchar',
						isNullable: false
					},
					{
						name: 'date',
						type: 'timestamp with time zone',
						default: 'now()'
					},
					{
						name: 'resellerDocument',
						type: 'varchar',
						isNullable: false
					},
					{
						name: 'status',
						type: 'varchar',
						isNullable: false
					}
				]
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('orders');
	}
}
