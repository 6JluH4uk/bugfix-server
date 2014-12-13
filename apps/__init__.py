#-*- coding:utf-8 -*- 

from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.login import LoginManager

app = Flask(__name__)
app.config.from_object('config')
db = SQLAlchemy(app)
login_manager = LoginManager()

@login_manager.user_loader
def load_user(id):
    from apps.profiles.models import User
    return User.query.get(id)

login_manager.login_view = "views.login"
login_manager.init_app(app)

from apps.profiles.models import *
from profiles.views import profiles_views
app.register_blueprint(profiles_views)

from bugs.ajax import bugs_ajax
app.register_blueprint(bugs_ajax)

from apps.bugs.models import *
