def test_add_and_get_genres(client, auth_headers):
    resp = client.post("/addgenres", json={"name": "Fantasy"}, headers=auth_headers)
    assert resp.status_code == 201
    genre_id = resp.json()["id"]

    resp = client.get("/getgenres/")
    assert resp.status_code == 200
    assert len(resp.json()) == 1

    resp = client.get(f"/getgenres/{genre_id}")
    assert resp.status_code == 200
    assert resp.json()["name"] == "Fantasy"


def test_add_genre_requires_auth(client):
    resp = client.post("/addgenres", json={"name": "Fantasy"})
    assert resp.status_code == 401


def test_get_genre_not_found(client):
    resp = client.get("/getgenres/999")
    assert resp.status_code == 404


def test_add_and_get_directors(client):
    resp = client.post(
        "/adddirectors",
        json={
            "first_name": "Makoto",
            "last_name": "Shinkai",
            "email": "makoto@example.com",
            "phone_number": "555-0200",
            "gender": "male",
            "age": 51,
            "password": "kiminonawa",
        },
    )
    assert resp.status_code == 201
    assert "password" not in resp.json()

    resp = client.get("/getdirectors/")
    assert resp.status_code == 200
    assert len(resp.json()) == 1
    assert "password" not in resp.json()[0]
    director_id = resp.json()[0]["id"]

    resp = client.get(f"/getdirectors/{director_id}")
    assert resp.status_code == 200
    assert resp.json()["last_name"] == "Shinkai"
    assert "password" not in resp.json()


def test_get_director_not_found(client):
    resp = client.get("/getdirectors/999")
    assert resp.status_code == 404


def test_add_and_get_customers(client, auth_headers):
    resp = client.post(
        "/addcustomers",
        json={
            "first_name": "Jane",
            "last_name": "Doe",
            "email": "jane@example.com",
            "phone_number": "555-0300",
            "gender": "female",
            "age": 28,
            "password": "hunter22",
        },
    )
    assert resp.status_code == 201
    assert "password" not in resp.json()

    resp = client.get("/getcustomers", headers=auth_headers)
    assert resp.status_code == 200
    assert len(resp.json()) == 1
    assert "password" not in resp.json()[0]
    customer_id = resp.json()[0]["id"]

    resp = client.get(f"/getcustomers/{customer_id}", headers=auth_headers)
    assert resp.status_code == 200
    assert resp.json()["email"] == "jane@example.com"
    assert "password" not in resp.json()


def test_get_customers_requires_auth(client):
    resp = client.get("/getcustomers")
    assert resp.status_code == 401


def test_get_customer_not_found(client, auth_headers):
    resp = client.get("/getcustomers/999", headers=auth_headers)
    assert resp.status_code == 404
