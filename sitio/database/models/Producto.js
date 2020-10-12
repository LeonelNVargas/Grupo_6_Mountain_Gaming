module.exports = (sequelize, dataTypes) => {
    let alias = "Productos";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            autoincrement: true,
            primaryKey: true,
            allowNull: false
        },
        nombre: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        descripcion: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        id_categoria: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        cantidad: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        precio: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        descuento: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }

    let config = {
        tableName: "productos"
    }
    
    const Producto = sequelize.define(alias, cols, config);
    Producto.associate = function(models){
        Producto.belongsTo(models.Categorias,{
            as: "categorias",
            foreignKey: "id_categoria"
        })

        Producto.belongsToMany(models.Usuarios, {
            as: "usuarios",
            through: "compras",
            foreignKey: "id_producto",
            otherKey: "id_usuario",
            timestamps: false
        })
    }
    return Producto;
}