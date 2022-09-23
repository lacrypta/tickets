import { useEffect, useState } from "react";
import { db, collection, onSnapshot, doc } from "../lib/public/firebase";

const User = ({ user }: any) => {
  if (!user) {
    return "";
  }
  return (
    <div key={user.id}>
      <div>Username: {user.username}</div>
      <div>Address: {user.permit.owner}</div>
      <div>
        <textarea>{JSON.stringify(user.permit)}</textarea>
      </div>
    </div>
  );
};

const TestComponent = () => {
  const [usersList, setUsersList] = useState<any>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Multiple
    const usersRef = collection(db, "users");
    onSnapshot(usersRef, {
      next: (snapshot) => {
        setUsersList(snapshot.docs.map((doc) => doc.data()));
        console.dir(snapshot.docs[0].data());
      },
    });

    // Single
    const userRef = doc(
      db,
      "users",
      "0xFA14B3b6104A64F676A170C61A93e17556CE128e"
    );
    onSnapshot(userRef, {
      next: (snapshot) => {
        console.info("User updated");
        console.dir(snapshot.data());
        setUser(snapshot.data());
      },
    });
  }, []);

  return (
    <div>
      <h2>List</h2>
      {usersList.map((user: any, k: string) => {
        return <User key={k} user={user} />;
      })}
      <div>
        <h2>Single</h2>
        <User user={user} />
      </div>
    </div>
  );
};

export default TestComponent;
