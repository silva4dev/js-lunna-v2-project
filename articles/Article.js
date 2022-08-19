const Sequelize = require("sequelize");
const connection = require("../database/database")
const Category = require("../categories/Category");

const Article = connection.define("articles", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Category.hasMany(Article); // UMA Categoria tem muitos artigos/ um relaciomento de (1,N)
Article.belongsTo(Category); // UM Artigo pertence a uma categoria/ um relacionamento de (1,1)

Article.sync({ force: false });

module.exports = Article;