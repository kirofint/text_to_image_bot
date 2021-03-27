import { errLogger } from '@/helpers/logger';
import axios from 'axios'

export async function getPictureUrl(text: string) {
  try {
    const { data } = await axios.post('https://api.deepai.org/api/text2img', text, {
      headers: {
        'api-key': process.env.API_KEY
      }
    })

    const response = data.output_url
    if (!response) throw new Error('Some error with API')

    return response
  } catch (error) {
    errLogger(error)
    return false
  }
}