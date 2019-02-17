class Devices {

  iPhone = () => {
    let checkIphone = false;

    if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
      checkIphone = true;
    }

    return checkIphone;
  }

}

const devices = new Devices();
Object.freeze(devices);

export default devices;
