import ClientTable from './client-table.vue';

module.exports = {
  install: function (Vue, options) {
    Vue.component('client-table', ClientTable);
  }
};