/** Connect to Moralis server */
const serverUrl = 'https://qmh63gsjnsxv.usemoralis.com:2053/server'
const appId = 'l7NdmPmUGAm2bFCEuklXIcbxRU3VEj1oxNH58U6s'
Moralis.start({ serverUrl, appId })

/** Add from here down */
async function login() {
  let user = Moralis.User.current()
  if (!user) {
    try {
      user = await Moralis.authenticate({
        signingMessage: 'Created by Buddhadeb Chhetri ',
      })
      location.reload()
      launch()
      console.log(user)
      console.log(user.get('ethAddress'))
    } catch (error) {
      console.log(error)
    }
  }
}

async function logOut() {
  await Moralis.User.logOut()
  console.log('logged out')
  location.reload()
}

document.getElementById('btn-login').onclick = login
document.getElementById('btn-logout').onclick = logOut
