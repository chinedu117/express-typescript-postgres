'use strict';
import {
  Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
  HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
  Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute
} from '@sequelize/core';

import Project from "./project";
import sequelize from '../config/connection';


// 'projects' is excluded as it's not an attribute, it's an association.
class User extends Model<InferAttributes<User, { omit: 'projects' }>, InferCreationAttributes<User, { omit: 'projects' }>> {

  declare id: CreationOptional<number>;
  declare first_name: string;
  declare last_name?: string;
  declare email: string;
  declare password?: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getProjects: HasManyGetAssociationsMixin<Project>;
  declare addProject: HasManyAddAssociationMixin<Project, number>;
  declare addProjects: HasManyAddAssociationsMixin<Project, number>;
  declare setProjects: HasManySetAssociationsMixin<Project, number>;
  declare removeProject: HasManyRemoveAssociationMixin<Project, number>;
  declare removeProjects: HasManyRemoveAssociationsMixin<Project, number>;
  declare hasProject: HasManyHasAssociationMixin<Project, number>;
  declare hasProjects: HasManyHasAssociationsMixin<Project, number>;
  declare countProjects: HasManyCountAssociationsMixin;
  declare createProject: HasManyCreateAssociationMixin<Project, 'ownerId'>;

  declare projects?: NonAttribute<Project[]>

  // getters that are not attributes should be tagged using NonAttribute
  // to remove them from the model's Attribute Typings.
  get fullName(): NonAttribute<string> {
    return this.first_name;
  }

  declare static associations: {
    projects: Association<User, Project>;
  };



}

User.prototype.toJSON = function(){
  let values = Object.assign({},this.get())
  delete values.password
  return values
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull:true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, { sequelize, modelName: "User", tableName: "user", timestamps: true });


(async () => {
   await sequelize.sync({alter: true})
})();

export default User