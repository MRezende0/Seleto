import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createTasks1620848253091 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.createTable(
				new Table({
					name: "tasks",
					columns: [
						{
							name: "employeeId",
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
							name: "endDate",
							type: "varchar",
							isNullable: true,
						},
						{
							name: "expectedEndDate",
							type: "varchar",
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
							name: "TasksEmployee",
							columnNames: ["employeeId"],
							referencedTableName: "employees",
							referencedColumnNames: ["id"],
							onUpdate: "CASCADE",
							onDelete: "CASCADE",
						},					
					],
				})
			);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
