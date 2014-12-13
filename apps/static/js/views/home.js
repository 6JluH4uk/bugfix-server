define([ 
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'bootstrap',
    'views/bugs',
    'collections/bugs',
    'collections/project',
    'text!templates/home.html',
    ],
    function ( $ , _ , Backbone, Handlebars, Bootstrap, BugView, BugCollection, ProjectCollection, HomeTemplate) { 
        return Backbone.View.extend({
            el: $('.content'),

            initialize: function(options){
                that = this
                this.statuses = options.statuses
                this.date = options.date
                this.projects = options.projects

                this.collection = new BugCollection()

                this.collection.fetch().done(function(){
                    that.render(that.collection.toJSON());
                })
            },
            
            events: {
                'click .status': 'filterStatus',
                'click .filterDate': 'filterDate',
                'click .project': 'filterProject',
            },

            filterStatus: function(ev){
                //Backbone.history.navigate("#bugs/status" + status_id, { trigger: true })
                var cur = $(ev.target)
                var status_id = Number(cur.attr('value'))
                if (cur.hasClass('active')) {
                    cur.removeClass('active')
                    var index = this.statuses.indexOf(status_id)
                    if (index > -1) this.statuses.splice(index, 1)
                } else {
                    cur.addClass('active')
                    var index = this.statuses.indexOf(status_id)
                    if (index == -1) this.statuses.push(status_id)
                }
                //this.renderBugs(data)
                this.getUrl()
            },

            filterDate: function(ev){
                var cur = $(ev.target)
                this.date = cur.attr('value')
                $('.filterDate').removeClass('active')
                cur.addClass('active')
                this.getUrl()
            },

            filterProject: function(ev){
                var cur = $(ev.target)
                var project = Number(cur.attr('value'))
                if (cur.hasClass('active')) {
                    cur.removeClass('active')
                    var index = this.projects.indexOf(project)
                    if (index > -1) this.projects.splice(index, 1)
                } else {
                    cur.addClass('active')
                    var index = this.projects.indexOf(project)
                    if (index == -1) this.projects.push(project)
                }
                this.getUrl()
            },

            getUrl: function(){
                var url = '#bugs'
                if (this.statuses.length > 0)
                    url += '/status' + this.statuses.join('.')
                if (this.date != 0)
                    url += '/date' + this.date
                if (this.projects.length > 0)
                    url += '/projects' + this.projects.join('.')
                Backbone.history.navigate(url)
                this.filterAll()
            },

            filterAll: function(){
                var data = this.collection
                if (this.statuses.length > 0)
                    data = data.byStatus(this.statuses)
                if (this.projects.length > 0)
                    data = data.byProject(this.projects)
                if (this.date != 0)
                    data = data.byDate(this.date)
                this.renderBugs(data)
            },

            deactivate: function() {
                this.$el.empty();
                this.stopListening();
                this.undelegateEvents();
                return this;
            },

            renderBugs: function(bugs){
                if (this.bugView)
                    this.bugView.deactivate()
                this.bugView = new BugView({collection: bugs})
            },
            changeActive: function(){
                that = this
                $('.status').each(function(el){
                    val = Number($(this).attr('value'))
                    if (that.statuses.indexOf(val) != -1)
                        $(this).addClass('active')
                })
                $('.project').each(function(el){
                    val = Number($(this).attr('value'))
                    if (that.projects.indexOf(val) != -1)
                        $(this).addClass('active')
                })
                $('.filterDate').each(function(el){
                    val = $(this).attr('value')
                    if (val == that.date)
                        $(this).addClass('active')
                })
            },

            render: function(){
                that = this
                var projects = new ProjectCollection()
                projects.fetch().done(function(){
                    var template = Handlebars.compile(HomeTemplate, {noEscape: true})
                    that.$el.html(template({'projects': projects.toJSON()}))
                    that.filterAll()
                    that.changeActive()
                })
            },
        })
    }
)
