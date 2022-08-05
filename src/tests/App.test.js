import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../../src/pages/Home/Home"
import Travels from "../../src/pages/Travels/Travels"
import Login from "../pages/Login/Login";
let { getPosts } = require("../services/postsServices");

// test("Can search for a post using its ID", async () => {
//   render(<Login />);
// });
// test("Description of test here", () => {
//     expect("data to check is passed here").toBeTruthy();
// });

// describe("Login functionality", () => {
//     test("Profile is a function.", () => {
//         expect(typeof(Login)).toBe("function");
//     });
//     test("If enabled its value will be true'.", () => {
//         expect(Login()).toEqual(true);
//     });
// });

test('renders the Home page successfully', () => {
    render(<Home />);
    expect(screen.queryAllByPlaceholderText("Let's Go!")).toEqual("Let's Go!");
    // expect(screen.getByRole("combobox")).toHaveDisplayValue("Select a breed");
    // expect(screen.getByLabelText("Let's Go!")).toBeDisabled();
    // expect(screen.getByRole("img")).toBeInTheDocument();
  });


describe("getPosts functionality", () => {
  test("getPosts is a function.", () => {
    expect(typeof getPosts).toBe("function");
  });
  test("Function must be valid'.", () => {
    expect(getPosts).toBeTruthy();
  });
});


export default async function mockFetch(url) {
    switch (url) {
        case "localhost:3050/posts": {
            return {
                ok: true,
                status: 200,
                json: async () => postListResponse,
            };
        }
        case "https://dog.ceo/api/breed/husky/images" :
        case "https://dog.ceo/api/breed/cattledog/images": {
            return {
                ok: true,
                status: 200,
                json: async () => dogImagesResponse,
            };
        }
        default: {
            throw new Error(`Unhandled request: ${url}`);
        }
    }
}