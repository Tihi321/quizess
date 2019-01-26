class Helper {

  constructor() {
    this.extractRootDomain = this.extractRootDomain.bind(this);
  }

  extractHostname(url) {
    let hostname;

    // find & remove protocol (http, ftp, etc.) and get hostname.
    if (url.indexOf('//') > -1) {
      [, , hostname] = url.split('/');
    } else {
      [hostname] = url.split('/');
    }

    // find & remove port number
    [hostname] = hostname.split(':');

    // find & remove "?"
    [hostname] = hostname.split('?');

    return hostname;
  }

  // To address those who want the "root domain," use this function:
  extractRootDomain(url) {
    let domain = this.extractHostname(url);
    const splitArr = domain.split('.');
    const arrLen = splitArr.length;

    // extracting the root domain here if there is a subdomain

    if (arrLen > 2) {
      domain = `${splitArr[arrLen - 2]}.${splitArr[arrLen - 1]}`;

      // check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
      if (splitArr[arrLen - 2].length === 2 && splitArr[arrLen - 1].length === 2) {

        // this is using a ccTLD
        domain = `${splitArr[arrLen - 3]}.${domain}`;
      }
    }
    return domain;
  }

  extractExtensionName(url) {
    return url.split('.').pop();
  }

}

const helpers = new Helper();
Object.freeze(helpers);

export default helpers;

