"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Address, Cart, User }) {
      Address.belongsTo(User);
    }
  }
  Address.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      userId: DataTypes.UUID,
      name: DataTypes.STRING(100),
      address: DataTypes.STRING,
      provinceId: DataTypes.SMALLINT,
      province: DataTypes.STRING(50),
      cityId: DataTypes.SMALLINT,
      city: DataTypes.STRING(50),
      subdistrictId: DataTypes.SMALLINT,
      subdistrict: DataTypes.STRING(50),
      type: DataTypes.STRING(10),
      postalCode: DataTypes.STRING(5),
      phone: DataTypes.STRING(13),
    },
    {
      sequelize,
      modelName: "Address",
    }
  );
  return Address;
};
