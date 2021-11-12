const User = require("../../database/models/User");
const { userCreate } = require("./usersControllers");

jest.mock("../../database/models/User");

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
