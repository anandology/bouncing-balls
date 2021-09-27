TARGETS=game.js

.PHONY: default
default: $(TARGETS)

game.js: game.py
	python build.py > game.js

clean:
	-rm $(TARGETS)