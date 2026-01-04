let cache = new Map();
let capacity = 3;

document.getElementById("cacheSize").addEventListener("change", function () {
    capacity = Number(this.value);
    clearCache();
});

// PUT operation
function put() {
    const key = keyInput.value.trim();
    const value = valueInput.value.trim();

    if (!key || !value) {
        alert("Please enter both key and value");
        return;
    }

    if (cache.has(key)) {
        cache.delete(key);
    }

    cache.set(key, value);

    if (cache.size > capacity) {
        const lruKey = cache.keys().next().value;
        animateRemoval(lruKey);
    } else {
        renderCache();
    }
}

// GET operation
function get() {
    const key = keyInput.value.trim();

    if (!cache.has(key)) {
        alert("Key not found");
        return;
    }

    const value = cache.get(key);
    cache.delete(key);
    cache.set(key, value);

    alert("Value: " + value);
    renderCache();
}

// Clear cache
function clearCache() {
    cache.clear();
    renderCache();
}

// Animate removal
function animateRemoval(key) {
    const container = document.getElementById("cacheContainer");
    const items = container.children;

    for (let item of items) {
        if (item.dataset.key === key) {
            item.classList.add("removed");

            setTimeout(() => {
                cache.delete(key);
                renderCache();
            }, 300);
            return;
        }
    }
}

// Render cache visually
function renderCache() {
    const container = document.getElementById("cacheContainer");
    container.innerHTML = "";

    for (let [key, value] of cache) {
        const div = document.createElement("div");
        div.className = "cache-item";
        div.dataset.key = key;
        div.innerHTML = `<strong>${key}</strong><br>${value}`;
        container.appendChild(div);
    }
}
