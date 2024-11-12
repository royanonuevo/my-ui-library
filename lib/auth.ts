import { signOut } from 'next-auth/react'
import { BroadcastChannel } from 'broadcast-channel'

const logoutChannel = new BroadcastChannel('logout')

export const clearAuthInAllTabs = () => {
  logoutChannel.onmessage = (msgs) => { // eslint-disable-line
    console.log('clearAuthInAllTabs', msgs) 
    clearAuth()
    logoutChannel.close()
  }
}

export const clearAuth = () => {
  logoutChannel.postMessage('SIGN_OUT')
  
  signOut({
    callbackUrl: '/sign-in'
  })
}


export const signIn = () => {

}

export const refreshToken = () => {
  
}