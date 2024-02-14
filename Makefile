export SHELL := /bin/bash # Required for OS X
NODE=$(shell which node 2> /dev/null)
NPM=$(shell which npm 2> /dev/null)

REMOTE="https://gitlab.com/tommyhuynh02n/cs373-group-20.git"
BRANCH=$(shell git rev-parse --abbrev-ref HEAD)
CURRENT_VERSION:=$(shell grep \"version\" package.json)
NODE_VERSION:=$(shell node -v)
NPM_VERSION:=$(shell npm -v)

help: info
	@echo
	@echo "Current version: $(CURRENT_VERSION)"
	@echo
	@echo "List of commands:"
	@echo
	@echo "  make info             - display version and git info"
	@echo "  make start            - start the server."
	@echo "  make tests            - run tests."
	@echo "  make log              - outputs git log to gitlog.txt"
	@echo "  make build            - build project artifacts."

info:
	@echo "Node: $(NODE_VERSION)"
	@echo "NPM: $(NPM_VERSION)"
	@echo 
	@git status

start:
	@npm start

build: 
	@npm run build

tests: build
	@npm run test

log: 
	@git log > gitlog.txt