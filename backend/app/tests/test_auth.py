DIRECTOR_EMAIL = "login-test@example.com"
DIRECTOR_PASSWORD = "correct-horse-battery-staple"


def _signup_director(client):
    resp = client.post(
        "/adddirectors",
        json={
            "first_name": "Satoshi",
            "last_name": "Kon",
            "email": DIRECTOR_EMAIL,
            "phone_number": "555-0400",
            "gender": "male",
            "age": 46,
            "password": DIRECTOR_PASSWORD,
        },
    )
    assert resp.status_code == 201


def test_login_success(client):
    _signup_director(client)
    resp = client.post(
        "/auth/login", data={"username": DIRECTOR_EMAIL, "password": DIRECTOR_PASSWORD}
    )
    assert resp.status_code == 200
    body = resp.json()
    assert body["token_type"] == "bearer"
    assert body["access_token"]


def test_login_wrong_password(client):
    _signup_director(client)
    resp = client.post(
        "/auth/login", data={"username": DIRECTOR_EMAIL, "password": "wrong-password"}
    )
    assert resp.status_code == 401


def test_login_unknown_email(client):
    resp = client.post(
        "/auth/login", data={"username": "nobody@example.com", "password": "whatever"}
    )
    assert resp.status_code == 401


def test_me_requires_token(client):
    resp = client.get("/auth/me")
    assert resp.status_code == 401


def test_me_with_valid_token(client):
    _signup_director(client)
    login_resp = client.post(
        "/auth/login", data={"username": DIRECTOR_EMAIL, "password": DIRECTOR_PASSWORD}
    )
    token = login_resp.json()["access_token"]

    resp = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert resp.status_code == 200
    assert resp.json()["email"] == DIRECTOR_EMAIL
    assert "password" not in resp.json()


def test_me_with_invalid_token(client):
    resp = client.get("/auth/me", headers={"Authorization": "Bearer garbage.token.here"})
    assert resp.status_code == 401


def test_passwords_are_hashed_not_stored_plaintext(client):
    _signup_director(client)
    from model import Directors

    from main import app
    from model import get_db

    override = app.dependency_overrides[get_db]
    db = next(override())
    director = db.query(Directors).filter_by(email=DIRECTOR_EMAIL).first()
    assert director.password != DIRECTOR_PASSWORD
    assert director.password.startswith("$2b$")
