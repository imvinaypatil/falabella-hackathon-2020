FROM mhart/alpine-node:10 as builder

WORKDIR /app

COPY . /app

RUN	apk add --no-cache binutils=2.30-r2 && \
	apk add --no-cache git=2.15.4-r0 && \
	npm ci --no-audit --production && \
	strip /usr/bin/node

FROM alpine:3.7

COPY --from=builder /usr/bin/node /usr/bin/
COPY --from=builder /usr/lib/libgcc* /usr/lib/libstdc* /usr/lib/
COPY --from=builder /app /app

WORKDIR /app

RUN apk add --no-cache tini=0.16.1-r0 curl=7.61.1-r3

ENV PORT=4444 \
	NODE_ENV=production \
	LOG_LEVEL=error \
	MAX_EVENT_LOOP_DELAY=1000 \
	MAX_RSS_BYTES=0 \
	MAX_HEAP_USED_BYTES=0 \
	MAX_AGE=86400 \
	MONGODB_CONNECTION="" \
	MONGODB_DATABASE="hackthon

EXPOSE $PORT

# an init entrypoint that simplifies signal handling
ENTRYPOINT ["tini", "--"]

CMD ["node", "src/index.js"]
