import * as toDo from "interfaces/todo"
import db from "database"
import { firestore } from "firebase-admin"

type IToDo = toDo.IToDo
const toDoRef = db.collection('todo')

export class NotFoundError extends Error {
  constructor(objectName: string) {
    super(`${objectName} not found`)
    this.name = "Not Found Error"
    Object.setPrototypeOf(this, NotFoundError.prototype);
    // ref: https://stackoverflow.com/questions/55065742/implementing-instanceof-checks-for-custom-typescript-error-instances
  }
}

function serializer(snapshot: firestore.DocumentSnapshot) {
  if (!snapshot.exists) {
    throw new NotFoundError('todo')
  }
  const data = snapshot.data() as Partial<Omit<IToDo, 'id' | 'created'>>
  const id = snapshot.id
  const created = String(snapshot.createTime?.toDate().getTime())
  return {
    id,
    created,
    ...data
  } as IToDo
}

interface IToDoServices {
  create: (data: Omit<IToDo, 'id' | 'created'>) => Promise<toDo.IToDo>
  update: (id: string, data: Partial<Omit<IToDo, 'id' | 'created'>>) => Promise<toDo.IToDo>
  retrieve: (id: string) => Promise<toDo.IToDo>
  list: (userId: string) => Promise<toDo.IToDo[]>
  delete: (id: string) => Promise<void>
}

class ToDoServices implements IToDoServices {
  async create(data: Omit<IToDo, 'id' | 'created'>) {
    const res = await toDoRef.add(data)
    const newToDoRef = toDoRef.doc(res.id)
    return serializer(await newToDoRef.get())
  }
  async update(id: string, data: Partial<Omit<IToDo, 'id' | 'created'>>) {
    const updateToDoRef = toDoRef.doc(id)
    await updateToDoRef.get()
    await updateToDoRef.update(data)
    return serializer(await updateToDoRef.get())
  }
  async retrieve(id: string) {
    const retrieveToDoRef = toDoRef.doc(id)
    return serializer(await retrieveToDoRef.get())
  }
  async list(userId: string) {
    const queryToDoRef = toDoRef.where('userId', '==', userId);
    const toDos = await queryToDoRef.get();
    const serializedToDo: IToDo[] = []
    toDos.forEach((toDo) => serializedToDo.push(serializer(toDo)))
    return serializedToDo
  }
  async delete(id: string) {
    const deleteToDoRef = toDoRef.doc(id)
    await deleteToDoRef.get()
    await deleteToDoRef.delete()
    return
  }
}

export default new ToDoServices()