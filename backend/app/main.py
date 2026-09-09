from typing import Optional

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel, ConfigDict, Field
from sqlalchemy.orm import Session

from auth import (
    authenticate_director,
    create_access_token,
    get_current_director,
    hash_password,
)
from config import settings
from model import Animations, Customers, Directors, Genres, get_db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AnimationSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    title: str
    plot: str
    year: str
    cover: str
    type: str
    video_link: str
    directors_id: int
    genres_id: int


class UpdateAnimationSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    title: Optional[str] = None
    plot: Optional[str] = None
    year: Optional[str] = None
    cover: Optional[str] = None
    type: Optional[str] = None
    video_link: Optional[str] = None
    directors_id: Optional[int] = None
    genres_id: Optional[int] = None


class GenreSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    name: str


class DirectorsSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    first_name: str
    last_name: str
    email: str
    phone_number: str
    gender: str
    age: int
    password: str = Field(min_length=8, max_length=72)


class DirectorPublicSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    first_name: str
    last_name: str
    email: str
    phone_number: str
    gender: str
    age: int


class CustomerSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    first_name: str
    last_name: str
    email: str
    phone_number: str
    gender: str
    age: int
    password: str = Field(min_length=8, max_length=72)


class CustomerPublicSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    first_name: str
    last_name: str
    email: str
    phone_number: str
    gender: str
    age: int


class TokenSchema(BaseModel):
    access_token: str
    token_type: str = "bearer"


@app.get('/health')
def health():
    return {"status": "ok"}


@app.post('/auth/login', response_model=TokenSchema)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    director = authenticate_director(db, form_data.username, form_data.password)
    if director is None:
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    return TokenSchema(access_token=create_access_token(director.email))


@app.get('/auth/me', response_model=DirectorPublicSchema)
def get_me(current_director: Directors = Depends(get_current_director)):
    return current_director


@app.get('/')
def get_animations(db: Session = Depends(get_db)):
    return db.query(Animations).all()


@app.post('/addanimations', status_code=201)
def add_animation(
    animation: AnimationSchema,
    db: Session = Depends(get_db),
    current_director: Directors = Depends(get_current_director),
):
    anime = Animations(**animation.model_dump())
    db.add(anime)
    db.commit()
    return {"detail": "Added successfully"}


@app.delete('/deleteanimation/{id}')
def delete_animation(
    id: int,
    db: Session = Depends(get_db),
    current_director: Directors = Depends(get_current_director),
):
    anime = db.query(Animations).filter_by(id=id).first()
    if anime is None:
        raise HTTPException(status_code=404, detail=f"Animation with id {id} not found")
    db.delete(anime)
    db.commit()
    return {"detail": f"Animation with id {id} deleted successfully"}


@app.put('/putanimation/{id}')
def update_animation_put(
    id: int,
    payload: AnimationSchema,
    db: Session = Depends(get_db),
    current_director: Directors = Depends(get_current_director),
):
    anime = db.query(Animations).filter_by(id=id).first()
    if anime is None:
        raise HTTPException(status_code=404, detail=f"Animation with id {id} not found")
    for key, value in payload.model_dump().items():
        setattr(anime, key, value)
    db.commit()
    return {"detail": f"Animation with id {id} updated successfully"}


@app.patch('/patchanimations/{id}')
def update_animation_patch(
    id: int,
    payload: UpdateAnimationSchema,
    db: Session = Depends(get_db),
    current_director: Directors = Depends(get_current_director),
):
    anime = db.query(Animations).filter_by(id=id).first()
    if anime is None:
        raise HTTPException(status_code=404, detail=f"Animation with id {id} not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(anime, key, value)
    db.commit()
    return {"detail": f"Animation with id {id} patched successfully"}


@app.get('/getgenres/')
def get_genres(db: Session = Depends(get_db)):
    return db.query(Genres).all()


@app.get('/getgenres/{genre_id}')
def get_genre(genre_id: int, db: Session = Depends(get_db)):
    genre = db.query(Genres).filter_by(id=genre_id).first()
    if genre is None:
        raise HTTPException(status_code=404, detail=f"Genre with id {genre_id} not found")
    return genre


@app.post('/addgenres', status_code=201)
def add_genre(
    genre: GenreSchema,
    db: Session = Depends(get_db),
    current_director: Directors = Depends(get_current_director),
):
    new_genre = Genres(**genre.model_dump())
    db.add(new_genre)
    db.commit()
    db.refresh(new_genre)
    return new_genre


@app.post('/adddirectors', status_code=201, response_model=DirectorPublicSchema)
def add_director(director: DirectorsSchema, db: Session = Depends(get_db)):
    data = director.model_dump()
    data["password"] = hash_password(data["password"])
    new_director = Directors(**data)
    db.add(new_director)
    db.commit()
    db.refresh(new_director)
    return new_director


@app.get('/getdirectors/', response_model=list[DirectorPublicSchema])
def get_directors(db: Session = Depends(get_db)):
    return db.query(Directors).all()


@app.get('/getdirectors/{id}', response_model=DirectorPublicSchema)
def get_director(id: int, db: Session = Depends(get_db)):
    director = db.query(Directors).filter_by(id=id).first()
    if director is None:
        raise HTTPException(status_code=404, detail=f"Director with id {id} not found")
    return director


@app.post('/addcustomers', status_code=201, response_model=CustomerPublicSchema)
def add_customer(customer: CustomerSchema, db: Session = Depends(get_db)):
    data = customer.model_dump()
    data["password"] = hash_password(data["password"])
    new_customer = Customers(**data)
    db.add(new_customer)
    db.commit()
    db.refresh(new_customer)
    return new_customer


@app.get('/getcustomers', response_model=list[CustomerPublicSchema])
def get_customers(
    db: Session = Depends(get_db),
    current_director: Directors = Depends(get_current_director),
):
    return db.query(Customers).all()


@app.get('/getcustomers/{id}', response_model=CustomerPublicSchema)
def get_customer(
    id: int,
    db: Session = Depends(get_db),
    current_director: Directors = Depends(get_current_director),
):
    customer = db.query(Customers).filter_by(id=id).first()
    if customer is None:
        raise HTTPException(status_code=404, detail=f"Customer with id {id} not found")
    return customer


# Registered last: a bare "/{id}" would otherwise shadow every other
# single-segment route below it that isn't a plain integer (e.g. /getcustomers).
@app.get('/{id}')
def get_animation(id: int, db: Session = Depends(get_db)):
    animation = db.query(Animations).filter_by(id=id).first()
    if animation is None:
        raise HTTPException(status_code=404, detail=f"Animation with id {id} not found")
    return animation
