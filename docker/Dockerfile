FROM alpine:3.10

RUN apk update \
    && apk upgrade \
    && apk add bash \
    && apk add nodejs=10.16.0-r0 \
    && apk add npm=10.16.0-r0 \
    && apk add subversion=1.12.0-r0 \
    && mkdir -p /var/app \
    && adduser -D -u 1000 app \
    && chmod 700 -R /var/app \
    && chown -R app /var/app

COPY ./build.tar.gz /tmp
# strips the first two folders when unzipping, getting rid of /tmp/build
RUN tar -xzvf /tmp/build.tar.gz -C /var/app --strip 2
RUN rm /tmp/build.tar.gz

USER app

CMD cd /var/app && npm start