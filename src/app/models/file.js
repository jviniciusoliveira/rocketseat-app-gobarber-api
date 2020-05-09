import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    const url = `${process.env.APP_HOST}:${process.env.APP_PORT}`;

    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${url}/files/${this.path}`;
          },
        },
      },
      { sequelize }
    );

    return this;
  }
}

export default File;
