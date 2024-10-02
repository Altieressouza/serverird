// script.js

let scene, camera, renderer, controls;
let player, objects = [];
let keys = {};

// Inicialização da cena
function init() {
    // Cena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb); // Céu azul

    // Câmera
    camera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000
    );
    camera.position.set(0, 5, 10);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('gameContainer').appendChild(renderer.domElement);

    // Controles (para desenvolvimento)
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Luz
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    // Chão
    const groundTexture = new THREE.TextureLoader().load('assets/textures/ground.jpg');
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(25, 25);
    const groundMaterial = new THREE.MeshLambertMaterial({ map: groundTexture });
    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(500, 500),
        groundMaterial
    );
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // Jogador
    const playerGeometry = new THREE.BoxGeometry(1, 2, 1);
    const playerMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    player = new THREE.Mesh(playerGeometry, playerMaterial);
    player.position.y = 1; // Metade da altura para ficar sobre o chão
    scene.add(player);

    // Obstáculos
    const boxTexture = new THREE.TextureLoader().load('assets/textures/box.png');
    const boxMaterial = new THREE.MeshLambertMaterial({ map: boxTexture });

    for (let i = 0; i < 20; i++) {
        const box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            boxMaterial
        );
        box.position.set(
            (Math.random() - 0.5) * 50,
            0.5,
            (Math.random() - 0.5) * 50
        );
        scene.add(box);
        objects.push(box);
    }

    // Eventos de teclado
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // Redimensionamento da janela
    window.addEventListener('resize', onWindowResize, false);
}

// Manipulação de redimensionamento
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Eventos de teclado
function onKeyDown(event) {
    keys[event.code] = true;
}

function onKeyUp(event) {
    keys[event.code] = false;
}

// Movimento do jogador
function movePlayer() {
    const speed = 0.1;
    if (keys['ArrowUp'] || keys['KeyW']) {
        player.position.z -= speed;
    }
    if (keys['ArrowDown'] || keys['KeyS']) {
        player.position.z += speed;
    }
    if (keys['ArrowLeft'] || keys['KeyA']) {
        player.position.x -= speed;
    }
    if (keys['ArrowRight'] || keys['KeyD']) {
        player.position.x += speed;
    }

    // Limitar a posição do jogador
    player.position.x = Math.max(-25, Math.min(25, player.position.x));
    player.position.z = Math.max(-25, Math.min(25, player.position.z));
}

// Detectar colisões
function detectCollisions() {
    const playerBox = new THREE.Box3().setFromObject(player);

    for (let obj of objects) {
        const objBox = new THREE.Box3().setFromObject(obj);
        if (playerBox.intersectsBox(objBox)) {
            alert('Colisão Detectada! Recarregando o jogo.');
            window.location.reload();
        }
    }
}

// Loop de animação
function animate() {
    requestAnimationFrame(animate);

    controls.update();

    movePlayer();
    detectCollisions();

    renderer.render(scene, camera);
}

// Inicialização e execução
init();
animate();
