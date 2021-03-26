import { DataTypes } from "sequelize";
import sequelize from "../utils/database";

const Bookmark = sequelize.define("bookmark", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

export default Bookmark;
