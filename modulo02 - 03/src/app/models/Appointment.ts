import { Sequelize, Model, DataTypes } from 'sequelize';
import { isBefore, subHours } from 'date-fns';
import { User } from './User';

export class Appointment extends Model {
	public id!: number;

	public date!: Date;

	public user_id: string;

	public provider_id: string;

	public canceled_at: Date;

	public past: boolean;

	public user: User;

	public provider: User;

	public readonly created_at!: Date;

	public readonly updated_at!: Date;

	public static initialize(sequelize: Sequelize) {
		this.init(
			{
				date: DataTypes.DATE,
				canceled_at: DataTypes.DATE,
				past: {
					type: DataTypes.VIRTUAL,
					get() {
						return isBefore(this.date, new Date());
					},
				},
				cancelable: {
					type: DataTypes.VIRTUAL,
					get() {
						return isBefore(new Date(), subHours(this.date, 2));
					},
				},
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
