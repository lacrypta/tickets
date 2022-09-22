import { useEffect, useState } from "react";
import { db, collection, onSnapshot } from "../lib/public/firebase";

const TestComponent = () => {
  const [usersList, setUsersList] = useState<any>([]);

  useEffect(() => {
    const usersCol = collection(db, "users");
    onSnapshot(usersCol, {
      next: (snapshot) => {
        setUsersList(snapshot.docs.map((doc) => doc.data()));
        console.dir(snapshot.docs[0].data());
      },
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
