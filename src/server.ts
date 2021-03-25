import express from "express";
import { graphqlHTTP } from "express-graphql";
import graphqlResolver from "./graphql/resolvers";
import graphqlSchema from "./graphql/schema";
import Comment from "./models/Comment";
import Post from "./models/Post";
import User from "./models/User";
import sequelize from "./utils/database";

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
  })
);

User.hasMany(Post);
Post.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
Post.hasMany(Comment);
Comment.belongsTo(Post, { constraints: true, onDelete: "CASCADE" });
User.belongsToMany(User, {
  through: "users_followers",
  foreignKey: "followerId",
  otherKey: "followingId",
  as: "following",
});
User.belongsToMany(User, {
  through: "users_followers",
  foreignKey: "followingId",
  otherKey: "followerId",
  as: "followers",
});

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server listen on port ${process.env.PORT}`);
  });
});
