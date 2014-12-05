#!/usr/bin/env python 
#-*- coding:utf-8 -*- 

from flask.ext.script import Manager
from flask.ext.script import Command
from flask.ext.migrate import Migrate, MigrateCommand

from apps import app, db

migrate = Migrate(app, db)
manager = Manager(app)

class ManageCelery(Command):
    capture_all_args = True

    def run(self, *args):
        from apps.tasks import celery_app
        celery_app.start(['celery'] + args[0])

class Run(Command):
    """ Запуск сервера """

    def run(self):
        app.run(host = '0.0.0.0')

manager.add_command('runserver', Run())
manager.add_command('db', MigrateCommand)
manager.add_command("celery", ManageCelery())

if __name__ == "__main__":
    manager.run()
