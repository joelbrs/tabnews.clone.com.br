import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { env } from "./config";
import { Post, User } from "./modules";

const seedUsers = async () => {
  try {
    const users = [];

    for (let i = 0; i < 100; i++) {
      users.push({
        username: faker.internet.userName(),
        password: await bcrypt.hash(`password-${i}`, env.HASH_SALT),
        email: faker.internet.email(),
        description: faker.lorem.sentence(),
      });
    }

    await User.insertMany(users);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const seedPosts = async () => {
  try {
    const posts = [];
    const users = await User.find();

    for (let i = 0; i < 100; i++) {
      posts.push({
        title: faker.lorem.words(5),
        description: faker.lorem.paragraphs(5),
        creatorId: users[Math.floor(Math.random() * users.length)]?._id,
      });
    }
    await Post.insertMany(posts);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const seedDatabase = async () => {
  await seedUsers();
  await seedPosts();
};
