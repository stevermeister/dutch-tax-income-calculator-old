import template from './partner-section.html';

let toolbarComponent = {
  template,
  controller: function() {
    this.goPartner = () => {
      location.href='https://www.blueumbrella.nl/online-tax-return-netherlands/';
    };
  }
};

export default toolbarComponent;
