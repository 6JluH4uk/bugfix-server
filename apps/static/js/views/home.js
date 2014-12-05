define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'bootstrap',
    'text!templates/tasks.html',
    ],
    function ( $ , _ , Backbone, Handlebars, Bootstrap, TaskTemplate) { 
        return Backbone.View.extend({
            el: $('.content'),

            initialize: function(){
                this.render();
            },
            render: function(){
                var template = Handlebars.compile(TaskTemplate)
                $(this.el).html(template())
            },
        })
    }
)
