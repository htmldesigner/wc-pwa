export default {
  async arrayTemporalFilter(result, payload) {
    let candidate = [...result.flat()]
    if (!candidate.length) {
      candidate.push(payload)
    } else {
      let idx = candidate.findIndex(el => +el.device === +payload.device)
      console.log(idx)
      if (idx > -1) {
        candidate.splice(idx, 1)
        candidate.push(payload)
      } else {
        candidate.push(payload)
      }
    }
    return candidate
  },


  async compareDeviceId(consumers, payload) {


    consumers.flat().forEach(element => {
      if (element.devices) {
        element.devices.forEach(dev => {
          if (+dev.id === +payload.device) {
            dev.waiting = true
          }
        })
      }
    })

    return consumers

  }


}
