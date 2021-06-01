const createTags = (sequelize, Datatypes) => {
  const repository = sequelize.define('repositories', {
    repoId: Datatypes.STRING,
    tag: Datatypes.STRING,
    name: Datatypes.STRING,
    description: Datatypes.STRING,
    url: Datatypes.STRING,
  });

  repository.associate = (models) => {
    repository.belongsTo(models.users,
      { foreignKey: 'userId', as: 'user' });
  };

  return repository;
};

module.exports = createTags;
