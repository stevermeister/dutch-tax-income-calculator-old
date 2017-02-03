import './styles.css';
import calcComponent from './calc/calc.component';
import toolbarComponent from './toolbar/toolbar.component';
import rulingComponent from './ruling/ruling.component';

angular.module('dit-calculator', ['ngMaterial'], function($locationProvider){
    $locationProvider.html5Mode(true);
  })
  .component('calc', calcComponent)
  .component('toolbar', toolbarComponent)
  .component('ruling', rulingComponent);