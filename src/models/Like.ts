import { DataTypes } from "sequelize";
import sequelize from "../utils/database";

const Like = sequelize.define("like", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

export default Like;
