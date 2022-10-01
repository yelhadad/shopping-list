import React from "react";
import { CurrentUser } from "..";

function Home() {
  const { user, setUser } = React.useContext(CurrentUser);
  return (
    <div>
      <h1>this is Home page</h1>
      {user === null ? <h3>please log in to see the shopping table</h3> : null}
    </div>
  );
}

export default Home;
