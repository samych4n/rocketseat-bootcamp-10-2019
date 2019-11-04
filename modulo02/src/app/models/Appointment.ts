import { Sequelize, Model, DataTypes } from 'sequelize';
import { User } from './User';

export class Appointment extends Model {
	public id!: number;

	public date!: Date;

	public user_id: string;

	public provider_id: string;

	public canceled_at: Date;

	public user: User;

	public provider: User;

	public readonly created_at!: Date;

	public readonly updated_at!: Date;

	public static initialize(sequelize: Sequelize) {
		this.init(
			{
				date: DataTypes.DATE,
				canceled_at: DataTypes.DATE,
			},
			{
				sequelize,
			}
		);
	}

	public static associate(models: any) {
		this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
		this.belongsTo(models.User, {
			foreignKey: 'provider_id',
			as: 'provider',
		});
	}
}
