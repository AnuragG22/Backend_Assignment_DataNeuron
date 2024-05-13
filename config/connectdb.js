import { Sequelize, DataTypes } from 'sequelize';

// Initialize Sequelize with database connection details
const sequelize = new Sequelize('Assessment_db', 'root', 'toor123', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define Users schema
const Users = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  Fname: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  Lname: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  }
}, {
  timestamps: false, // Disable timestamps
});

// Define Counts schema
const Counts = sequelize.define('Counts',{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  AddCount:{
    type: DataTypes.INTEGER,
  },
  UpdateCount:{
    type: DataTypes.INTEGER,
  },
});

// Sync schemas with the database
(async () => {
  try {
    await sequelize.sync();
    console.log('User table synced successfully.');
  } catch (error) {
    console.error('Error syncing User table:', error);
  }
})();

// Export the schemas and the Sequelize instance
export { Users, Counts, sequelize };
