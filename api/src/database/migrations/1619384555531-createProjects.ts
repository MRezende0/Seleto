import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createProjects1619384555531 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "projects",
				columns: [
					{
						name: "typeId",
						type: "varchar",
					},
					{
						name: "propertyId",
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
						name: "description",
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
						name: "TypeProject",
						columnNames: ["typeId"],
						referencedTableName: "projectsTypes",
						referencedColumnNames: ["id"],
						onUpdate: "CASCADE",
						onDelete: "CASCADE",
					},
					{
						name: "propertyProject",
						columnNames: ["propertyId"],
						referencedTableName: "properties",
						referencedColumnNames: ["id"],
						onUpdate: "CASCADE",
						onDelete: "CASCADE",
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("projects");
	}
}
