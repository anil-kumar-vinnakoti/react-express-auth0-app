import express from "express";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";
import axios from "axios";

const app = express();
const port = process.env.PORT || 4000;
app.use(cors());
const jwtCheck = auth({
  audience: "its a unique identifier",
  issuerBaseURL: "https://dev-lokpkdwjbb1xoaby.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

// middlewares
// enforce on all endpoints
app.use(jwtCheck);
app.use(express.json());

// routes
app.get("/me", async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const response = await axios.get(
      "https://dev-lokpkdwjbb1xoaby.us.auth0.com/userinfo",
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const userInfo = response.data;
    res.send(userInfo);
  } catch (error) {
    console.log(error);
  }
});

// error handling

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Internal server error";
  res.status(status).send(message);
});

app.listen(port, () => console.log("listening on 4000"));
