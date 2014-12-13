define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'bootstrap',
    'views/project',
    'models/project',
    'collections/project',
    'text!templates/projects.html',
    ],
    function ( $ , _ , Backbone, Handlebars, Bootstrap, ProjectView, ProjectModel, ProjectCollection, ProjectsTemplate) { 
        $.fn.serializeObject = function() { var o = {}; var a = this.serializeArray(); $.each(a, function() { if (o[this.name] !== undefined) { if (!o[this.name].push) { o[this.name] = [o[this.name]]; } o[this.name].push(this.value || ''); } else { o[this.name] = this.value || ''; } }); return o; };
        return Backbone.View.extend({
            el: $('.content'),

            initialize: function(){
                that = this
                this.collection = new ProjectCollection()
                this.collection.fetch().done(function(){
                    that.render();
                })
            },
            events: {
                'submit .addProject': 'addProject',
            },

            addProject: function(ev){
                that = this
                data = $(ev.target).serializeObject()
                project = new ProjectModel(data)
                project.save().done(function(id){
                    project.set({'id': id})
                    that.collection.add(project)
                    var view = new ProjectView({model: project})
                })
                ev.target.reset()
                return false;
            },

            deactivate: function() {
                this.$el.empty();
                this.stopListening();
                this.undelegateEvents();
                return this;
            },

            render: function(){
                var template = Handlebars.compile(ProjectsTemplate)
                this.$el.html(template())
                this.collection.each(function(item){
                    var view = new ProjectView({model: item})
                })
            },
        })
    }
)
