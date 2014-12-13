#-*- coding:utf-8 -*-

import json

from flask import request, Blueprint, Response, abort
from flask.ext.login import login_required
from apps import db
from .models import Project, Bug

bugs_ajax = Blueprint('bugs_ajax', __name__)

@bugs_ajax.route('/bugs/', methods=['GET'])
@login_required
def bugs():
    bugs = [bug.to_dict() for bug in Bug.query.all()]
    return Response(json.dumps(bugs))

@bugs_ajax.route('/projects/', methods=['GET'])
@login_required
def projects():
    projects = [p.to_dict() for p in Project.query.all()]
    return Response(json.dumps(projects))

@bugs_ajax.route('/project', methods=['POST'])
@login_required
def project():
    data = json.loads(request.data)
    if 'project' in data:
        project = Project(project = data.get('project'))
        db.session.add(project)
        db.session.commit()
        return Response(str(project.id))
    abort(404)

@bugs_ajax.route('/project/<project_id>', methods=['DELETE'])
@login_required
def del_project(project_id):
    project = Project.query.get(project_id)
    if project:
        [db.session.delete(bug) for bug in project.bugs]
        db.session.delete(project)
        db.session.commit()
        return Response('True')
    abort(404)
