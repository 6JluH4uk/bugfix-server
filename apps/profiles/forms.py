#-*- coding:utf-8 -*- 

from flask.ext.wtf import Form
from wtforms import TextField, PasswordField
from wtforms.validators import Required, ValidationError
from .models import User

class LoginForm(Form):
    login = TextField('login', validators = [Required(u'Обязательное поле')])
    password = PasswordField('passowrd', validators = [Required(u'Обязательное поле')])

    def validate_login(self, field):
        user = User.query.filter(User.login == field.data).first()
        if not user:
            raise ValidationError(u'Такого юзера не существует')

    def validate_password(self, field):
        user = User.query.filter(User.login == self.data.get('login')).first()
        if user:
            if not user.check_password(field.data):
                raise ValidationError(u'Пароль не подходит')
