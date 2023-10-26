import { NODE_SERVER_ORIGIN } from '../../url'

// NodeServer
let api_origin = NODE_SERVER_ORIGIN

export async function post(url, body) {
  console.log('[POST]', url)
  try {
    let res = await fetch(api_origin + url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    let json = await res.json()
    console.log('post', JSON.stringify(json))
    return json
  } catch (error) {
    return { error: String(error) }
  }
}

export async function get(url) {
  console.log('url: ', api_origin + url)
  try {
    let res = await fetch(api_origin + url, {
      headers: {
        Accept: 'application/json',
      },
    })
    let json = await res.json()
    console.log('get', JSON.stringify(json))
    return json
  } catch (error) {
    return { error: String(error) }
  }
}

export async function put(url, body) {
  try {
    let res = await fetch(api_origin + url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    let json = await res.json()
    // console.log('put', JSON.stringify(json))
    return json
  } catch (error) {
    return { error: String(error) }
  }
}
