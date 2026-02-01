(function () {
    'use strict';

    const state = {
        theme: 'light',
        visitorCount: parseInt(localStorage.getItem('visitor-count') || '0'),
        reactionBest: parseInt(localStorage.getItem('reaction-best') || '9999'),
        snakeHighScore: parseInt(localStorage.getItem('snake-highscore') || '0'),
        tttStats: JSON.parse(localStorage.getItem('ttt-stats') || '{"wins":0,"losses":0,"draws":0}'),
        memoryBestMoves: parseInt(localStorage.getItem('memory-best') || '999')
    };

    // === THEME SYSTEM ===
    window.setTheme = function (theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const status = document.getElementById('theme-status');
        if (status) {
            const names = {
                win95: 'Win95 Classic',
                terminal: 'Cyber-Terminal',
                vaporwave: 'Vaporwave Neon',
                dark: 'Stealth Dark'
            };
            status.textContent = 'Theme: ' + (names[theme] || theme);
        }
        localStorage.setItem('retro-vault-theme', theme);

        // Handle stealth dark mode legacy variables
        if (theme === 'dark') {
            document.documentElement.style.setProperty('--bg-primary', '#2d2d2d');
            document.documentElement.style.setProperty('--bg-secondary', '#1a1a1a');
            document.documentElement.style.setProperty('--text-primary', '#ffffff');
        } else {
            // Reset to defaults so data-theme can take over
            document.documentElement.style.removeProperty('--bg-primary');
            document.documentElement.style.removeProperty('--bg-secondary');
            document.documentElement.style.removeProperty('--text-primary');
        }
    };

    // Load saved theme
    (function () {
        const savedTheme = localStorage.getItem('retro-vault-theme') || 'win95';
        window.setTheme(savedTheme);
        const selector = document.getElementById('theme-select');
        if (selector) selector.value = savedTheme;
    })();

    // === NAVIGATION ===
    window.showHub = function () {
        cleanupCurrentApp();
        document.getElementById('hub-view').style.display = 'block';
        document.querySelectorAll('.app-view').forEach(el => el.classList.remove('active'));
        document.querySelector('.back-btn').style.display = 'none';
    };

    window.showApp = function (appName) {
        cleanupCurrentApp();

        const overlay = document.getElementById('loading-overlay');
        const fill = document.getElementById('loading-bar-fill');
        const text = document.getElementById('loading-text');

        if (overlay && fill && text) {
            overlay.style.display = 'flex';
            fill.style.width = '0%';
            text.textContent = `Loading ${appName.toUpperCase()}...`;

            let progress = 0;
            const interval = setInterval(() => {
                const jump = Math.random() > 0.8 ? 0 : Math.random() * 15;
                progress += jump;

                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    setTimeout(() => {
                        overlay.style.display = 'none';
                        actuallyShowApp(appName);
                    }, 400);
                }
                fill.style.width = progress + '%';

                if (progress > 40 && progress < 45) text.textContent = "Checking system resources...";
                if (progress > 80 && progress < 85) text.textContent = "Finalizing vintage vibes...";
            }, 100);
        } else {
            actuallyShowApp(appName);
        }
    };

    function actuallyShowApp(appName) {
        document.getElementById('hub-view').style.display = 'none';
        const apps = document.querySelectorAll('.app-view');
        apps.forEach(app => app.classList.remove('active'));

        const targetApp = document.getElementById('app-' + appName);
        if (targetApp) targetApp.classList.add('active');
        document.querySelector('.back-btn').style.display = 'block';

        if (appName === 'tictactoe') initTicTacToe();
        if (appName === 'memory') initMemoryGame();
        if (appName === 'snake') initSnakeGame();
        if (appName === 'typer') initTyperGame();
        if (appName === 'reaction') window.resetReactionGame();
        if (appName === 'guestbook') initGuestbook();
        if (appName === 'explorer') initExplorer();
        if (appName === 'soundboard') initSoundboard();
    }

    window.revealDevLog = function () {
        window.showApp('devlog');
    };

    function cleanupCurrentApp() {
        if (window.countdownInterval) {
            clearInterval(window.countdownInterval);
            window.countdownInterval = null;
            window.isCountdownRunning = false;
        }
        if (window.reactionTimeout) {
            clearTimeout(window.reactionTimeout);
            window.reactionTimeout = null;
        }
    }

    function updateVisitorCount() {
        state.visitorCount++;
        localStorage.setItem('visitor-count', state.visitorCount);
        const countEl = document.getElementById('visitor-count');
        if (countEl) countEl.textContent = state.visitorCount.toString().padStart(6, '0');
    }
    updateVisitorCount();

    const colorMessages = ["Awesome!", "Retro!", "Groovy!", "Radical!", "Tubular!", "Excellent!", "Far out!", "Cool!", "Nice!", "Dude!"];

    window.changeColor = function () {
        const hue = Math.floor(Math.random() * 360);
        const color = `hsl(${hue}, 70%, 50%)`;
        const hex = hslToHex(hue, 70, 50);
        const display = document.getElementById('color-display');
        if (display) {
            display.style.backgroundColor = color;
            display.style.color = hue > 180 && hue < 300 ? '#fff' : '#000';
            display.textContent = hex;
        }
        const code = document.getElementById('color-code');
        if (code) code.textContent = hex + ` | HSL(${hue}, 70%, 50%)`;
        const msg = document.getElementById('color-message');
        if (msg) msg.textContent = colorMessages[Math.floor(Math.random() * colorMessages.length)];
    };

    function hslToHex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
    }

    window.showToast = function (type) {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = 'toast ' + type;
        const messages = {
            success: '✓ Operation completed!',
            error: '✗ Something went wrong!',
            info: 'ℹ Information message',
            warning: '⚠ Warning!'
        };
        toast.textContent = messages[type];
        container.insertBefore(toast, container.firstChild);
        setTimeout(() => toast.remove(), 3000);
    };

    window.countdownInterval = null;
    window.countdownSeconds = 10;
    window.isCountdownRunning = false;

    window.toggleCountdown = function () {
        const btn = document.getElementById('countdown-start-btn');
        if (window.isCountdownRunning) {
            clearInterval(window.countdownInterval);
            window.isCountdownRunning = false;
            if (btn) btn.textContent = 'Resume';
        } else {
            if (window.countdownSeconds <= 0) {
                const input = document.getElementById('countdown-input');
                window.countdownSeconds = input ? parseInt(input.value) || 10 : 10;
            }
            window.isCountdownRunning = true;
            if (btn) btn.textContent = 'Pause';
            window.countdownInterval = setInterval(() => {
                const display = document.getElementById('countdown-display');
                if (window.countdownSeconds <= 0) {
                    clearInterval(window.countdownInterval);
                    window.isCountdownRunning = false;
                    if (display) display.textContent = '00:00';
                    if (btn) btn.textContent = 'Start';
                    window.showToast('success');
                    return;
                }
                window.countdownSeconds--;
                if (display) display.textContent = '00:' + window.countdownSeconds.toString().padStart(2, '0');
            }, 1000);
        }
    };

    window.resetCountdown = function () {
        clearInterval(window.countdownInterval);
        window.isCountdownRunning = false;
        const input = document.getElementById('countdown-input');
        window.countdownSeconds = input ? parseInt(input.value) || 10 : 10;
        const display = document.getElementById('countdown-display');
        if (display) display.textContent = '00:' + window.countdownSeconds.toString().padStart(2, '0');
        const btn = document.getElementById('countdown-start-btn');
        if (btn) btn.textContent = 'Start';
    };

    window.toggleTheme = function (isDark) {
        document.documentElement.style.setProperty('--bg-primary', isDark ? '#2d2d2d' : '#c0c0c0');
        document.documentElement.style.setProperty('--bg-secondary', isDark ? '#1a1a1a' : '#ffffff');
        document.documentElement.style.setProperty('--text-primary', isDark ? '#ffffff' : '#000000');
        const status = document.getElementById('theme-status');
        if (status) status.textContent = isDark ? 'Dark Mode' : 'Light Mode';
        localStorage.setItem('retrohub-theme', isDark ? 'dark' : 'light');
    };

    (function () {
        const savedTheme = localStorage.getItem('retrohub-theme');
        if (savedTheme === 'dark') {
            const toggle = document.querySelector('.toggle-switch input');
            if (toggle) {
                toggle.checked = true;
                window.toggleTheme(true);
            }
        }
    })();

    let calcExpression = '';
    window.calcInput = function (value) {
        if (calcExpression === 'Error') calcExpression = '';
        calcExpression += value;
        const display = document.getElementById('calc-display');
        if (display) display.textContent = calcExpression;
    };

    window.calcClear = function () {
        calcExpression = '';
        const display = document.getElementById('calc-display');
        if (display) display.textContent = '0';
    };

    window.calcEquals = function () {
        const display = document.getElementById('calc-display');
        try {
            const sanitized = calcExpression.replace(/[^0-9+\-*/().\s]/g, '');
            if (sanitized !== calcExpression) {
                if (display) display.textContent = 'Error';
                calcExpression = '';
                return;
            }
            const result = new Function('return ' + sanitized)();
            calcExpression = result.toString();
            if (display) display.textContent = calcExpression;
        } catch {
            if (display) display.textContent = 'Error';
            calcExpression = '';
        }
    };

    document.addEventListener('keydown', (e) => {
        const calculatorView = document.getElementById('app-calculator');
        if (!calculatorView || !calculatorView.classList.contains('active')) return;

        const key = e.key;
        if (/^[0-9+\-*/.]$/.test(key)) {
            e.preventDefault();
            window.calcInput(key);
        } else if (key === 'Enter') {
            e.preventDefault();
            window.calcEquals();
        } else if (key === 'Escape' || key === 'c' || key === 'C') {
            e.preventDefault();
            window.calcClear();
        } else if (key === 'Backspace') {
            e.preventDefault();
            if (calcExpression.length > 0) {
                calcExpression = calcExpression.slice(0, -1);
                const display = document.getElementById('calc-display');
                if (display) display.textContent = calcExpression || '0';
            }
        }
    });

    let tttBoard = ['', '', '', '', '', '', '', '', ''];
    let tttGameActive = true;
    let tttCurrentPlayer = 'X';

    function initTicTacToe() {
        tttBoard = ['', '', '', '', '', '', '', '', ''];
        tttGameActive = true;
        tttCurrentPlayer = 'X';
        renderTicTacToe();
        const status = document.getElementById('ttt-status');
        if (status) status.textContent = 'Your turn (X)';
        const wins = document.getElementById('ttt-wins');
        if (wins) wins.textContent = state.tttStats.wins;
        const losses = document.getElementById('ttt-losses');
        if (losses) losses.textContent = state.tttStats.losses;
        const draws = document.getElementById('ttt-draws');
        if (draws) draws.textContent = state.tttStats.draws;
    }

    function renderTicTacToe() {
        const board = document.getElementById('ttt-board');
        if (!board) return;
        board.innerHTML = '';
        tttBoard.forEach((cell, index) => {
            const div = document.createElement('div');
            div.className = 'ttt-cell ' + cell.toLowerCase();
            div.textContent = cell;
            div.onclick = () => handleTicTacToeClick(index);
            board.appendChild(div);
        });
    }

    function handleTicTacToeClick(index) {
        if (tttBoard[index] || !tttGameActive || tttCurrentPlayer !== 'X') return;
        tttBoard[index] = 'X';
        renderTicTacToe();
        if (checkTicTacToeWin('X')) {
            const status = document.getElementById('ttt-status');
            if (status) status.textContent = 'You win! 🎉';
            tttGameActive = false;
            state.tttStats.wins++;
            localStorage.setItem('ttt-stats', JSON.stringify(state.tttStats));
            const wins = document.getElementById('ttt-wins');
            if (wins) wins.textContent = state.tttStats.wins;
            return;
        }
        if (!tttBoard.includes('')) {
            const status = document.getElementById('ttt-status');
            if (status) status.textContent = "It's a draw!";
            tttGameActive = false;
            state.tttStats.draws++;
            localStorage.setItem('ttt-stats', JSON.stringify(state.tttStats));
            const draws = document.getElementById('ttt-draws');
            if (draws) draws.textContent = state.tttStats.draws;
            return;
        }
        tttCurrentPlayer = 'O';
        const status = document.getElementById('ttt-status');
        if (status) status.textContent = 'Computer thinking...';
        setTimeout(computerTicTacToeMove, 500);
    }

    function computerTicTacToeMove() {
        let move = findBestTicTacToeMove('O') ?? findBestTicTacToeMove('X') ?? tttBoard.findIndex(c => c === '');
        if (move !== -1) {
            tttBoard[move] = 'O';
            renderTicTacToe();
            if (checkTicTacToeWin('O')) {
                const status = document.getElementById('ttt-status');
                if (status) status.textContent = 'Computer wins! 🤖';
                tttGameActive = false;
                state.tttStats.losses++;
                localStorage.setItem('ttt-stats', JSON.stringify(state.tttStats));
                const losses = document.getElementById('ttt-losses');
                if (losses) losses.textContent = state.tttStats.losses;
                return;
            }
            if (!tttBoard.includes('')) {
                const status = document.getElementById('ttt-status');
                if (status) status.textContent = "It's a draw!";
                tttGameActive = false;
                state.tttStats.draws++;
                localStorage.setItem('ttt-stats', JSON.stringify(state.tttStats));
                const draws = document.getElementById('ttt-draws');
                if (draws) draws.textContent = state.tttStats.draws;
                return;
            }
        }
        tttCurrentPlayer = 'X';
        const status = document.getElementById('ttt-status');
        if (status) status.textContent = 'Your turn (X)';
    }

    function findBestTicTacToeMove(player) {
        const wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        for (const [a, b, c] of wins) {
            if (tttBoard[a] === player && tttBoard[b] === player && !tttBoard[c]) return c;
            if (tttBoard[a] === player && tttBoard[c] === player && !tttBoard[b]) return b;
            if (tttBoard[b] === player && tttBoard[c] === player && !tttBoard[a]) return a;
        }
        return null;
    }

    function checkTicTacToeWin(player) {
        const wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        return wins.some(([a, b, c]) => tttBoard[a] === player && tttBoard[b] === player && tttBoard[c] === player);
    }

    const memoryEmojis = ['🍕', '🎮', '🚀', '🌈', '🎵', '💎', '🔥', '⭐'];
    let memoryCards = [];
    let memoryFlipped = [];
    let memoryMatched = 0;
    let memoryMoves = 0;
    let memoryCanFlip = true;

    function initMemoryGame() {
        const cards = [...memoryEmojis, ...memoryEmojis].map(emoji => ({ emoji, matched: false }));
        memoryCards = cards.sort(() => Math.random() - 0.5);
        memoryFlipped = [];
        memoryMatched = 0;
        memoryMoves = 0;
        memoryCanFlip = true;
        renderMemoryGame();
        updateMemoryStats();
        const best = document.getElementById('memory-best');
        if (best) best.textContent = state.memoryBestMoves < 999 ? state.memoryBestMoves : '-';
    }

    function renderMemoryGame() {
        const grid = document.getElementById('memory-grid');
        if (!grid) return;
        grid.innerHTML = '';
        memoryCards.forEach((card, index) => {
            const div = document.createElement('div');
            div.className = 'memory-card';
            if (memoryFlipped.includes(index) || card.matched) {
                div.textContent = card.emoji;
                div.classList.add('flipped');
            }
            if (card.matched) div.classList.add('matched');
            div.onclick = () => handleMemoryClick(index);
            grid.appendChild(div);
        });
    }

    function handleMemoryClick(index) {
        if (!memoryCanFlip || memoryFlipped.includes(index) || memoryCards[index].matched) return;
        memoryFlipped.push(index);
        renderMemoryGame();
        if (memoryFlipped.length === 2) {
            memoryMoves++;
            updateMemoryStats();
            memoryCanFlip = false;
            const [first, second] = memoryFlipped;
            if (memoryCards[first].emoji === memoryCards[second].emoji) {
                memoryCards[first].matched = true;
                memoryCards[second].matched = true;
                memoryMatched++;
                memoryFlipped = [];
                memoryCanFlip = true;
                if (memoryMatched === 8) {
                    if (memoryMoves < state.memoryBestMoves) {
                        state.memoryBestMoves = memoryMoves;
                        localStorage.setItem('memory-best', memoryMoves);
                        const best = document.getElementById('memory-best');
                        if (best) best.textContent = memoryMoves;
                    }
                    window.showToast('success');
                }
            } else {
                setTimeout(() => {
                    memoryFlipped = [];
                    memoryCanFlip = true;
                    renderMemoryGame();
                }, 1000);
            }
        }
    }

    function updateMemoryStats() {
        const moves = document.getElementById('memory-moves');
        if (moves) moves.textContent = memoryMoves;
        const pairs = document.getElementById('memory-pairs');
        if (pairs) pairs.textContent = memoryMatched;
    }

    let snakeCanvas, snakeCtx;
    let snake = [{ x: 5, y: 5 }];
    let snakeDirection = { x: 1, y: 0 };
    let snakeFood = { x: 10, y: 10 };
    let snakeScore = 0;
    let snakeGameLoop = null;
    let snakeLastTime = 0;
    const snakeUpdateInterval = 150;

    function initSnakeGame() {
        snakeCanvas = document.getElementById('snake-canvas');
        if (!snakeCanvas) return;
        snakeCtx = snakeCanvas.getContext('2d');
        snake = [{ x: 5, y: 5 }];
        snakeDirection = { x: 1, y: 0 };
        snakeScore = 0;
        snakeLastTime = performance.now();
        const score = document.getElementById('snake-score');
        if (score) score.textContent = '0';
        const best = document.getElementById('snake-best');
        if (best) best.textContent = state.snakeHighScore;
        spawnSnakeFood();
        if (snakeGameLoop) cancelAnimationFrame(snakeGameLoop);
        snakeGameLoop = requestAnimationFrame(snakeGameLoopFn);
    }

    function snakeGameLoopFn(currentTime) {
        const deltaTime = currentTime - snakeLastTime;
        if (deltaTime >= snakeUpdateInterval) {
            updateSnakeGame();
            snakeLastTime = currentTime - (deltaTime % snakeUpdateInterval);
        }
        snakeGameLoop = requestAnimationFrame(snakeGameLoopFn);
    }

    function spawnSnakeFood() {
        snakeFood = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
    }

    function updateSnakeGame() {
        const head = { x: snake[0].x + snakeDirection.x, y: snake[0].y + snakeDirection.y };
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) { gameOverSnake(); return; }
        if (snake.some(segment => segment.x === head.x && segment.y === head.y)) { gameOverSnake(); return; }
        snake.unshift(head);
        if (head.x === snakeFood.x && head.y === snakeFood.y) {
            snakeScore += 10;
            const score = document.getElementById('snake-score');
            if (score) score.textContent = snakeScore;
            spawnSnakeFood();
        } else { snake.pop(); }
        drawSnakeGame();
    }

    function drawSnakeGame() {
        if (!snakeCtx) return;
        snakeCtx.fillStyle = '#000';
        snakeCtx.fillRect(0, 0, 200, 200);
        snakeCtx.fillStyle = '#ff0000';
        snakeCtx.fillRect(snakeFood.x * 10 + 1, snakeFood.y * 10 + 1, 8, 8);
        snakeCtx.fillStyle = '#00ff00';
        snake.forEach(segment => snakeCtx.fillRect(segment.x * 10, segment.y * 10, 10, 10));
    }

    function gameOverSnake() {
        if (snakeGameLoop) cancelAnimationFrame(snakeGameLoop);
        snakeGameLoop = null;
        if (snakeScore > state.snakeHighScore) {
            state.snakeHighScore = snakeScore;
            localStorage.setItem('snake-highscore', snakeScore);
            const best = document.getElementById('snake-best');
            if (best) best.textContent = snakeScore;
            window.showToast('success');
        } else { window.showToast('error'); }
    }

    document.addEventListener('keydown', (e) => {
        const snakeView = document.getElementById('app-snake');
        if (!snakeView || !snakeView.classList.contains('active')) return;
        switch (e.key) {
            case 'ArrowUp': case 'w': case 'W': e.preventDefault(); if (snakeDirection.y === 0) snakeDirection = { x: 0, y: -1 }; break;
            case 'ArrowDown': case 's': case 'S': e.preventDefault(); if (snakeDirection.y === 0) snakeDirection = { x: 0, y: 1 }; break;
            case 'ArrowLeft': case 'a': case 'A': e.preventDefault(); if (snakeDirection.x === 0) snakeDirection = { x: -1, y: 0 }; break;
            case 'ArrowRight': case 'd': case 'D': e.preventDefault(); if (snakeDirection.x === 0) snakeDirection = { x: 1, y: 0 }; break;
        }
    });

    const typerTexts = ["The quick brown fox jumps over the lazy dog.", "Pack my box with five dozen liquor jugs.", "How vexingly quick daft zebras jump!", "Sphinx of black quartz, judge my vow.", "The five boxing wizards jump quickly."];
    let currentTyperText = '';
    let typerStartTime = null;
    let typerErrors = 0;

    function initTyperGame() {
        currentTyperText = typerTexts[Math.floor(Math.random() * typerTexts.length)];
        typerStartTime = null;
        typerErrors = 0;
        const input = document.getElementById('typer-input');
        if (input) input.value = '';
        const wpm = document.getElementById('typer-wpm');
        if (wpm) wpm.textContent = '0';
        const acc = document.getElementById('typer-accuracy');
        if (acc) acc.textContent = '100%';
        renderTyperDisplay();
    }

    function renderTyperDisplay() {
        const display = document.getElementById('typer-display');
        if (!display) return;
        const inputEl = document.getElementById('typer-input');
        const input = inputEl ? inputEl.value : '';
        let html = '';
        for (let i = 0; i < currentTyperText.length; i++) {
            if (i < input.length) {
                if (input[i] === currentTyperText[i]) { html += `<span class="typer-cursor">${currentTyperText[i]}</span>`; }
                else { html += `<span style="background: #ff0000; color: #fff;">${currentTyperText[i]}</span>`; }
            } else if (i === input.length) { html += `<span class="typer-cursor">${currentTyperText[i]}</span>`; }
            else { html += `<span class="typer-text">${currentTyperText[i]}</span>`; }
        }
        display.innerHTML = html;
    }

    const tInput = document.getElementById('typer-input');
    if (tInput) {
        tInput.addEventListener('input', function () {
            if (!typerStartTime) typerStartTime = Date.now();
            renderTyperDisplay();
            const input = this.value;
            typerErrors = 0;
            for (let i = 0; i < input.length; i++) { if (input[i] !== currentTyperText[i]) typerErrors++; }
            const elapsed = (Date.now() - typerStartTime) / 1000 / 60;
            const words = input.length / 5;
            const wpmCount = Math.round(words / elapsed) || 0;
            const accuracyCount = Math.round((input.length - typerErrors) / input.length * 100) || 100;
            const wpm = document.getElementById('typer-wpm');
            if (wpm) wpm.textContent = wpmCount;
            const acc = document.getElementById('typer-accuracy');
            if (acc) acc.textContent = accuracyCount + '%';
            if (input === currentTyperText) { window.showToast('success'); }
        });
    }

    let reactionState = 'idle';
    let reactionTimeout = null;
    let reactionStartTime = 0;

    window.resetReactionGame = function () {
        reactionState = 'idle';
        const area = document.getElementById('reaction-area');
        if (!area) return;
        area.className = 'reaction-area waiting';
        area.textContent = 'Click to Start';
        const best = document.getElementById('reaction-best');
        if (best) best.textContent = state.reactionBest < 9999 ? state.reactionBest : '--';
    };

    window.handleReactionClick = function () {
        const area = document.getElementById('reaction-area');
        if (!area) return;
        if (reactionState === 'idle') {
            reactionState = 'waiting';
            area.className = 'reaction-area waiting';
            area.textContent = 'Wait for green...';
            window.reactionTimeout = setTimeout(() => {
                reactionState = 'ready';
                area.className = 'reaction-area ready';
                area.textContent = 'CLICK NOW!';
                reactionStartTime = Date.now();
            }, Math.random() * 3000 + 1000);
        } else if (reactionState === 'waiting') {
            clearTimeout(window.reactionTimeout);
            reactionState = 'idle';
            area.className = 'reaction-area waiting';
            area.textContent = 'Too early! Click to try again';
        } else if (reactionState === 'ready') {
            const time = Date.now() - reactionStartTime;
            reactionState = 'idle';
            area.className = 'reaction-area result';
            area.textContent = `${time}ms! Click to try again`;
            if (time < state.reactionBest) {
                state.reactionBest = time;
                localStorage.setItem('reaction-best', time);
                const best = document.getElementById('reaction-best');
                if (best) best.textContent = time;
                window.showToast('success');
            }
        }
    };

    // === GUESTBOOK ===
    const API_BASE = 'http://localhost:3001/api';

    function initGuestbook() {
        loadGuestbook();
    }

    async function loadGuestbook() {
        const list = document.getElementById('guestbook-list');
        if (!list) return;

        try {
            const response = await fetch(`${API_BASE}/guestbook`);
            const entries = await response.json();

            if (entries.length === 0) {
                list.innerHTML = '<div style="padding: 20px; text-align: center; color: #888;">No entries yet. Be the first!</div>';
                return;
            }

            list.innerHTML = entries.map(entry => `
                <div class="toast info" style="margin-bottom: 8px; border: 2px outset white; padding: 8px;">
                    <div style="font-weight: bold; font-size: 10px; border-bottom: 1px solid rgba(0,0,0,0.1); margin-bottom: 4px;">
                        ${entry.name} <span style="font-weight: normal; opacity: 0.7; float: right;">${new Date(entry.timestamp).toLocaleDateString()}</span>
                    </div>
                    <div style="font-size: 12px;">${entry.message}</div>
                </div>
            `).join('');
        } catch (error) {
            list.innerHTML = '<div style="padding: 20px; text-align: center; color: #ff0000;">Error connecting to backend.</div>';
        }
    }

    window.submitGuestbook = async function () {
        const nameEl = document.getElementById('gb-name');
        const msgEl = document.getElementById('gb-message');
        const name = nameEl.value.trim();
        const message = msgEl.value.trim();

        if (!name || !message) {
            window.showToast('warning');
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/guestbook`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, message })
            });

            if (response.ok) {
                nameEl.value = '';
                msgEl.value = '';
                window.showToast('success');
                loadGuestbook();
            } else {
                window.showToast('error');
            }
        } catch (error) {
            window.showToast('error');
        }
    };

    // === FILE EXPLORER ===
    const vaultFiles = [
        { name: 'README.txt', type: 'text', content: 'Welcome to the Retro Vault!\n\nThis is a collection of curiosities from the early web.' },
        { name: 'SECRET.zip', type: 'archive' },
        {
            name: 'IMAGES', type: 'dir', children: [
                { name: 'UNDER_CONST.gif', type: 'image' },
                { name: 'DANCING_BABY.gif', type: 'image' },
                { name: 'NETSCAPE.png', type: 'image' }
            ]
        },
        {
            name: 'SYSTEM', type: 'dir', children: [
                { name: 'KERNEL.dll', type: 'sys' },
                { name: 'CONFIG.sys', type: 'sys' }
            ]
        }
    ];

    let currentDir = vaultFiles;
    let pathHistory = [vaultFiles];
    let pathNames = ['C:', 'RETRO_VAULT'];

    function initExplorer() {
        renderExplorer();
    }

    function renderExplorer() {
        const container = document.getElementById('explorer-files');
        const pathEl = document.getElementById('explorer-path');
        if (!container || !pathEl) return;

        pathEl.textContent = pathNames.join('\\');
        container.innerHTML = '';

        currentDir.forEach(item => {
            const div = document.createElement('div');
            div.className = 'explorer-item';
            div.style.textAlign = 'center';
            div.style.cursor = 'pointer';
            div.style.padding = '8px';

            const icon = document.createElement('div');
            icon.className = 'explorer-icon ' + item.type;
            icon.innerHTML = getIconForType(item.type);

            const label = document.createElement('div');
            label.style.fontSize = '10px';
            label.style.marginTop = '4px';
            label.textContent = item.name;

            div.appendChild(icon);
            div.appendChild(label);

            div.onclick = () => {
                if (item.type === 'dir') {
                    pathHistory.push(currentDir);
                    pathNames.push(item.name);
                    currentDir = item.children;
                    renderExplorer();
                } else {
                    window.showToast('info');
                }
            };

            container.appendChild(div);
        });
    }

    window.explorerBack = function () {
        if (pathHistory.length > 1) {
            currentDir = pathHistory.pop();
            pathNames.pop();
            renderExplorer();
        }
    };

    function getIconForType(type) {
        switch (type) {
            case 'dir': return '📁';
            case 'text': return '📄';
            case 'archive': return '📦';
            case 'image': return '🖼️';
            default: return '📄';
        }
    }

    // === SOUNDBOARD ===
    const sfxMap = {
        'dialup': 'https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=dialup&filename=mt/MTI0MTEyMTI0MTExNjk5_6_2f_2bWd_2f_2fV1oX4.mp3', // Note: Placeholder, real URLs might expire
        'u-got-mail': 'https://www.soundjay.com/buttons/sounds/button-1.mp3', // Generic placeholder
        'tada': 'https://www.soundjay.com/buttons/sounds/button-2.mp3',
        'shutdown': 'https://www.soundjay.com/buttons/sounds/button-3.mp3',
        'notify': 'https://www.soundjay.com/buttons/sounds/button-4.mp3',
        'error': 'https://www.soundjay.com/buttons/sounds/button-5.mp3'
    };

    function initSoundboard() {
        const status = document.getElementById('sound-status');
        if (status) status.textContent = 'Ready...';
    }

    window.playSfx = function (id) {
        const status = document.getElementById('sound-status');
        if (status) status.textContent = 'Playing ' + id + '...';

        // In a real app, you'd use new Audio(sfxMap[id]).play()
        // Here we'll just mock it with a visual change and showToast
        window.showToast('info');
        console.log('Playing SFX: ' + id);

        setTimeout(() => {
            if (status) status.textContent = 'Ready...';
        }, 2000);
    };

    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') window.showHub(); });
    if (typeof window.changeColor === 'function') window.changeColor();
})();
