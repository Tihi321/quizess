class Selectors {

  constructor() {
    this.$body = document.querySelector('html, body');
  }

  getBody = () => {
    return this.$body;
  }

}

const selectors = new Selectors();
Object.freeze(selectors);

export default selectors;
