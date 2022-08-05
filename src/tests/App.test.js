import React from "react";
import { render} from "@testing-library/react";
import Home from "../../src/pages/Home/Home"

let { getPosts, createPost } = require("../services/postsServices");


test('renders the Home page successfully', () => {
    render(<Home />);
  });

describe("getPosts functionality", () => {
  test("getPosts is a function.", () => {
    expect(typeof getPosts).toBe("function");
  });
  test("Function must be valid", () => {
    expect(getPosts).toBeTruthy();
  });
});

describe("createPost functionality", () => {
  test("createPost is a function", () => {
    expect(typeof createPost).toBe("function");
  });
  test("Function must be valid", () => {
    expect(createPost).toBeTruthy();
  });
});

test("That posts have the following specified properties", () => {
  let testPost = {title: "test title", description: "test description", rating: "4"}
  expect(testPost).toHaveProperty('title' && 'description')
})

test("That users have the following specified properties", () => {
  let testUser = {username: "test username", email: "test@test.com"}
  expect(testUser).toHaveProperty('username' && 'email')
})

