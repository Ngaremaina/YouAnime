from fastapi import FastAPI
from pydantic import BaseModel
from model import Animations, Genres, session, Directors, Customers
from typing import Optional

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware


origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://app.netlify.com/",
    "https://you-anime.vercel.app/"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnimationSchema(BaseModel):
    title:str
    plot:str
    year:str
    cover:str
    type:str
    video_link:str

    directors_id:int
    genres_id:int

    class Config:
        orm_mode = True

class UpdateAnimationSchema(BaseModel):
    title:Optional[str] 
    plot:Optional[str] 
    year:Optional[str] 
    cover:Optional[str] 
    type:Optional[str] 
    video_link:Optional[str] 

    directors_id:Optional[int] 
    genres_id:Optional[int] 


    class Config:
        orm_mode = True
class GenreSchema(BaseModel):
    name:str
    class Config:
        orm_mode = True

class DirectorsSchema(BaseModel):
    first_name:str
    last_name:str
    email :str
    phone_number:str
    gender:str
    age:int
    class Config:
        orm_mode = True

class UpdateAnimationSchema(BaseModel):
    title:Optional[str]
    plot:Optional[str]
    year:str
    cover:str
    type:str
    video_link:str

    directors_id:int
    genres_id:int   

class CustomerSchema(BaseModel):
    first_name:str
    last_name:str
    email :str
    phone_number:str
    gender:str
    age:int
    password:str
    class Config:
        orm_mode = True


@app.get('/')
def getAnimation():
    return session.query(Animations).all()

@app.get('/{id}')
def getAnimation(id:int):
    return session.query(Animations).filter_by(id=id).first()

@app.post('/addanimations')
def addAnimation(animation:AnimationSchema):
    anime= Animations(**dict(animation))
    session.add(anime)
    session.commit()
    return {"detail":"Added successfully"}

@app.delete('/deleteanimation/{id}')
def deleteAnimation(id:int) -> None:
    anime = session.query(Animations).filter_by(id=id).first()
    session.delete(anime)
    session.commit()
    return {"detail":f"Animation with id {id} deleted successfully"}

@app.put('/putanimation/{id}')
def animationPut(id:int, payload:UpdateAnimationSchema):
    anime = session.query(Animations).filter_by(id=id).first()
    for key, value in dict(payload).items():
        setattr(anime, key, value)
    session.commit()
    return {"detail":f"Animation with id {id} updated successfully"}

@app.patch('/patchanimations/{id}')
def animationPatch(id:int, payload:UpdateAnimationSchema):
    anime = session.query(Animations).filter_by(id=id).first()
    for key, value in dict(payload).items():
        setattr(anime, key, value)
    session.commit()
    return {"detail":f"Animation with id {id} patched successfully"}

@app.get('/getgenres/${genid}')
def getGenres(genid:int):
    return session.query(Genres).filter_by(id=genid).first()

@app.get('/getgenres/')
def getGenres():
    return session.query(Genres).all()

@app.post('/addgenres')
def addGenres(genres:GenreSchema):
    genre = Genres(**dict(genres))
    session.add(genre)
    session.commit()
    return genre

@app.post('/adddirectors')
def addDirectors(directors:DirectorsSchema):
    director = Directors(**dict(directors))
    session.add(director)
    session.commit()

@app.get('/getdirectors/')
def getDirectors():
    return session.query(Directors).all()

@app.get('/getdirectors/${id}')
def getDirector(id:int):
    return session.query(Directors).filter_by(id=id).first()

@app.post('/addcustomers')
def addCustomers(customers:CustomerSchema):
    customer = Customers(**dict(customers))
    session.add(customer)
    session.commit()

@app.get('/getcustomers')
def getAllCustomers():
    return session.query(Customers).all()

@app.get('/getcustomers/{id}')
def getCustomer(id:int):
    return session.query(Customers).filter_by(id=id).first()