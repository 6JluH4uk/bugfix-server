#-*- coding:utf-8 -*- 

import json
from bson import json_util

from flask import request, render_template, redirect, g, url_for, Blueprint, Response, abort
from flask.ext.login import login_user, login_required, logout_user, current_user

from apps import db

from apps.profiles.forms import LoginForm
from apps.profiles.models import User
from apps.bugs.models import Project, Bug
from apps.bugs.utils import get_or_create

profiles_views = Blueprint('views', __name__)


@profiles_views.before_request
def before_request():
    g.user = current_user

@profiles_views.route('/')
@login_required
def index():
    return render_template("index.html", form = LoginForm())

@profiles_views.route('/load/', methods=["POST"])
def load():
    data = json.loads(request.data, object_hook=json_util.object_hook)
    project = Project.query.filter(Project.project == data.get('project')).first()
    if project:
        bugs = data.get('json')
        for bug in bugs:
            obj = get_or_create(db.session, Bug, name = bug['name'], project = project.id)
            obj.text = bug['text']
            obj.status = bug['status']
            obj.date = bug['date']
            obj.created_at = bug['createdate']

            db.session.commit()
        return Response(True)
    abort(404)

@profiles_views.route("/login", methods=["GET", "POST"])
def login():
    if g.user is not None and g.user.is_authenticated():
        return redirect(url_for('views.index'))

    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter(User.login == form.data.get('login')).first()
        login_user(user)
        return redirect('/')
    return render_template("login.html", form = form)

@profiles_views.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect('/')
