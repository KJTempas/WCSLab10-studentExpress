module.exports = (sequelize, DataTypes) => {

    let Student = sequelize.define('Student', {
        name: {
            type: DataTypes.STRING,
            allowNull: false//null fields are not allowed
        }, starID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true//this value must be unique
        }, present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })
//force: false means tables are not deleted and recreated every time app restarts
    Student.sync({force: false}).then( () => {
        console.log('synced student table')
    })
    return Student
}