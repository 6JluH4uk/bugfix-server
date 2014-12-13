define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'bootstrap',
    'text!templates/tasks.html',
    ],
    function ( $ , _ , Backbone, Handlebars, Bootstrap, BugsTemplate) { 
        return Backbone.View.extend({

            initialize: function(){
                this.render(this.collection.toJSON());
            },

            deactivate: function() {
                this.$el.empty();
                this.stopListening();
                this.undelegateEvents();
                return this;
            },

            render: function(bugs){
                var template = Handlebars.compile(BugsTemplate, {noEscape: true})
                $('.bugs tbody').html(template({'bugs': bugs}))
            },
        })
    }
)
