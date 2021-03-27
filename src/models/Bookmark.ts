import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/database";

export interface BookmarkInstance extends Model {
  id: number;
  postId: number;
}

const Bookmark = sequelize.define<BookmarkInstance>("bookmark", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

export default Bookmark;
