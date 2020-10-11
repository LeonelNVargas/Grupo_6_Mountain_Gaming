module.exports = (sequelize, dataTypes) => {
    let alias = "Compras";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        id_usuario: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        id_producto: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        }
    }
    let config = {
        tableName: "compras",
        timestamps: false
    }
    
    const Compra = sequelize.define(alias, cols, config);

    Compra.associate = function(models){
        Compra.belongsTo(models.Usuarios,{
            as: "usuarios",
            foreignKey: "id_usuario"
        })
        Compra.hasMany(models.Productos,{
            as: "productos",
            foreignKey: "id_producto"
        })
    }
    return Compra;
}