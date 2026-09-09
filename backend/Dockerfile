FROM python:3.11-alpine

WORKDIR /app

RUN apk update && \
    apk add --no-cache g++ gcc musl-dev

COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY ./app /app

CMD ["sh", "-c", "alembic upgrade head && python seed_genres.py && uvicorn main:app --host 0.0.0.0 --port 8000"]
