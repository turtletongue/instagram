import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/database";

export interface FollowersInstance extends Model {
  id: number;
  followerId: number;
  followingId: number;
}

const Followers = sequelize.define<FollowersInstance>("users_followers", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  followerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  followingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Followers;
