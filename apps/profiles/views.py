#-*- coding:utf-8 -*- 

from flask import render_template, redirect, g, url_for, Blueprint
from flask.ext.login import login_user, login_required, logout_user, current_user
from apps.profiles.forms import LoginForm
from apps.profiles.models import User

profiles_views = Blueprint('views', __name__)


@profiles_views.before_request
def before_request():
    g.user = current_user

@profiles_views.route('/')
@login_required
def index():
    return render_template("index.html", form = LoginForm())

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
