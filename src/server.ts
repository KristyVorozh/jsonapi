import { createServer } from "miragejs";
import { authList, authorList, quoteList } from "./db/auth.db";
import { createToken } from "./utils/endecodedToken";
import { jwtDecode } from "jwt-decode";

const failedObj = {
  success: false,
  data: {
    message: "Access denied.",
  },
};
export function makeServer() {
  const server = createServer({
    routes() {
      this.get("/api/info", (_schema, request) => {
        const fail = request.queryParams.fail === "true";

        if (fail) {
          return {
            success: false,
            data: null,
            error: "Failed to fetch company information.",
          };
        }

        return {
          success: true,
          data: {
            info: "Some information about the company",
          },
        };
      });
      this.post("/api/login", async (_schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const fail = authList.filter(
          (authItem) =>
            authItem.email === attrs.email &&
            authItem.password === attrs.password
        );
        const token = await createToken(attrs).then((token) => {
          return token;
        });

        if (!fail.length) {
          return failedObj;
        }

        return {
          success: true,
          data: {
            token,
          },
        };
      });
      this.get("/api/profile", (_schema, request) => {
        const token = request.queryParams.token as string;
        const tokenDecode: { email: string; password: string } =
          jwtDecode(token);
        const fullName = authList.find(
          (authItem) =>
            authItem.email === tokenDecode.email &&
            authItem.password === tokenDecode.password
        )?.fullName;

        if (!token) {
          return failedObj;
        }

        return {
          success: true,
          data: {
            fullName,
            email: tokenDecode.email,
          },
        };
      });
      this.get(
        "/api/author",
        (_schema, request) => {
          const token = request.queryParams.token;
          const randomItem =
            authorList[Math.floor(Math.random() * authorList.length)];

          if (!token) {
            return failedObj;
          }

          return {
            success: true,
            data: {
              ...randomItem,
            },
          };
        },
        {
          timing: 5000,
        }
      );
      this.get(
        "/api/quote",
        (_schema, request) => {
          const token = request.queryParams.token;
          const authorId = request.queryParams.authorId;

          const itemByAuthorId = quoteList.find(
            (quote) => quote.authorId === Number(authorId)
          );

          if (!token && !authorId) {
            return failedObj;
          }

          return {
            success: true,
            data: {
              ...itemByAuthorId,
            },
          };
        },
        {
          timing: 5000,
        }
      );
      this.delete("/api/logout", (_schema, request) => {
        const token = request.queryParams.token;
        localStorage.clear();

        if (!token) {
          return failedObj;
        }

        return {
          success: true,
          data: [],
        };
      });
    },
  });
  return server;
}
