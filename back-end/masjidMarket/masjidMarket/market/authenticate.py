import jwt
from django.contrib.auth.models import User
from ..settings import SECRET_KEY


def generateToken(username):

    token = jwt.encode({"username": username}, SECRET_KEY)

    return token.decode()


def authenticateToken(token):
    try:
        username = jwt.decode(token, SECRET_KEY)['username']
        
    except:
        return None

    user = User.objects.get(username=username)
    return user
