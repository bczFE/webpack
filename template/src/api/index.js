import axios from 'axios'

// axios.defaults.withCredentials = true
axios.defaults.baseURL = '//reading.baicizhan.com'
if (window.location.href.indexOf('baicizhan.com') !== -1) {
  axios.defaults.baseURL = '//'
}

function makeGet (url) {
  return async (data) => {
    // store.isLoading = true
    let result = null
    try {
      result = await axios.get(url, {
        params: data
      })
    } catch (e) {
      alert('请求出错，请稍后重试')
    } finally {
      // store.isLoading = false
    }
    checkresponse(result.data)
    return result.data
  }
}

function makePost (url, showError) {
  return async (data) => {
    // store.isLoading = true
    let result = null
    try {
      result = await axios({
        method: 'post',
        url,
        data
      })
      // console.log(result)
    } catch (e) {
      // console.log(e)
      if (showError !== false) {
        alert('请求出错，请稍后重试')
      }
    } finally {
      // store.isLoading = false
    }
    checkresponse(result.data)
    return result.data
  }
}

function checkresponse (data) {
  if (!data) {
    data = {}
  }
  if (data.err === 401 || data.code === 401) {
    window.location.href = data.login_url
  }
  // debugger
}

const getUserInfo = makeGet('/api/get_user_info')

export default {
  getUserInfo
}
