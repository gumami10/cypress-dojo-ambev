const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'yyw9bk',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://conexaoqa.herokuapp.com'
  },

});
//npx cypress run --record --key af625242-9370-4d3b-99f2-1018c78ed5e9