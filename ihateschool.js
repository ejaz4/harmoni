let iteration = 0;

const main = async () => {
	iteration++;
	console.log("iteration: " + iteration);
	await fetch("http://captive.apple.com/");
};

setInterval(main, 100);
