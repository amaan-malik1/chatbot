import React from "react";
import { useAuthUser } from "./hooks/useAuthUser.js";

const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const isAuthenticated = Boolean(authUser);

  if (isLoading) return "Loading....";
  return (
    <div>
      <div className="h-screen">
        <Routes>
          {/* Home */}
          <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />

          {/* Chat */}
          <Route
            path="/chat/:id" // this const var(id) must same as the var we used in the page like const {id} = useParams()
            element={
              isAuthenticated ? (
                <ChatPage />
              ) : (
                <Navigate to={isAuthenticated ? "/home" : "/login"} />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
