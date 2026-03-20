"use client";

import axios from "axios";
import { useState } from "react";

export default function Page() {
  const [responseData, setResponseData] = useState(null);

  const createNewUser = async () => {
    try {
      const response = await axios.post("/api/user/new-user");
      setResponseData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(responseData);

  if (!responseData) return <button onClick={createNewUser}>REGISTER</button>;

  return <>LOGGED IN</>;
}
