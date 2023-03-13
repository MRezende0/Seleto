import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createMachinesProblem1619386331548 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "machinesProblem",
				columns: [
					{
						name: "machineId",
						type: "varchar",
					},
					{
						name: "id",
						type: "varchar",
						isPrimary: true,
					},
					{
						name: "desciption",
						type: "varchar",
					},
					{
						name: "level",
						type: "int",
					},
					{
						name: "resolutionDate",
						type: "date",
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
						name: "MachineProblem",
						columnNames: ["machineId"],
						referencedTableName: "machines",
						referencedColumnNames: ["id"],
						onUpdate: "CASCADE",
						onDelete: "CASCADE",
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("machinesProblem");
	}
}
