import { io } from 'socket.io-client'
import { NODE_SERVER_ORIGIN } from '../../url'
import { SOCKET_SERVER_ORIGIN } from '../../url'

// TODO Move JAVA url
export const socket = io(SOCKET_SERVER_ORIGIN)
// export const socket = io(NODE_SERVER_ORIGIN)
