import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createProperties1619381911091 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "properties",
				columns: [
					{
						name: "userId",
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
						name: "cep",
						type: "varchar",
					},
					{
						name: "cepNumber",
						type: "int",
					},
					{
						name: "cepComplement",
						type: "varchar",
						isNullable: true,
					},
					{
						name: "area",
						type: "double",
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
						name: "UserProperty",
						columnNames: ["userId"],
						referencedTableName: "users",
						referencedColumnNames: ["id"],
						onUpdate: "CASCADE",
						onDelete: "CASCADE",
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("properties");
	}
}
