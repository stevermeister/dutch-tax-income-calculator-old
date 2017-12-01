import template from './partner-section.html';

let toolbarComponent = {
  template,
  controller: function() {
    this.goPartner = () => {
      location.href='https://www.taxdoctor.nl?utm_source=thetax';
    };
  }
};

export default toolbarComponent;
