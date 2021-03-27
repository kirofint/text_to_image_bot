import { DocumentType } from '@typegoose/typegoose'
import { Chat } from '@/models/Chat'

interface SessionData {
  buttonClicksCounter?: Object
}
declare module 'telegraf' {
  export class Context {
    dbchat: DocumentType<Chat>
    session: SessionData
    translate: Function
    updateProperty: Function
  }
}