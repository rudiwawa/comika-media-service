"use strict";
const {
  Model,
  Sequelize: { Op },
  Sequelize,
} = require("sequelize");
const moment = require("moment");
const currency = require("../helpers/currency");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Source, Product, Category, Cart }) {
      Product.belongsToMany(Source, { through: "store_product_sources", as: "images" });
      Product.belongsTo(Category);
      Product.hasMany(Cart);
      // define association here
      Product.addScope("public", {
        where: {
          isPublish: true,
          publishedAt: {
            [Op.lte]: moment().add(7, "hours"),
          },
        },
      });
    }
  }
  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        set(value) {
          const slug = value.replace(/[^a-zA-Z0-9]/gi, "-");
          this.setDataValue("slug", slug);
          this.setDataValue("name", value);
        },
      },
      slug: {
        unique: true,
        type: DataTypes.STRING,
      },
      categoryId: DataTypes.SMALLINT,
      description: DataTypes.TEXT,
      isPublish: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      publishedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      price: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      rupiah: {
        type: Sequelize.VIRTUAL,
        get() {
          return currency.setRupiah(this.getDataValue("price"));
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "store_products",
    }
  );
  return Product;
};
