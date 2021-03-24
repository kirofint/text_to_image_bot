import { errLogger } from '@/helpers/logger';
import axios from 'axios'

export async function getPictureUrl(text: string) {
  try {
    const { data } = await axios.post('https://api.deepai.org/api/text2img', text, {
      headers: {
        'api-key': '841b0471-3411-41b2-9040-6076dc4f95b9'
      }
    })

    const response = data.output_url
    if (!response)
        throw new Error('Не удалось получить ссылку на изображение')
    return response
    
  } catch (error) {
    errLogger(error)
    return false
  }
}