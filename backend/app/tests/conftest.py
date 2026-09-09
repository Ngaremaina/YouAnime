import os
import sys

os.environ.setdefault("DATABASE_URL", "sqlite:///:memory:")
os.environ.setdefault("JWT_SECRET", "test-secret")

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

import pytest
from sqlalchemy import create_engine, event
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from main import app
from model import Base, get_db

test_engine = create_engine(
    "sqlite:///:memory:",
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)


@event.listens_for(test_engine, "connect")
def _enable_fk(dbapi_connection, _):
    dbapi_connection.execute("PRAGMA foreign_keys=ON")


TestSessionLocal = sessionmaker(bind=test_engine, autoflush=False, autocommit=False)


@pytest.fixture(autouse=True)
def _reset_db():
    Base.metadata.create_all(test_engine)
    yield
    Base.metadata.drop_all(test_engine)


def _override_get_db():
    db = TestSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = _override_get_db


@pytest.fixture
def client():
    from fastapi.testclient import TestClient

    with TestClient(app) as c:
        yield c


DIRECTOR_EMAIL = "hayao@example.com"
DIRECTOR_PASSWORD = "ghibli-secret"


@pytest.fixture
def auth_headers(client):
    client.post(
        "/adddirectors",
        json={
            "first_name": "Hayao",
            "last_name": "Miyazaki",
            "email": DIRECTOR_EMAIL,
            "phone_number": "555-0100",
            "gender": "male",
            "age": 83,
            "password": DIRECTOR_PASSWORD,
        },
    )
    resp = client.post(
        "/auth/login",
        data={"username": DIRECTOR_EMAIL, "password": DIRECTOR_PASSWORD},
    )
    token = resp.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}
