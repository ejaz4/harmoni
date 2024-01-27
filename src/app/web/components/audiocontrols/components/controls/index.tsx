import { Song } from "@/const/metadata";

let audioQueue: Song[] = [];
let queuePosition = 0;
let preloadedList: string[] = [];

const nonWEBMFormats = "mp3";

export const setQueue = (queue: Song[]) => {
	const ls = window.localStorage;

	audioQueue = queue;
	console.log("Queue RESET");
	fetch("/api/queue", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			authorization: ls.getItem("token") as string,
		},
		body: JSON.stringify({
			position: 0,
			songs: queue,
		}),
	});
};

export const getQueue = () => {
	return audioQueue;
};

export const setQueuePosition = (position: number) => {
	const ls = window.localStorage;

	queuePosition = position;

	fetch("/api/queue", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			authorization: ls.getItem("token") as string,
		},
		body: JSON.stringify({
			position: position,
			songs: [],
		}),
	});
};

export const getQueuePosition = () => {
	return queuePosition;
};

export const play = (id?: string) => {
	const audio = document.getElementById("audio") as HTMLAudioElement;
	var userAgent = window.navigator.userAgent;

	var audTest = document.createElement("audio"),
		canPlayWEBM =
			typeof audio.canPlayType === "function" &&
			audio.canPlayType("audio/webm;codecs=opus") !== "";

	if (id) {
		let audioSrc = `/api/play/${id}`;

		if (!canPlayWEBM) {
			// If the device can't play webm/opus, use mp3 (mainly for safari)
			audioSrc = `/api/play/${id}?format=${nonWEBMFormats}`;
		}

		audio.src = audioSrc;
		audio.currentTime = 0;
		audio.play();
	} else {
		const queue = getQueue();
		const queuePosition = getQueuePosition();

		let audioSrc = `/api/play/${queue[queuePosition].youtubeId}`;

		if (!canPlayWEBM) {
			// If the device can't play webm/opus, use mp3 (mainly for safari)
			audioSrc = `/api/play/${queue[queuePosition].youtubeId}?format=${nonWEBMFormats}`;
		}

		if (queue.length > 0) {
			audio.src = audioSrc;
			audio.currentTime = 0;
			audio.play();
			console.log(queue);
		}
	}
};

export const preloadNext = () => {
	const queue = getQueue();
	const queuePosition = getQueuePosition();
	console.log(preloadedList);

	if (queue[queuePosition + 1].youtubeId == undefined) {
		return;
	}

	if (queuePosition + 1 >= queue.length) {
		return;
	}

	if (preloadedList.includes(queue[queuePosition + 1].youtubeId as string)) {
		return;
	} else {
		preloadedList.push(queue[queuePosition + 1].youtubeId as string);
	}

	const audio = document.getElementById("audio") as HTMLAudioElement;
	var userAgent = window.navigator.userAgent;

	var audTest = document.createElement("audio"),
		canPlayWEBM =
			typeof audio.canPlayType === "function" &&
			audio.canPlayType("audio/webm;codecs=opus") !== "";

	let audioSrc = `/api/play/${
		queue[queuePosition + 1].youtubeId
	}?preload=true`;

	if (!canPlayWEBM) {
		// If the device can't play webm/opus, use mp3 (mainly for safari)
		audioSrc = `/api/play/${
			queue[queuePosition + 1].youtubeId
		}?format=${nonWEBMFormats}&preload=true`;
	}

	fetch(audioSrc).then((r: Response) => {
		console.log(r.status);
	});
};

export const resume = () => {
	const audio = document.getElementById("audio") as HTMLAudioElement;

	audio.play();
};

export const pause = () => {
	const audio = document.getElementById("audio") as HTMLAudioElement;

	audio.pause();
};

export const seekTo = (time: MediaSessionActionDetails) => {
	const audio = document.getElementById("audio") as HTMLAudioElement;
	if (time.action == "seekto") {
		audio.currentTime = time.seekTime || 0;
	}
};

export const nextTrack = () => {
	const queue = getQueue();
	const queuePosition = getQueuePosition();

	if (queuePosition + 1 < queue.length) {
		setQueuePosition(queuePosition + 1);
		play();
	} else {
		setQueuePosition(0);
		play();
	}
};

export const previousTrack = () => {
	const queue = getQueue();
	const queuePosition = getQueuePosition();

	if (queuePosition - 1 >= 0) {
		setQueuePosition(queuePosition - 1);
		play();
	} else {
		setQueuePosition(queue.length - 1);
		play();
	}
};
