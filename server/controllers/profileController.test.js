const User = require("../../database/models/User");
const { getUsers, addFriends } = require("./profileController");

jest.mock("../../database/models/User");

describe("Given getUsers controller", () => {
  describe("When it receives a res object", () => {
    test("Then it should called the method find and called the method json with the all users", async () => {
      const res = {
        json: jest.fn(),
      };

      const users = {
        users: {},
      };

      User.find = jest.fn().mockResolvedValue({});
      await getUsers(null, res);

      expect(User.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(users);
    });
  });

  describe("When it receives a rejected error", () => {
    test("Then it should called the next function with error, error.message 'No encontrado', error.code 404", async () => {
      const res = {
        json: jest.fn(),
      };

      User.find = jest.fn().mockRejectedValue(null);
      const next = jest.fn();
      const error = new Error("No encontrado");

      await getUsers(null, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 404);
    });
  });
});

describe("Given addFriends controller", () => {
  describe("When it receives a req object with id unexist", () => {
    test("Then it should called the next function with error, message 'Usuario no entontrado' and code 404", async () => {
      const req = {
        body: {},
      };
      const next = jest.fn();
      const error = new Error("Usuario no entontrado");

      await addFriends(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 404);
    });
  });

  describe("When it receives a req object with id exist and userInfo no exist", () => {
    test("Then it should called the next function with error, message 'Usuario no entontrado' and code 404", async () => {
      const req = {
        body: { id: "619005acad093c07f5590449" },
      };
      const next = jest.fn();
      const error = new Error("Usuario no entontrado");

      await addFriends(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 404);
    });
  });

  describe("When it receives a req object with id and userInfo exist", () => {
    test("Then it should called the method json with the myUser object that has the friends property with that id", async () => {
      const req = {
        body: { id: "619005acad093c07f5590449" },
        userInfo: { id: "618eccea689d879ac3f85577" },
      };
      const res = {
        json: jest.fn(),
      };
      const myUser = {
        name: "Carlitos",
        username: "Carlitus",
        password:
          "$2b$10$s3c31JSTdrwRMwW5jLaE6.ridoUF4lXQpSTQtECectp/aCmMNXswK",
        friends: [],
        enemies: [],
        age: 33,
        image:
          "https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-user-14.png",
        id: "618eccea689d879ac3f85577",
      };
      User.findOne = jest.fn().mockReturnValue(myUser);

      await addFriends(req, res);

      expect(res.json).toHaveBeenCalledWith(myUser);
    });
  });
});
