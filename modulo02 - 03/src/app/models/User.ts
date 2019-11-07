import { Model, DataTypes, Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';
import { customModel } from '../../types';

export class User extends Model {
	public id!: number;

	public name!: string;

	public email!: string;

	public password_hash!: string;

	public provider!: boolean;

	public readonly created_at!: Date;

	public readonly updated_at!: Date;

	public checkPassword(password) {
		return bcrypt.compare(password, this.password_hash);
	}

	public static initialize(sequelize: Sequelize) {
		this.init(
			{
				name: DataTypes.STRING,
				email: DataTypes.STRING,
				password: DataTypes.VIRTUAL,
				password_hash: DataTypes.STRING,
				provider: DataTypes.BOOLEAN,
			},
			{
				sequelize,
			}
		);
		this.addHook('beforeSave', async user => {
			const data: any = user;
			if (data.password) {
				data.password_hash = await bcrypt.hash(data.password, 8);
			}
		});
	}

	public static associate(models: any) {
		this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
	}
}
