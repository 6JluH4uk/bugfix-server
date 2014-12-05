#-*- coding:utf-8 -*- 

import hashlib
from apps import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    login = db.Column(db.String(255), unique = True)
    password = db.Column(db.String(255))
    is_active = db.Column(db.Boolean)

    def set_password(self, plain_pass):
        self.password = hashlib.sha1(plain_pass.encode('utf-8')).hexdigest()
        return True

    def check_password(self, plain_pass):
        if self.password == hashlib.sha1(plain_pass.encode('utf-8')).hexdigest():
            return True
        return False

    def is_authenticated(self):
        return True

    def is_active(self):
        return self.is_active

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.id

    def __repr__(self):
        return '<User: %s>' % self.login
