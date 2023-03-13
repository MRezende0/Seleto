import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createMacrosActivities1619384853426 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "macrosActivities",
				columns: [
					{
						name: "projectId",
						type: "varchar",
					},
					{
						name: "id",
						type: "varchar",
						isPrimary: true,
					},
					{
						name: "name",
						type: "varchar",
					},
					{
						name: "startDate",
						type: "varchar",
					},
					{
						name: "endDate",
						type: "varchar",
						isNullable: true,
					},
					{
						name: "expectedEndDate",
						type: "varchar",
					},
					{
						name: "description",
						type: "varchar",
						isNullable: true,
					},
					{
						name: "isDeleted",
						type: "boolean",
						default: 0,
					},
					{
						name: "createdAt",
						type: "datetime",
					},
					{
						name: "updatedAt",
						type: "datetime",
						isNullable: true,
					},
				],
				foreignKeys: [
					{
						name: "ProjectMacrosActivities",
						columnNames: ["projectId"],
						referencedTableName: "projects",
						referencedColumnNames: ["id"],
						onUpdate: "CASCADE",
						onDelete: "CASCADE",
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("macrosActivities");
	}
}
