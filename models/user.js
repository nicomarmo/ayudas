// 1. guardar el user en la DB
// 2. buscar al user que se quiere loguear por su email
// 3. buscar a un user por su id
// 4. editar la info de un user
// 5. eliminar un user de la DB

const fs = require("fs");
const { getMaxListeners } = require("process");

const user = {
    fileName: './database/users.JSON',
    getData: function(){
        return JSON.parse(fs.readFileSync(this.fileName,'utf-8'));
    },
    generateId: function(){
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if (lastUser){
            return lastUser.id + 1;
        }
        return 1;
    },
    findAll: function(){
        return this.getData();
    },
    findByPk: function(id){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id);
        return userFound; 
    },
    findByField: function(field, text){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    },

    create: function(userData){
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, " "));
        return newUser;
    },

    delete: function(id){
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, " "));
        return true;
    },


}

//console.log(user.delete(6));
//console.log(user.create({username: "kaki", pais: "urugay"}));

module.exports = user;