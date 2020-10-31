build:
	docker-compose build

start: build
	docker-compose down && \
	docker-compose up