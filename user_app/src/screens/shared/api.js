import AsyncStorage from '@react-native-async-storage/async-storage'
import { url } from '../../../url'

export let api_origin = url

export async function post(additionalUrl, body) {
  console.log(api_origin + additionalUrl)
  try {
    let res = await fetch(api_origin + additionalUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    let json = await res.json()
    return json
  } catch (error) {
    return { error: String(error) }
  }
}

export async function get(additionalUrl) {
  try {
    console.log(api_origin + additionalUrl)
    let res = await fetch(api_origin + additionalUrl, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    })

    let json = await res.json()
    console.log('get', json)
    return json
  } catch (error) {
    return { error: String(error) }
  }
}
