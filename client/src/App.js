import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function App() {
  const {
    loginWithPopup,
    loginWithRedirect,
    user,
    logout,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  async function callProtectedAPI() {
    try {
      const token = await getAccessTokenSilently();
      const user = await axios.get("http://localhost:4000/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(user.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <h1>{isAuthenticated ? "Hello Anil" : "Please Login"}</h1>
      <div>
        <button onClick={loginWithPopup}>Login With Popup</button>
      </div>
      <div>
        <button onClick={loginWithRedirect}>Login With Redirect</button>
      </div>

      {isAuthenticated ? (
        <>
          <div>
            <button onClick={callProtectedAPI}>Call Protected</button>
          </div>
          <div>
            <button onClick={logout}>Logout</button>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default App;
