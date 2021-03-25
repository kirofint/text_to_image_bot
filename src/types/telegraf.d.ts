import { DocumentType } from '@typegoose/typegoose'
import { Chat } from '@/models/Chat'

declare module 'telegraf' {
  export class Context {
    public dbchat: DocumentType<Chat>
  }
}