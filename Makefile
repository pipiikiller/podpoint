# Pod Point Local Environment Setup Scripts

# HELP
# This will output the help for each task
.PHONY: help

help: ## This help.
	@sh docs/.motd
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

# TASKS
start: ## Start the environment.
	$(shell [ ! -d 'reference' ] && git clone -q git@github.com:Pod-Point/tech-test-api-specs.git reference)
	docker-compose up -d
	@echo ""
	@echo "√ Environment Ready"
	@echo ""
	@echo "You can now run \`make build\` if it's the first time you're starting the environment."
build: ## Install dependencies and prepare API.
	docker-compose run api npm install
	docker-compose up -d
	@echo ""
	@echo ""
	@echo "√ API Built"
	@echo ""
	@echo "- API: http://localhost:8000/api"
stop: ## Stop/pause the environment.
	docker-compose stop
refresh: ## Refresh the environment without losing images nor volumes.
	docker-compose down
	docker-compose up -d --build
destroy: ## Destroy and clean the environment.
	docker-compose down --rmi all --volumes --remove-orphans
