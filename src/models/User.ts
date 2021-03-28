import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/database";
import { BookmarkInstance } from "./Bookmark";

export interface UserInstance extends Model {
  id: number;
  username: string;
  name?: string;
  bio?: string;
  getPosts: Function;
  getActivities: Function;
  avatarUrl?: string;
  password: string;
  createPost: Function;
  createActivity: Function;
  following?: UserInstance[];
  followers?: UserInstance[];
  bookmarked?: BookmarkInstance[];
  dataValues?: UserInstance;
}

const User = sequelize.define<UserInstance>("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  avatarUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
