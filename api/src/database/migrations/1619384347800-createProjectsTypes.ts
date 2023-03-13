import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createProjectsTypes1619384347800 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "projectsTypes",
				columns: [
					{
						name: "id",
						type: "varchar",
						isPrimary: true,
					},
					{
						name: "name",
						type: "varchar",
						isUnique: true,
					},
					{
						name: "description",
						type: "varchar",
						isNullable: true,
					},
					{
						name: "icon",
						type: "varchar",
						isNullable: true,
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("projectsTypes");
	}
}
