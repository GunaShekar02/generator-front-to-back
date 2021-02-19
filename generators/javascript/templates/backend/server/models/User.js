import Sequelize from "sequelize";
import sequelize from "../common/sequelize";

const User = sequelize.define("User", {
  name: Sequelize.STRING(100),
});

export default User;
