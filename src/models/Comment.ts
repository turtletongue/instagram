import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/database";

export interface CommentInstance extends Model {
  id: number;
  content: string;
  authorName: string;
  createdAt: Date;
  updatedAt: Date;
  dataValues?: CommentInstance;
}

const Comment = sequelize.define<CommentInstance>("comment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  authorName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Comment;
