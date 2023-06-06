'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

function Home() {

  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(`/users/${email}`);
  };
  

  return (
    <div>
      <h1>Go to Email Address</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick = {handleSubmit}>Submit</button>
    </div>
  );
}

export default Home;