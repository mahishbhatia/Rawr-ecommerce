"""Shared framework extensions, kept separate to avoid circular imports."""
from celery import Celery
from flask_caching import Cache
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
cache = Cache()
celery = Celery(__name__)
