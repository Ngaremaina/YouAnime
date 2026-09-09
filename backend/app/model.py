from sqlalchemy import Column, Integer, String, create_engine, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship

from config import settings

Base = declarative_base()


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

    director = relationship('Directors', back_populates='animations')
    genre = relationship('Genres', back_populates='animations')

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
    password = Column(String(), nullable=False)

    animations = relationship('Animations', back_populates='director')

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

    animations = relationship('Animations', back_populates='genre')

    def __repr__(self):
        return f"{self.name}"


engine = create_engine(settings.database_url, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
