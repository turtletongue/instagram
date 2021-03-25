import { DataTypes } from "sequelize";
import sequelize from "../utils/database";

const Post = sequelize.define("post", {
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
