// 获取音频元素
const BackgroundMusic = document.getElementById('BackgroundMusic');
const ScreamMusic = document.getElementById('ScreamMusic');

// 初始化鼠标位置
let mouseX, mouseY;
document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// 在鼠标位置显示血迹图片
function showBloodAtMousePosition() {
    const Blood = document.createElement('img');
    Blood.src = 'images/blood.png';
    Blood.style.position = 'absolute';
    Blood.style.left = `${mouseX}px`;
    Blood.style.top = `${mouseY}px`;
	const randomAngle = 100 + Math.random() * 220;
    Blood.style.width = randomAngle+'px'; // 调整图片大小
    Blood.style.height = randomAngle+'px'; // 调整图片大小
    document.body.appendChild(Blood);

    // 使用 GSAP 动画显示血迹图片
    gsap.fromTo(Blood, 
    { opacity: 0, 
      scale: 0 
    }, { duration: 1, 
         opacity: 1, 
         scale: 1, 
         ease: 'elastic.out(1, 0.3)' 
    });

    // 可选：设置一段时间后移除血迹图片
    setTimeout(() => {
        document.body.removeChild(Blood);
    }, 3000); // 3秒后移除
}

// 页面加载完成后尝试播放音频
document.addEventListener('DOMContentLoaded', function() {
    BackgroundMusic.play().catch(function(error) {
        console.error('Audio playback failed:', error);
    });

    // 监听用户交互事件
    document.addEventListener('mousemove', function() {
        BackgroundMusic.play(); 
    });
    document.addEventListener('click', function() {
		ScreamMusic.play()
        showBloodAtMousePosition();
    });
    BackgroundMusic.addEventListener('ended', function() {
        console.log('Audio playback ended.');
        ScreamMusic.play();
        showBloodAtMousePosition();
        BackgroundMusic.play(); // 这里应该是 BackgroundMusic 而不是 audio
    });
});

// 使用 GSAP 的 to 方法为 #witch 元素创建一个动画
gsap.to("#witch", {
    // 配置 scrollTrigger 插件，使动画与滚动条联动
    scrollTrigger: {
        scrub: 0.5 // 设置 scrub 值为 0.5，使动画在滚动过程中平滑过渡
    },
    x: 1500, // 沿 X 轴移动 1500 像素
    y: 500   // 沿 Y 轴移动 500 像素
});

// 使用 GSAP 的 from 方法为 #wolf 元素创建一个动画
gsap.from("#wolf", {
    // 配置 scrollTrigger 插件，使动画与滚动条联动
    scrollTrigger: {
        scrub: 0.5 // 设置 scrub 值为 0.5，使动画在滚动过程中平滑过渡
    },
    x: 400 // 从 X 轴 400 像素的位置开始，移动到初始位置
});

// 使用 GSAP 的 from 方法为 #castle 元素创建一个动画
gsap.from("#castle", {
    // 配置 scrollTrigger 插件，使动画与滚动条联动
    scrollTrigger: {
        scrub: 0.5 // 设置 scrub 值为 0.5，使动画在滚动过程中平滑过渡
    },
    x: -100 // 从 X 轴 -100 像素的位置开始，移动到初始位置
});

// 使用 GSAP 的 from 方法为 #bats 元素创建一个动画
gsap.from("#bats", {
    // 配置 scrollTrigger 插件，使动画与滚动条联动
    scrollTrigger: {
        scrub: 0.5 // 设置 scrub 值为 0.5，使动画在滚动过程中平滑过渡
    },
    scale: 1.5 // 从 1.5 倍缩放比例开始，缩小到初始大小
});

// 获取屏幕的宽度和高度
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

// 计算屏幕中心的位置
const centerX = screenWidth / 2;
const centerY = screenHeight / 2;

// 创建多个蝙蝠元素
const numBats = 30; // 蝙蝠的数量
for (let i = 0; i < numBats; i++) {
    const bat = document.createElement('img');
    bat.src = 'images/bat1.png'; // 蝙蝠图片的路径
    bat.alt = 'bat1';
	const randomAngle = 80 + Math.random() * 220;
	bat.style.width = randomAngle +'px';
	bat.style.height = randomAngle +'px';
    bat.className = 'bat1';
    document.querySelector('section').appendChild(bat);

    // 选择一个随机位置
	const randomX = Math.random() * (screenWidth + 200) - 200; // 超出页面边界
    const randomY = Math.random() * (screenHeight + 200) - 200; // 超出页面边界
    // 使用 GSAP 的 fromTo 方法创建动画
    gsap.fromTo(bat, {
        x: centerX, // 初始位置在屏幕中心
        y: centerY,
        opacity: 200 // 初始透明度为 0
    }, {
        x: randomX, // 最终位置为随机选择的一个角落
        y: randomY,
        opacity: 0, // 最终透明度为 1
        duration: 1 + Math.random() * 2, // 动画持续时间为 2 到 4 秒
        ease: "power1.inOut", // 使用 power1.inOut 缓动效果
        delay: i * 0.01 // 每个蝙蝠的延迟时间不同，以错开动画
    });
	setTimeout(() => {
        document.body.removeChild(bat);
    }, 3000); // 3秒后移除
}