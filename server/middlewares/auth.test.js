const jwt = require("jsonwebtoken");
const auth = require("./auth");

describe("Given an auth function", () => {
  describe("When it´s called with req and next ", () => {
    test("Then it should call next function", () => {
      const next = jest.fn();
      const req = {
        header: jest
          .fn()
          .mockReturnValue(
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNhcmxpdHVzIiwiaWQiOiI2MThlY2NlYTY4OWQ4NzlhYzNmODU1NzciLCJuYW1lIjoiQ2FybGl0b3MiLCJhZ2UiOjMzLCJmcmllbmRzIjpbXSwiZW5lbWllcyI6W10sImltYWdlIjoiaHR0cHM6Ly9jZG5zLmljb25tb25zdHIuY29tL3dwLWNvbnRlbnQvYXNzZXRzL3ByZXZpZXcvMjAxMi8yNDAvaWNvbm1vbnN0ci11c2VyLTE0LnBuZyIsImlhdCI6MTYzNjgwNzg3NH0.nVz9ZoTSP8pthcrFvpHQV4YFMKn1pGfcOGPNjvEcahY"
          ),
      };
      jwt.verify = jest.fn().mockReturnValue({});
      auth(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it´s called with req object whitout an authHeader", () => {
    test("Then it should call next function with an error", () => {
      const next = jest.fn();
      const req = {
        header: jest.fn(),
      };
      const error = new Error("No estás autorizado");
      error.code = 401;
      auth(req, null, next);

      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
    });
  });
});
