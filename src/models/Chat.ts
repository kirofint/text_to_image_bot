import { prop, getModelForClass, DocumentType } from '@typegoose/typegoose'

export class Chat {
  @prop({ required: true, index: true, unique: true })
  id: number

  @prop({ required: true, default: 'en' })
  language: string
}

const ChatModel = getModelForClass(Chat, {
  schemaOptions: { timestamps: true },
})

export async function findOrCreate (id: number): Promise<DocumentType<Chat>> {
  return await ChatModel.findOne({ id }) ?? await new ChatModel({ id }).save()
}
