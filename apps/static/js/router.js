define([ 
    'jquery',
    'underscore',
    'backbone',
    'views/home',
    ],
    function ( $ , _ , Backbone, HomeView) { 
        AppRouter = Backbone.Router.extend({
            routes: {
                '':  'home',
            },

            'home': function(){
                if (this.siteView)
                    this.siteView.deactivate()
                this.siteView = new HomeView();
             },
        })


        var initialize = function(){
            var app_router = new AppRouter();
            Backbone.history.start();
        }

        return {'initialize': initialize }

    }
);
