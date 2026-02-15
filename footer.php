</div>
</main>
</div>

<!-- Settings Panel -->
<div id="settings-panel"
    class="fixed top-24 right-0 bg-dark-gray border-l border-t border-b border-gray-700 p-4 rounded-l-lg shadow-2xl closed flex flex-col gap-4 w-64">
    <button id="settings-toggle"
        class="absolute -left-10 top-0 bg-dark-gray text-white p-3 rounded-l-lg border-l border-t border-b border-gray-700 shadow-lg"
        onclick="toggleSettings()">
        <i class="fas fa-cog fa-spin"></i>
    </button>

    <h3 class="text-white font-bold border-b border-gray-700 pb-2">Customize</h3>

    <!-- Theme Toggle -->
    <div>
        <label class="block text-xs text-gray-400 mb-2">Theme</label>
        <div class="flex gap-2 text-xs">
            <button onclick="toggleTheme('dark')" class="flex-1 bg-primary text-white py-1 rounded transition-colors"
                id="btn-theme-dark">Dark</button>
            <button onclick="toggleTheme('light')"
                class="flex-1 bg-gray-700 hover:bg-primary hover:text-white py-1 rounded transition-colors"
                id="btn-theme-light">Light</button>
        </div>
    </div>

    <div>
        <label class="block text-xs text-gray-400 mb-2">Background Mode</label>
        <div class="flex gap-2 text-xs">
            <button onclick="toggleBgMode('static')"
                class="flex-1 bg-gray-700 hover:bg-primary hover:text-white py-1 rounded transition-colors"
                id="btn-bg-static">Static</button>
            <button onclick="toggleBgMode('slider')"
                class="flex-1 bg-gray-700 hover:bg-primary hover:text-white py-1 rounded transition-colors"
                id="btn-bg-slider">Slider</button>
        </div>
    </div>
</div>

<?php wp_footer(); ?>
</body>

</html>