import { IS_PRODUCTION } from "config";
import * as admin from "firebase-admin";

const serviceAccount = IS_PRODUCTION ? require('../../.key.json') : undefined
const credential = IS_PRODUCTION ? admin.credential.cert(serviceAccount) : undefined

const adminCfg = credential ? {
  credential
} : {
  projectId: "todo-b7369",
}

admin.initializeApp(adminCfg);
const db = admin.firestore()
export default db