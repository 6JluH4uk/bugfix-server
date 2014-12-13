#-*- coding:utf-8 -*- 

from apps import db

class Project(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    project = db.Column(db.String(255))
    bugs = db.relationship(lambda: Bug, backref = 'bugs', lazy='dynamic')

    def __repr__(self):
        return '<Project: %r>' % self.project

    def to_dict(self):
        return {'id': self.id, 'project': self.project}


STATUS_CHOICES = {u'0': u'Поставлена',
                  u'1': u'На проверке',
                  u'2': u'Отменена',
                  u'3': u'Выполнена',
                  u'4': u'Удалена', }

CLASS_CHOICES = {u'0': u'label-warning',
                 u'1': u'label-info',
                 u'2': u'label-primary',
                 u'3': u'label-success',
                 u'4': u'label-danger', }

class Bug(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(1023))
    text = db.Column(db.Text)
    status = db.Column(db.String(255))
    date = db.Column(db.Date)
    created_at = db.Column(db.Date)
    project = db.Column(db.Integer, db.ForeignKey('project.id'), nullable = True)

    def get_status(self):
        return STATUS_CHOICES[self.status]

    def get_css_class(self):
        return CLASS_CHOICES[self.status]

    def __repr__(self):
        return '<Bug: %r>' % self.name

    def to_dict(self):
        dt = {'id': self.id,
               'name': self.name,
               'text': self.text,
               'status': self.get_status(),
               'class': self.get_css_class(),
               'date': str(self.date),
               'created_at': str(self.created_at),
               'status_id': self.status,
               }
        project = Project.query.get(self.project)
        if project:
            dt['project_id'] = project.id
            dt['project'] = project.project
        return dt
