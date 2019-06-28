import './styles.css';
import calcComponent from './calc/calc.component';
import toolbarComponent from './toolbar/toolbar.component';
import rulingComponent from './ruling/ruling.component';
import partnerSectionComponent from './parner-section/partner-section.component';
import wordCalcComponent from './world-calc/world-calc';

angular
  .module(
    'dit-calculator',
    ['ngMaterial'],
    [
      '$locationProvider',
      function($locationProvider) {
        $locationProvider.html5Mode({
          enabled: true,
          requireBase: false,
        });
      },
    ],
  )
  .component('calc', calcComponent)
  .component('toolbar', toolbarComponent)
  .component('ruling', rulingComponent)
  .component('partnerSection', partnerSectionComponent)
  .component('worldCalcSection', wordCalcComponent);
