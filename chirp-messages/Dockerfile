FROM node:11.8 as build

WORKDIR /usr/src/app

COPY . .

RUN npm install && \
OUTPUT=$(npm pack | tail -1) && \
cp $OUTPUT build.tgz && \
ls .

FROM node:11.8-slim

EXPOSE 3000

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/build.tgz ..

RUN tar -xzf /usr/src/build.tgz --strip-components=1 && \
rm /usr/src/build.tgz

ENTRYPOINT [ "npm", "run", "run:production" ]
