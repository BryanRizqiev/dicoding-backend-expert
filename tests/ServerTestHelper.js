const ServerTestHelper = {
  async getAccessToken ({ server, username, fullname = 'Dicoding Indonesia' }) {
    const payload = {
      username, password: 'secret'
    }

    await server.inject({
      method: 'POST',
      url: '/users',
      payload: {
        ...payload,
        fullname
      }
    })

    const responseAuth = await server.inject({
      method: 'POST',
      url: '/authentications',
      payload
    })

    const { accessToken } = JSON.parse(responseAuth.payload).data
    return accessToken
  }
}

module.exports = ServerTestHelper
