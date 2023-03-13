import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createEmployees1619383071327 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "employees",
				columns: [
					{
						name: "propertyId",
						type: "varchar",
					},
					{
						name: "roleId",
						type: "varchar",
					},
					{
						name: "id",
						type: "varchar",
						isPrimary: true,
					},
					{
						name: "fullname",
						type: "varchar",
					},
					{
						name: "email",
						type: "varchar",
						isNullable: true,
					},
					{
						name: "phone",
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
						name: "RoleEmployee",
						columnNames: ["roleId"],
						referencedTableName: "roles",
						referencedColumnNames: ["id"],
						onUpdate: "CASCADE",
						onDelete: "CASCADE",
					},
					{
						name: "PropertyEmployee",
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
		await queryRunner.dropTable("employees");
	}
}
