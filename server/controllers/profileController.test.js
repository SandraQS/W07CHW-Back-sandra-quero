const User = require("../../database/models/User");
const { getUsers } = require("./profileController");

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
