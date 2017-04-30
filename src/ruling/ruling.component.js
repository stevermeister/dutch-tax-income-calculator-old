import template from './ruling.html';
import constants from '../data.json'; // Get JSON containing calculation constants

let rulingComponent = {
  template,
  controller: function($scope, $location) {
    $scope.year = constants.currentYear;
    $scope.ruling = constants.rulingThreshold;
  }
};

export default rulingComponent;
