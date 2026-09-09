"""Seed the genres table with a default set of anime genres.

Idempotent: only inserts genres that aren't already present (matched by
name, case-insensitively). Safe to run on every container start.
"""

from model import Genres, SessionLocal

DEFAULT_GENRES = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mecha",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Slice of Life",
    "Sports",
    "Supernatural",
    "Thriller",
]


def seed_genres() -> None:
    db = SessionLocal()
    try:
        existing = {name.lower() for (name,) in db.query(Genres.name).all()}
        new_genres = [
            Genres(name=name)
            for name in DEFAULT_GENRES
            if name.lower() not in existing
        ]
        if not new_genres:
            print("Genres already seeded, nothing to do.")
            return
        db.add_all(new_genres)
        db.commit()
        print(f"Added {len(new_genres)} genre(s): {', '.join(g.name for g in new_genres)}")
    finally:
        db.close()


if __name__ == "__main__":
    seed_genres()
