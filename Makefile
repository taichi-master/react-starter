TESTS += test/**/*.test.js src/**/*.test.js server/**/*.test.js

testall:
	@./node_modules/mocha/bin/mocha \
	--ui exports \
	--slow 2000ms \
	--bail \
	$(TESTS)

clean:
	rm ./build/*
	rm ./server/libs/*

.PHONY: testall
