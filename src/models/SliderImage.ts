import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/database";

export interface SliderImageInstance extends Model {
  id: number;
  imageUrl: string;
}

const SliderImage = sequelize.define<SliderImageInstance>("sliderImage", {
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
});

export default SliderImage;
