import { rest } from "msw";

function withAPIUrl(path: string): string {
  return `${process.env.API_URL}${path}`;
}

const token = "123";
const user = {
  id: "3c105d1a-d588-4c65-bfb5-06abe48cd325",
  email: "user@example.com",
};

export const handlers = [
  rest.get(withAPIUrl("/auth/me"), (req, res, ctx) => {
    const authHeader: string | null = req.headers.get("authorization");

    if (!authHeader || authHeader.split(" ")[1] !== token) {
      return res(ctx.status(401));
    }

    return res(
      ctx.delay(300),
      ctx.status(200),
      ctx.json({
        user,
      }),
    );
  }),
  rest.delete(withAPIUrl("/auth/me"), (_, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post<{ email: string; password: string }>(withAPIUrl("/auth/login"), (req, res, ctx) => {
    if (user.email === req.body.email && req.body.password === "P@ssw0rd!") {
      return res(
        ctx.delay(1500),
        ctx.status(200),
        ctx.json({
          user,
          token: "123",
        }),
      );
    }

    return res(
      ctx.delay(1500),
      ctx.status(401),
      ctx.json({
        errors: {
          general: "Invalid e-mail or password.",
        },
      }),
    );
  }),
];
