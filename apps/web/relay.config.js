module.exports = {
  src: "./graphql",
  language: "typescript",
  schema: "../server/schema/schema.graphql",
  excludes: ["**/node_modules/**", "**/__mocks__/**", "**/__generated__/**"],
};
