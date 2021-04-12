import { prop, getModelForClass, DocumentType } from '@typegoose/typegoose'

export class Chat {
  @prop({ required: true, index: true, unique: true })
  id: number
  @prop({ required: true, default: 'en' })
  language: string
  @prop({ required: true, default: true })
  rating_buttons: boolean
  @prop({ default: true })
  image_caption: boolean
  @prop({ required: true, default: 0 })
  autoremove_interval: number

  _id?: string
}

const ChatModel = getModelForClass(Chat, {
  schemaOptions: { timestamps: true },
})

export async function findOrCreate (id: number): Promise<DocumentType<Chat>> {
  return await ChatModel.findOne({ id }) ?? await new ChatModel({ id }).save()
}

export async function updateChat (chat: Chat, changes_key: string) {
  const change = { [changes_key]: chat[changes_key] }
  await ChatModel.updateOne({ _id: chat._id }, { $set: change })
}
