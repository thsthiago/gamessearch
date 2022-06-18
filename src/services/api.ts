import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_SERVICE,
  headers: {
    'x-rapidapi-host': process.env.NEXT_PUBLIC_HOST,
    'x-rapidapi-key': process.env.NEXT_PUBLIC_IP_KEY
  }
})
