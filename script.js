let fill = 90;
let intervalId = null;
const fishbowl = document.getElementById('fishbowl');
const fish = document.getElementById('fish');
const tap = document.getElementById('tap');
const mensaje = document.getElementById("mensaje")

// Agrega elementos de audio
const happyFishSound = new Audio('beso.mp3');
const deadFishSound = new Audio('diadesuerte.mp3');

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
		mensaje.innerHTML = "<div style='color: whitesmoke;background-color: red;font-size: 40px;'>Necesito un poco de awita que me muero!</div>"
	} else if (fill < 50) {
		fish.classList.add('fishbowl__fish--dying');
	} else {
		fish.classList.remove('fishbowl__fish--dying');
		fish.classList.remove('fishbowl__fish--dead');
		deadFishSound.pause();
		happyFishSound.play(); // Reproduce el sonido del pez feliz
		mensaje.innerHTML = "<div style='color: whitesmoke;background-color: green;font-size: 40px;'>No me dejes morir, Te quiero!</div>"
	}
}, 200);

intervalId = emptyingFn();

tap.addEventListener('click', () => {
	tap.classList.add('fishbowl__tap--active');
	setTimeout(() => tap.classList.remove('fishbowl__tap--active'), 500);
	if (fill <= 0) {
		intervalId = emptyingFn();
		fish.classList.add('fishbowl__fish--floating');
	}
	fill = Math.min(fill + 20, 90);
});

function createBubble() {
	const bubble = document.createElement('div');
	bubble.classList.add('bubble');
	fishbowl.appendChild(bubble);

	// Animación de la burbuja subiendo
	bubble.style.animation = 'bubbleAnimation 2s linear infinite';

	// Eliminar la burbuja después de un tiempo
	setTimeout(() => {
		bubble.remove();
	}, 2000);
}

// Crear burbujas aleatoriamente
setInterval(createBubble, 500);


