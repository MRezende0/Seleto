import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createStock1619386899952 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "stock",
				columns: [
					{
						name: "typeId",
						type: "varchar",
					},
					{
						name: "supplyId",
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
						name: "brand",
						type: "varchar",
						isNullable: true,
					},
					{
						name: "quantity",
						type: "int",
					},
					{
						name: "purchaseValue",
						type: "decimal(10, 2)",
						isNullable: true,
					},
					{
						name: "entryDate",
						type: "date",
					},
					{
						name: "exitDate",
						type: "date",
						isNullable: true,
					},
					{
						name: "validityDate",
						type: "date",
						isNullable: true,
					},
				],
				foreignKeys: [
					{
						name: "ProjectTypeStock",
						columnNames: ["typeId"],
						referencedTableName: "projectstypes",
						referencedColumnNames: ["id"],
						onUpdate: "CASCADE",
						onDelete: "CASCADE",
					},
					{
						name: "SupplyStock",
						columnNames: ["supplyId"],
						referencedTableName: "supplies",
						referencedColumnNames: ["id"],
						onUpdate: "CASCADE",
						onDelete: "CASCADE",
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
