import './styles.css';
import calcComponent from './calc/calc.component';
import toolbarComponent from './toolbar/toolbar.component';
import rulingComponent from './ruling/ruling.component';
import partnerSectionComponent from './parner-section/partner-section.component';

angular.module('dit-calculator', ['ngMaterial'], function($locationProvider){
    $locationProvider.html5Mode(true);
  })
  .component('calc', calcComponent)
  .component('toolbar', toolbarComponent)
  .component('ruling', rulingComponent)
  .component('partnerSection', partnerSectionComponent);
  