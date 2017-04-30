import template from './ruling.html';
import c from '../data.json'; // Get JSON containing calculation constants

let rulingComponent = {
  template,
  controller: function($scope, $location) {
    $scope.year = c.currentYear;
    $scope.ruling = c.rulingThreshold;
  }
};

export default rulingComponent;
