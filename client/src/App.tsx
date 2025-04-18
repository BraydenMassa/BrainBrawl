import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { isLoading, error } = useAuth0();
  return (
    <main>
      <h1>Auth0 Login</h1>
      {error && <p>Authentication error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
          <LoginButton />
          <LogoutButton />
          <Profile />
        </>
      )}
    </main>
  );
};

export default App;
