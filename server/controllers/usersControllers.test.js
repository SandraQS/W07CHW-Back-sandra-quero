const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/User");
const { userCreate, userLogin } = require("./usersControllers");

jest.mock("bcrypt");
jest.mock("../../database/models/User");
jest.mock("jsonwebtoken");

describe("Given userCreate controller", () => {
  describe("When it receives a req with a new user and res object", () => {
    test("Then it should called the method create and called the method json with the new user", async () => {
      const req = {
        body: {
          name: "Carlitos",
          username: "Carlitus",
          password: "holis",
          age: 33,
        },
      };

      const newUser = {
        body: {
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
        },
      };

      User.create = jest.fn().mockResolvedValue(newUser);
      const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
      };
      const res = mockResponse();

      await userCreate(req, res);

      expect(User.create).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(newUser);
    });
  });
});

describe("Given userLogin controller", () => {
  describe("When it receives a req with a username incorrect", () => {
    test("Then it should called the function next with error, error.message '', and error.code 401", async () => {
      const req = {
        body: {
          username: "Carlitussss",
          password: "holis",
        },
      };
      const next = jest.fn();
      User.findOne = jest.fn().mockResolvedValue(null);
      const expectedError = new Error("Parece que algo ha fallado");
      await userLogin(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
      expect(expectedError).toHaveProperty("message", expectedError.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 401);
    });
  });

  describe("When it receives a req with a username correct and password incorrect", () => {
    test("Then it should called the function next with error, error.message '', and error.code 401", async () => {
      User.findOne = jest.fn().mockResolvedValue({
        body: {
          id: "618eccea689d879ac3f85577",
          username: "Carlitus",
          password: "holi",
        },
      });

      const req = {
        body: {
          username: "Carlitus",
          password: "holiiii",
        },
      };

      const next = jest.fn();
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const error = new Error("Parece que algo ha fallado");
      await userLogin(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 401);
    });
  });

  describe("When it receives a req with a username and password correct", () => {
    test("Then it should called res.json with a new token", async () => {
      User.findOne = jest.fn().mockResolvedValue({
        body: {
          id: "618eccea689d879ac3f85577",
          username: "Carlitus",
          password: "holi",
        },
      });

      bcrypt.compare = jest.fn().mockResolvedValue(true);
      const req = {
        body: {
          username: "Carlitus",
          password: "holi",
        },
      };

      const secretToken = "TokenSuperSeguro";
      jwt.sign = jest.fn().mockReturnValue(secretToken);

      const response = {
        token: secretToken,
      };

      const res = {
        json: jest.fn(),
      };

      await userLogin(req, res);

      expect(res.json).toHaveBeenCalledWith(response);
    });
  });
});
