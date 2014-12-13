define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/project.html',
    ],
    function ( $ , _ , Backbone, Handlebars, ProjectTemplate) { 
        return Backbone.View.extend({
            tagName: "tr",

            initialize: function(){
                this.render()
            },

            events: {
                'click .del': 'del',
            },

            del: function(){
                if (confirm('Вы действительно хотите удалить сайт?')){
                    this.model.destroy()
                    this.remove()
                }
            },

            render: function(){
                template = Handlebars.compile(ProjectTemplate)
                this.$el.html(template(this.model.toJSON()))
                $('.allprojects tbody').append(this.$el)
                return this;
            },
        })
    }
)
