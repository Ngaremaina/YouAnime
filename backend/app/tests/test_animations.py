def _make_director(client):
    resp = client.post(
        "/adddirectors",
        json={
            "first_name": "Hayao",
            "last_name": "Miyazaki",
            "email": "hayao-director@example.com",
            "phone_number": "555-0100",
            "gender": "male",
            "age": 83,
            "password": "not-used-for-login",
        },
    )
    assert resp.status_code == 201
    return resp.json()["id"]


def _make_genre(client, auth_headers):
    resp = client.post("/addgenres", json={"name": "Adventure"}, headers=auth_headers)
    assert resp.status_code == 201
    return resp.json()["id"]


def _animation_payload(director_id, genre_id, **overrides):
    payload = {
        "title": "Spirited Away",
        "plot": "A girl wanders into a spirit world.",
        "year": "2001",
        "cover": "https://example.com/cover.jpg",
        "type": "movie",
        "video_link": "https://example.com/video.mp4",
        "directors_id": director_id,
        "genres_id": genre_id,
    }
    payload.update(overrides)
    return payload


def test_health(client):
    resp = client.get("/health")
    assert resp.status_code == 200
    assert resp.json() == {"status": "ok"}


def test_get_animations_empty(client):
    resp = client.get("/")
    assert resp.status_code == 200
    assert resp.json() == []


def test_add_animation_requires_auth(client):
    director_id = _make_director(client)
    resp = client.post("/addanimations", json=_animation_payload(director_id, 1))
    assert resp.status_code == 401


def test_add_and_get_animation(client, auth_headers):
    director_id = _make_director(client)
    genre_id = _make_genre(client, auth_headers)

    resp = client.post(
        "/addanimations", json=_animation_payload(director_id, genre_id), headers=auth_headers
    )
    assert resp.status_code == 201

    animations = client.get("/").json()
    assert len(animations) == 1
    assert animations[0]["title"] == "Spirited Away"

    resp = client.get(f"/{animations[0]['id']}")
    assert resp.status_code == 200
    assert resp.json()["title"] == "Spirited Away"


def test_get_animation_not_found(client):
    resp = client.get("/999")
    assert resp.status_code == 404


def test_update_animation_put(client, auth_headers):
    director_id = _make_director(client)
    genre_id = _make_genre(client, auth_headers)
    client.post(
        "/addanimations", json=_animation_payload(director_id, genre_id), headers=auth_headers
    )
    animation_id = client.get("/").json()[0]["id"]

    resp = client.put(
        f"/putanimation/{animation_id}",
        json=_animation_payload(director_id, genre_id, title="Spirited Away (Updated)"),
        headers=auth_headers,
    )
    assert resp.status_code == 200

    updated = client.get(f"/{animation_id}").json()
    assert updated["title"] == "Spirited Away (Updated)"


def test_update_animation_put_not_found(client, auth_headers):
    resp = client.put(
        "/putanimation/999", json=_animation_payload(1, 1), headers=auth_headers
    )
    assert resp.status_code == 404


def test_patch_animation_partial(client, auth_headers):
    director_id = _make_director(client)
    genre_id = _make_genre(client, auth_headers)
    client.post(
        "/addanimations", json=_animation_payload(director_id, genre_id), headers=auth_headers
    )
    animation_id = client.get("/").json()[0]["id"]

    resp = client.patch(
        f"/patchanimations/{animation_id}", json={"title": "New Title"}, headers=auth_headers
    )
    assert resp.status_code == 200

    updated = client.get(f"/{animation_id}").json()
    assert updated["title"] == "New Title"
    assert updated["plot"] == "A girl wanders into a spirit world."


def test_patch_animation_not_found(client, auth_headers):
    resp = client.patch(
        "/patchanimations/999", json={"title": "New Title"}, headers=auth_headers
    )
    assert resp.status_code == 404


def test_delete_animation(client, auth_headers):
    director_id = _make_director(client)
    genre_id = _make_genre(client, auth_headers)
    client.post(
        "/addanimations", json=_animation_payload(director_id, genre_id), headers=auth_headers
    )
    animation_id = client.get("/").json()[0]["id"]

    resp = client.delete(f"/deleteanimation/{animation_id}", headers=auth_headers)
    assert resp.status_code == 200
    assert client.get("/").json() == []


def test_delete_animation_requires_auth(client, auth_headers):
    director_id = _make_director(client)
    genre_id = _make_genre(client, auth_headers)
    client.post(
        "/addanimations", json=_animation_payload(director_id, genre_id), headers=auth_headers
    )
    animation_id = client.get("/").json()[0]["id"]

    resp = client.delete(f"/deleteanimation/{animation_id}")
    assert resp.status_code == 401


def test_delete_animation_not_found(client, auth_headers):
    resp = client.delete("/deleteanimation/999", headers=auth_headers)
    assert resp.status_code == 404


def test_add_animation_validation_error(client, auth_headers):
    resp = client.post("/addanimations", json={"title": "Missing fields"}, headers=auth_headers)
    assert resp.status_code == 422
