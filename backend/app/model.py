from sqlalchemy import Column, Integer, String, Table, create_engine, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship


Base = declarative_base()

animation_user = Table(
    'animation_user',
    Base.metadata,
    Column('animation_id',Integer, ForeignKey('animations.id'), primary_key=True),
    Column('directors_id',Integer, ForeignKey('directors.id'), primary_key=True),
    Column('genres_id',Integer, ForeignKey('genres.id'), primary_key=True),
    extend_existing=True,

)

class Animations(Base):
    __tablename__ = 'animations'
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(), nullable=False)
    plot = Column(String(), nullable=False)
    year = Column(String(), nullable=False)
    cover = Column(String(), nullable=False)
    type = Column(String(), nullable=False)
    video_link = Column(String(), nullable=False)
    directors_id = Column(Integer, ForeignKey('directors.id'))
    genres_id = Column(Integer, ForeignKey('genres.id'))

    directors = relationship('Directors', secondary=animation_user, back_populates='animations')
    genres = relationship('Genres', secondary=animation_user, back_populates='animations')

    def __repr__(self):
        return f"{self.id}, {self.title}" 

class Directors(Base):
    __tablename__ = 'directors'
    id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String(), nullable=False)
    last_name = Column(String(), nullable=False)
    email = Column(String(), nullable=False)
    phone_number = Column(String(), nullable=False)
    gender = Column(String(), nullable=False)
    age = Column(Integer, nullable=False)

    animations = relationship('Animations', secondary=animation_user, back_populates='directors')

    def __repr__(self):
        return f"{self.id}, {self.first_name, self.last_name}"

class Customers(Base):
    __tablename__ = 'customers'
    id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String(), nullable=False)
    last_name = Column(String(), nullable=False)
    email = Column(String(), nullable=False)
    phone_number = Column(String(), nullable=False)
    gender = Column(String(), nullable=False)
    age = Column(Integer, nullable=False)
    password = Column(String(), nullable=False)

    
class Genres(Base):
    __tablename__ = 'genres'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(), nullable=False)

    animations = relationship('Animations', secondary=animation_user, back_populates='genres')

    def __repr__(self):
        return f"{self.name}"
    

engine = create_engine('sqlite:///main.db', connect_args={"check_same_thread":False})
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()

