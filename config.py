#-*- coding:utf-8 -*- 

import os
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

if '/home/bugfix/' in BASE_DIR:
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = 'postgresql://bugfix:pyC2W9eKrZ@localhost/bugfix'
else:
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_DIR, 'data.db')

CSRF_ENABLED = True
SECRET_KEY = 'ce1caad72d4504cd29c0e664fe135d30'
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'static/tmp/')
MAX_CONTENT_LENGTH = 16 * 1024 * 1024
