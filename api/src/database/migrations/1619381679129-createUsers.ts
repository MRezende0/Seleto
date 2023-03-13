import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUsers1619381679129 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "users",
				columns: [
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
						isUnique: true,
					},
					{
						name: "password",
						type: "varchar",
					},
					{
						name: "phone",
						type: "varchar",
					},
					{
						name: "birthday",
						type: "date",
						isNullable: true,
						default: null,
					},
					{
						name: "cpfOrCnpj",
						type: "varchar",
						isUnique: true,
						isNullable: true,
					},
					{
						name: "cep",
						type: "varchar",
						isNullable: true,
					},
					{
						name: "cepNumber",
						type: "int",
						isNullable: true,
					},
					{
						name: "cepComplement",
						type: "varchar",
						isNullable: true,
						default: null,
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
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("users");
	}
}
