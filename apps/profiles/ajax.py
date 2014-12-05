#-*- coding:utf-8 -*-

import json
from bson import json_util
from flask import g, Blueprint, Response, request
from flask.ext.login import login_required, current_user

from apps import db

profiles_ajax = Blueprint('ajax', __name__)

@profiles_ajax.before_request
def before_request():
    g.user = current_user
