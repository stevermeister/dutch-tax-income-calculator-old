import template from './ruling.html';
import { constants } from 'dutch-tax-income-calculator';

let rulingComponent = {
  template,
  controller: function() {
    this.year = constants.currentYear;
    this.ruling = constants.rulingThreshold;
  }
};

export default rulingComponent;
