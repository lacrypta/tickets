import { ResponseType } from "../../types/request";
import { firebaseConfig } from "./firebase";
const API_URL = `https://${CLOUD_FUNCTIONS_REGION}-${firebaseConfig.projectId}.cloudfunctions.net/`;

const ajaxCall = async (path: string, data: any): Promise<ResponseType> => {
  const res = await fetch(API_URL + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export { ajaxCall };
