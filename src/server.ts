import App from "./App"
import db from "database"

const app = new App([])
app.initialize().then(async (server) => {
  const todoRef = db.collection('todo')
  const result = await todoRef.doc('todo2').set({
    name: 123
  })
  const todo1Ref = todoRef.doc('todo1');
  console.log(1)
  const doc = await todo1Ref.get();
  console.log(2)
  if (!doc.exists) {
    console.log('No such document!');
  } else {
    console.log('Document data:', doc.data());
  }
})