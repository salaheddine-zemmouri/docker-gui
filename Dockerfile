FROM node:12-slim

# WORKDIR

RUN mkdir -p /srv/www
WORKDIR /srv/www

# Environment

ENV DOCKER_UI_HOST=0.0.0.0

# DEPENDENCIES

COPY package.json package.json
RUN npm install

COPY scripts scripts
RUN npm run postinstall

# APP

COPY api               api
COPY client            client
COPY lib               lib
COPY .babelrc          .babelrc
#COPY .eslintrc         .eslintrc
COPY config.example.js config.js
COPY fuse.js           fuse.js
COPY fuse.prod.js      fuse.prod.js
COPY index.js          index.js
COPY temp              temp
RUN npm run build

CMD npm run prod
