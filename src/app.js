import './styles.css';
import calcComponent from './calc/calc.component';
import toolbarComponent from './toolbar/toolbar.component';
import rulingComponent from './ruling/ruling.component';
import partnerSectionComponent from './parner-section/partner-section.component';
import wordCalcComponent from './world-calc/world-calc';

var App = angular.module('dit-calculator', ['ngMaterial']);
App.config(['$compileProvider', '$logProvider', '$locationProvider', function($compileProvider, $logProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    $logProvider.debugEnabled(true);
    $compileProvider.debugInfoEnabled(true);

    // If running in production, remove debugging info across application
    if (process.env.NODE_ENV !== 'development' && process.env.WEBPACK_DEV_SERVER !== 'development') {
      $logProvider.debugEnabled(false);
      $compileProvider.debugInfoEnabled(false);
      console.table = undefined;
    }
  }]);  
App.component('calc', calcComponent)
  .component('toolbar', toolbarComponent)
  .component('ruling', rulingComponent)
  .component('partnerSection', partnerSectionComponent)
  .component('worldCalcSection', wordCalcComponent);
