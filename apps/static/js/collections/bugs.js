    define([ 
    'jquery',
    'underscore',
    'backbone',
    ],
    function ( $ , _ , Backbone, ProjectModel) { 
        Bugs = Backbone.Collection.extend({
            url: '/bugs/',

            byStatus: function(statuses) {
                filtered = this.filter(function(bug) {
                    if (statuses.indexOf(Number(bug.get('status_id'))) != -1)
                        return true
                });
                return new Bugs(filtered);
            },

            byDate: function(date) {
                filtered = this.filter(function(bug) {
                    bugDate = new Date(bug.get('date'))
                    today = new Date()
                    week = new Date(today)
                    week.setDate(today.getDate() + 7);
                    month = new Date(today)
                    month.setDate(today.getDate() + 30);

                    switch(date) {
                        case "1":
                            return bugDate < today
                            break
                        case "2":
                            return bugDate <= today
                            break
                        case "3":
                            return (bugDate > today) && (bugDate <= week)
                            break
                        case "4":
                            return (bugDate > today) && (bugDate <= month)
                            break
                    }
                });
                return new Bugs(filtered);
            },

            byProject: function(projects) {
                filtered = this.filter(function(bug) {
                    if (projects.indexOf(Number(bug.get('project_id'))) != -1)
                        return true
                });
                return new Bugs(filtered);
            }
        })
        return Bugs
    }
)
