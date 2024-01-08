export const play = (id?: string) => {
	const audio = document.getElementById("audio") as HTMLAudioElement;

	if (id) {
		audio.src = `/api/play/${id}`;
		audio.currentTime = 0;
		audio.play();
	} else {
		audio.play();
	}
};

export const resume = () => {
	const audio = document.getElementById("audio") as HTMLAudioElement;

	audio.play();
};

export const pause = () => {
	const audio = document.getElementById("audio") as HTMLAudioElement;

	audio.pause();
};
