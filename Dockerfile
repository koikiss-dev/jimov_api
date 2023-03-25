FROM node

COPY src /anime/src/
COPY package.json /anime/


WORKDIR /anime

RUN npm i 

EXPOSE 3000

WORKDIR /anime/src/

CMD [ "ts-node", "index.ts" ]




