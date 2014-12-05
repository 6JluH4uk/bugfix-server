require.config({
  paths: {
    jquery: 'libs/jquery/jquery-1.11.1.min',
    underscore: 'libs/backbone/underscore-min',
    backbone: 'libs/backbone/backbone-min',
    bootstrap: 'libs/bootstrap/bootstrap.min',
    handlebars: 'libs/handlebars/handlebars',
    text: 'text',
    vis: 'libs/vis/vis.min',
    moment: 'libs/moment/moment.min',
  },

  shim: {
        jquery: {
          exports: '$'
        },
        underscore: {
          exports: '_'
        },
        backbone: {
          deps:['jquery', 'underscore'],
          exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'Bootstrap',
        },
        handlebars: {
          exports: 'Handlebars'
        }
        ,
        vis: {
            exports: 'vis',
        },
      },
      'app': {
            deps: [
                'jquery',
                'underscore',
                'backbone',
                'handlebars',
            ]
      }

});


require(['app'],
    function (App) {
        App.initialize();
    }
);
