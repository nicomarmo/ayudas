module.exports = (sequelize, DataTypes) => {
    let alias = "Generos"
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre:{
            type: DataTypes.STRING
        }
    };
    let config = {
        tableName: "generos",
        timestamps: false
    };
    
    const Genero = sequelize.define(alias, cols, config);

    Genero.associate = function(models){
        Genero.hasMany(models.Canciones,{
            as: "canciones",
            foreignKey: "id_genero"
        });
    }
    
    return Genero;
}