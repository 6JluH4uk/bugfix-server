define([ 
    'jquery',
    'underscore',
    'backbone',
    ],
    function ( $ , _ , Backbone) { 
        var keylist="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        function generatepass(plength){
            temp=''
            for (i=0;i<plength;i++)
                temp+=keylist.charAt(Math.floor(Math.random()*keylist.length))
                return temp
        }

        return Backbone.View.extend({
            el:$('body'),

            initialize: function(){
                this.render()
            },
            events: {
                'submit .newPass': 'render'
            },

            render: function(){
                $('.pass').val(generatepass(20))
                return false;
            },

        })
    }
)
