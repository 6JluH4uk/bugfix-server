define([ 
    'jquery',
    'underscore',
    'backbone',
    'views/home',
    'views/projects'
    ],
    function ( $ , _ , Backbone, HomeView, ProjectsView) { 
        AppRouter = Backbone.Router.extend({
            routes: {
                '':  'home',
                'projects': 'projects',
                'bugs(/status:statuses)(/date:date)(/projects:projects)': 'home',
            },

            home: function(statuses, date, projects){
                if (statuses)
                    statuses = _.map(statuses.split('.'), function(status_id){ return Number(status_id); })
                else
                    statuses = []

                if (projects)
                    projects = _.map(projects.split('.'), function(project){ return Number(project); })
                else
                    projects = []

                if (!(date))
                    date = 0

                $('.top-menu li').removeClass('active')
                $('.bugs').addClass('active')

                if (this.siteView)
                    this.siteView.deactivate()
                this.siteView = new HomeView({ statuses: statuses,
                                               date: date,
                                               projects: projects,});
             },

             projects: function(){
                $('.top-menu li').removeClass('active')
                $('.projects').addClass('active')

                if (this.siteView)
                    this.siteView.deactivate()
                this.siteView = new ProjectsView();
             },
        })


        var initialize = function(){
            var app_router = new AppRouter();
            Backbone.history.start();
        }

        return {'initialize': initialize }

    }
);
