import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/database";

export interface PostInstance extends Model {
  id: number;
  imageUrl: string;
  likesCount: number;
  createComment: Function;
  userId: number;
  getComments: Function;
  createdAt: Date;
  updatedAt: Date;
}

const Post = sequelize.define<PostInstance>("post", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  likesCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Post;
