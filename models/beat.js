const BeatModel = (sequelize, Sequelize) => {
    const { INTEGER, STRING, FLOAT, BOOLEAN, DATE } = Sequelize
    const Beats = sequelize.define('Beats', {
        beatId: { type: INTEGER, primaryKey: true, autoIncrement: true },
        array: { type: STRING, primaryKey: true },
        beatOwner: { type: STRING, allowNull: false }
    })
    return Beats
}

module.exports = BeatModel