import { useEffect, useState } from "react";
import { db, collection, getDocs } from "../lib/public/firebase";

const TestComponent = () => {
  const [usersList, setUsersList] = useState<any>([]);

  const usersCol = collection(db, "users");

  useEffect(() => {
    getDocs(usersCol).then((usersSnapshot) => {
      setUsersList(usersSnapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <div>
      {usersList.map((user: any) => {
        return (
          <div key={user.id}>
            <div>Username: {user.username}</div>
            <div>Address: {user.permit.owner}</div>
            <div>
              <textarea>{JSON.stringify(user.permit)}</textarea>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TestComponent;
