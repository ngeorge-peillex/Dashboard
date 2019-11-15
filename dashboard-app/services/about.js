import axios from 'axios'

const about = async () => (await axios.get(process.env.API_ENDPOINT + 'about.json'))['data']

export default about