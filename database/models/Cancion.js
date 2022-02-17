
module.exports = (sequelize, DataTypes) => {
    let alias = "Canciones"
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true
        },
        nombre:{
            type: DataTypes.STRING
        },
        milisegundos:{
            type: DataTypes.INTEGER
        },
        compositor:{
            type: DataTypes.STRING
        },
    };
    let config = {
        tableName: "canciones",
        timestamps: false
    };
    
    const Cancion = sequelize.define(alias, cols, config);

    Cancion.associate = function(models){
        Cancion.belongsTo(models.Generos,{
            as: "generos",
            foreignKey: "id_genero"
        });
    }

    return Cancion;
}