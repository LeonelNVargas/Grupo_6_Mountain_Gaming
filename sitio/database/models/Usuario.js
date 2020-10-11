module.exports = (sequelize, DataTypes) => {
    let alias = "Usuarios";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(70),
            unique: true,
            allowNull: false
        },
        telefono: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        direccion: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        contrasenia: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        rol: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    }
    let config = {
        tableName: "usuarios",
        timestamps: false,
        underscored: true
    }
    const Usuario = sequelize.define(alias, cols, config);
    Usuario.associate = function(models){
        Usuario.hasMany(models.Compras, {
            as: "compras",
            foreignKey: "id_usuario"
        });
    }
    return Usuario;
}