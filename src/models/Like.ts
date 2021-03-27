import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/database";

export interface LikeInstance extends Model {
  id: number;
}

const Like = sequelize.define<LikeInstance>("like", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

export default Like;
