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
    static associate({ Source, Product, Category, Cart, StoreProductSource }) {
      Product.hasMany(StoreProductSource, { as: "images" });
      Product.belongsTo(Category);
      // Product.hasMany(Cart);
      // define association here
      Product.addScope("subscription", {
        where: {
          type: "subscription",
          isPublish: true,
          publishedAt: {
            [Op.lte]: moment().add(7, "hours"),
          },
          availableTo: {
            [Op.gte]: moment().add(7, "hours"),
          },
        },
      });
      Product.addScope("product", {
        where: {
          [Op.or]: [{ type: "product" }, { type: "subscription" }],
          isPublish: true,
          publishedAt: {
            [Op.lte]: moment().add(7, "hours"),
          },
          availableTo: {
            [Op.gte]: moment().add(7, "hours"),
          },
        },
        include: [
          { attributes: ["name", "type"], model: Category },
          {
            attributes: ["thumbnail"],
            model: StoreProductSource,
            as: "images",
            order: [["thumbnail", "DESC"]],
            include: {
              as: "source",
              model: Source,
              attributes: ["url", "name"],
            },
          },
        ],
        order: [[{ model: StoreProductSource, as: "images" }, "thumbnail", "DESC"]],
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
      type: {
        type: DataTypes.ENUM(["product", "subscription", "ongkir", "discount"]),
        defaultValue: "subscription",
      },
      slug: {
        unique: true,
        type: DataTypes.STRING,
      },
      categoryId: DataTypes.SMALLINT,
      description: DataTypes.TEXT,
      price: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      capacity: {
        type: DataTypes.SMALLINT,
        defaultValue: 1,
      },
      sequence: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
      },
      rupiah: {
        type: Sequelize.VIRTUAL,
        get() {
          return currency.setRupiah(this.getDataValue("price"));
        },
      },
      isPublish: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      publishedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      availableTo: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
