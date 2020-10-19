FROM node:13.12.0-alpine AS builder

WORKDIR /usr/src/app/frontend
COPY frontend/package.json .
COPY frontend/yarn.lock ./

RUN yarn install

COPY frontend/src ./src
COPY frontend/public ./public
COPY config/frontend/.env.prod ./.env

RUN yarn run build

###################### build Django web app #################################

FROM  python:latest

EXPOSE 8000/tcp

WORKDIR /usr/src/app/api

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY api .

RUN apt-get update

RUN apt-get -y install netcat \
    default-libmysqlclient-dev

RUN python -m pip install --upgrade pip
RUN python -m pip install -r requirements.txt

COPY config/django/.env.prod ./.env
COPY --from=builder /usr/src/app/frontend/build /usr/src/app/frontend/build

RUN chmod +x /usr/src/app/api/entrypoint.sh
CMD ["/usr/src/app/api/entrypoint.sh"]
