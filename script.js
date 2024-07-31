let fill = 90;
let intervalId = null;
const fishbowl = document.getElementById('fishbowl');
const fish = document.getElementById('fish');
const tap = document.getElementById('tap');

// Agrega elementos de audio
const happyFishSound = new Audio('beso.mp3'); // Reemplaza 'beso.mp3' con la ruta a tu archivo de sonido
const deadFishSound = new Audio('diadesuerte.mp3'); // Reemplaza 'deadfish.mp3' con la ruta a tu archivo de sonido

const emptyingFn = () => setInterval(() => {
	fill = fill - 1;
	fishbowl.style = `--filling: ${fill}`;
	if (fill <= 0) {
		clearInterval(intervalId);
		deadFishSound.play(); // Reproduce el sonido del pez muerto
	} else if (fill < 20) {
		fish.classList.add('fishbowl__fish--dead');
		happyFishSound.pause();
		deadFishSound.play(); // Reproduce el sonido del pez muriendo
	} else if (fill < 50) {
		fish.classList.add('fishbowl__fish--dying');
	} else {
		fish.classList.remove('fishbowl__fish--dying');
		fish.classList.remove('fishbowl__fish--dead');
		deadFishSound.pause();
		happyFishSound.play(); // Reproduce el sonido del pez feliz
	}
}, 200);

intervalId = emptyingFn();

tap.addEventListener('click', () => {
	tap.classList.add('fishbowl__tap--active');
	setTimeout(() => tap.classList.remove('fishbowl__tap--active'), 4000);
	if (fill <= 0) {
		intervalId = emptyingFn();
		fish.classList.add('fishbowl__fish--floating');
	}
	fill = Math.min(fill + 20, 90);
});



