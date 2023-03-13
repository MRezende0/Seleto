import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createMachines1619385738495 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "machines",
				columns: [
					{
						name: "propertyId",
						type: "varchar",
					},
					{
						name: "typeId",
						type: "varchar",
					},
					{
						name: "id",
						type: "varchar",
						isPrimary: true,
					},
					{
						name: "model",
						type: "varchar",
						isNullable: true,
					},
					{
						name: "year",
						type: "varchar",
						isNullable: true,
					},
					{
						name: "number",
						type: "int",
						isNullable: true,
					},
					{
						name: "status",
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
						name: "TypeMachine",
						columnNames: ["typeId"],
						referencedTableName: "machinesTypes",
						referencedColumnNames: ["id"],
						onUpdate: "CASCADE",
						onDelete: "CASCADE",
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("machines");
	}
}
