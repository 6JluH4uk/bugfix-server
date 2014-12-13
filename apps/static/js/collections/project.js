define([ 
    'jquery',
    'underscore',
    'backbone',
    'models/project',
    ],
    function ( $ , _ , Backbone, ProjectModel) { 
        return Backbone.Collection.extend({
            model: ProjectModel,
            url: '/projects/',
        })
    }
)
