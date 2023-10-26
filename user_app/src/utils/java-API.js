import AsyncStorage from '@react-native-async-storage/async-storage'
import { JAVA_SERVER_ORIGIN } from '../../url'

// NodeServer
let api_origin = JAVA_SERVER_ORIGIN

async function doFetch(url, init = {}) {
  let token = await AsyncStorage.getItem('token')
  console.log('token:', token)

  let method = init.method || 'GET'
  console.log('[JAVA REQ]', method, url)

  init.headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + token,
    ...init.headers,
  }

  try {
    let res = await fetch(api_origin + url, init)
    let json = await res.json()
    console.log('[JAVA RES]', method, url, json)
    if (json.error && json.message) {
      return { error: json.message }
    }
    return json
  } catch (error) {
    console.log('[JAVA RES]', method, url, String(error))
    return { error: String(error) }
  }
}

export async function get(url) {
  return doFetch(url)
}

export async function post(url, body) {
  return doFetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

export async function put(url, body) {
  return doFetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}
