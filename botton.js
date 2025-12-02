// mode-selector.js
(function () {
    if (document.readyState !== 'loading') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }

    function init() {
        // 创建全屏选择界面
        const overlay = document.createElement('div');
        Object.assign(overlay.style, {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.95)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2147483647,
            color: 'white',
            fontFamily: 'Arial, sans-serif'
        });

        const title = document.createElement('h2');
        title.textContent = '请选择游戏模式：';
        title.style.marginBottom = '30px';
        title.style.fontSize = '24px';

        const vanillaBtn = createButton('原版游戏', '#4CAF50', false);
        const darkBtn = createButton('The DarkEmpire is ON!!!', '#f44336', true);

        overlay.appendChild(title);
        overlay.appendChild(vanillaBtn);
        overlay.appendChild(darkBtn);
        document.body.style.overflow = 'hidden';
        document.body.appendChild(overlay);

        function createButton(text, color, isDark) {
            const btn = document.createElement('button');
            btn.textContent = text;
            Object.assign(btn.style, {
                padding: '12px 24px',
                margin: '10px',
                fontSize: '18px',
                backgroundColor: color,
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
            });
            btn.onclick = () => {
                window.dlcon = isDark;

                // 👇 关键：在这里启动游戏！
                document.body.removeChild(overlay);
                document.body.style.overflow = '';

                // 调用 OpenFL 启动函数
                if (typeof lime !== 'undefined' && typeof lime.embed === 'function') {
                    // 可选：把 dlcon 作为参数传入游戏
                    lime.embed("takeover", "openfl-content", 0, 0, {
                        parameters: { dlcon: isDark ? "true" : "false" }
                    });
                } else {
                    console.error('lime 未加载！');
                }
            };
            return btn;
        }
    }
})();