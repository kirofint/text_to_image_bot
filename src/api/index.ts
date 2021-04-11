import logger from '@/helpers/logger';
import axios from 'axios'
import FormData from 'form-data'

export async function getPictureUrl(text: string) {
  try {
		const form = new FormData()
		form.append('text', text)

		const { data } = await axios.post('https://api.deepai.org/api/text2img', form, {
			headers: {
				...form.getHeaders(),
        'api-key': process.env.API_KEY
      }
		})

    const response = data.output_url
    if (!response) throw new Error('Some error with API')

    return response
  } catch (error) {
    logger(error)
    return false
  }
}
