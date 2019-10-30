import { Sequelize, Model, DataTypes } from 'sequelize';

export class File extends Model {
	public id!: number;

	public name!: string;

	public path!: string;

	public readonly url!: string;

	public readonly created_at!: Date;

	public readonly updated_at!: Date;

	public static initialize(sequelize: Sequelize) {
		this.init(
			{
				name: DataTypes.STRING,
				path: DataTypes.STRING,
				url: {
					type: DataTypes.VIRTUAL,
					get() {
						return `http://localhost:3333/files/${this.path}`;
					},
				},
			},
			{
				sequelize,
			}
		);
	}

	public static associate(models: any) {}
}
