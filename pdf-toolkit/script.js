/**
 * Free PDF Toolkit - Main JavaScript
 * 100% Client-Side PDF Processing
 */

// ==================== GLOBAL STATE ====================
const state = {
    theme: 'dark',
    frequentTools: [],
    currentTool: null,
    files: [],
    pdfDoc: null
};

// ==================== TOOL DEFINITIONS ====================
const tools = [
    // CATEGORY 1: Sabse Aasaan (Beginner Friendly)
    { id: 'merge-pdf', name: 'Merge PDF', category: 'organize', icon: 'fa-object-group', description: 'Combine multiple PDFs into one', color: 'from-blue-500 to-cyan-500' },
    { id: 'split-pdf', name: 'Split PDF', category: 'organize', icon: 'fa-scissors', description: 'Extract pages from your PDF', color: 'from-purple-500 to-pink-500' },
    { id: 'rotate-pdf', name: 'Rotate PDF', category: 'organize', icon: 'fa-rotate', description: 'Rotate pages 90°, 180°, or 270°', color: 'from-orange-500 to-yellow-500' },
    { id: 'extract-pages', name: 'Extract Pages', category: 'organize', icon: 'fa-file-export', description: 'Pick specific pages to extract', color: 'from-green-500 to-emerald-500' },
    { id: 'delete-pages', name: 'Delete Pages', category: 'organize', icon: 'fa-trash', description: 'Remove unwanted pages', color: 'from-red-500 to-rose-500' },
    { id: 'pdf-to-images', name: 'PDF to Images', category: 'convert-from', icon: 'fa-image', description: 'Convert PDF pages to JPG/PNG', color: 'from-indigo-500 to-blue-500' },
    { id: 'images-to-pdf', name: 'Images to PDF', category: 'convert-to', icon: 'fa-images', description: 'Convert images to PDF', color: 'from-teal-500 to-cyan-500' },
    { id: 'add-watermark', name: 'Add Watermark', category: 'edit', icon: 'fa-stamp', description: 'Add text watermark to PDF', color: 'from-violet-500 to-purple-500' },
    { id: 'add-page-numbers', name: 'Page Numbers', category: 'edit', icon: 'fa-list-ol', description: 'Add page numbers to PDF', color: 'from-fuchsia-500 to-pink-500' },
    { id: 'protect-pdf', name: 'Protect PDF', category: 'security', icon: 'fa-lock', description: 'Password protect your PDF', color: 'from-amber-500 to-orange-500' },
    { id: 'unlock-pdf', name: 'Unlock PDF', category: 'security', icon: 'fa-unlock', description: 'Remove PDF password', color: 'from-lime-500 to-green-500' },
    { id: 'extract-text', name: 'Extract Text', category: 'convert-from', icon: 'fa-font', description: 'Extract text from PDF', color: 'from-sky-500 to-blue-500' },
    { id: 'pdf-metadata', name: 'PDF Metadata', category: 'edit', icon: 'fa-tags', description: 'Edit PDF metadata', color: 'from-rose-500 to-red-500' },
    { id: 'rearrange-pages', name: 'Rearrange Pages', category: 'organize', icon: 'fa-sort', description: 'Drag & drop to reorder pages', color: 'from-cyan-500 to-blue-500' },
    
    // CATEGORY 2: Thoda Medium Level
    { id: 'compress-pdf', name: 'Compress PDF', category: 'advanced', icon: 'fa-compress', description: 'Reduce PDF file size', color: 'from-gray-500 to-slate-500' },
    { id: 'crop-pdf', name: 'Crop PDF', category: 'edit', icon: 'fa-crop', description: 'Crop PDF pages', color: 'from-emerald-500 to-teal-500' },
    { id: 'pdf-ocr', name: 'PDF OCR', category: 'ocr', icon: 'fa-eye', description: 'Extract text using OCR', color: 'from-blue-600 to-indigo-600' },
    { id: 'webpage-to-pdf', name: 'Webpage to PDF', category: 'convert-to', icon: 'fa-globe', description: 'Convert HTML to PDF', color: 'from-purple-600 to-violet-600' },
    { id: 'pdf-to-text', name: 'PDF to Text', category: 'convert-from', icon: 'fa-file-lines', description: 'Convert PDF to TXT file', color: 'from-orange-600 to-amber-600' },
    { id: 'flatten-pdf', name: 'Flatten PDF', category: 'advanced', icon: 'fa-layer-flat', description: 'Flatten all form fields', color: 'from-pink-600 to-rose-600' },
    { id: 'sign-pdf', name: 'Sign PDF', category: 'edit', icon: 'fa-signature', description: 'Add digital signature', color: 'from-green-600 to-emerald-600' },
    { id: 'pdf-reader', name: 'PDF Reader', category: 'advanced', icon: 'fa-book-open', description: 'View PDF in browser', color: 'from-indigo-600 to-purple-600' },
    { id: 'annotate-pdf', name: 'Annotate PDF', category: 'edit', icon: 'fa-highlighter', description: 'Add highlights and notes', color: 'from-yellow-600 to-orange-600' },
    { id: 'fill-forms', name: 'Fill Forms', category: 'edit', icon: 'fa-pen-to-square', description: 'Fill PDF form fields', color: 'from-teal-600 to-cyan-600' },
    { id: 'create-form', name: 'Create Form', category: 'advanced', icon: 'fa-square-check', description: 'Create fillable PDF forms', color: 'from-slate-600 to-gray-600' },
    
    // ADVANCED TOOLS
    { id: 'compare-pdfs', name: 'Compare PDFs', category: 'advanced', icon: 'fa-right-left', description: 'Find differences between PDFs', color: 'from-red-600 to-pink-600' },
    { id: 'scan-to-pdf', name: 'Scan to PDF', category: 'convert-to', icon: 'fa-camera', description: 'Capture photos to PDF', color: 'from-blue-700 to-indigo-700' },
    { id: 'qr-code-pdf', name: 'QR Code in PDF', category: 'advanced', icon: 'fa-qrcode', description: 'Add QR code to PDF', color: 'from-black to-gray-800' },
    { id: 'bookmark-pdf', name: 'Bookmark PDF', category: 'advanced', icon: 'fa-bookmark', description: 'Add bookmarks/outline', color: 'from-amber-600 to-yellow-600' },
    { id: 'halve-pages', name: 'Halve Pages', category: 'advanced', icon: 'fa-divide', description: 'Split each page in two', color: 'from-violet-700 to-purple-700' },
    { id: 'n-up', name: 'N-Up Pages', category: 'advanced', icon: 'fa-grid-2', description: 'Multiple pages per sheet', color: 'from-cyan-700 to-blue-700' }
];

const categories = {
    organize: { name: 'Organize', icon: 'fa-folder-tree', tools: [] },
    'convert-to': { name: 'Convert to PDF', icon: 'fa-file-import', tools: [] },
    'convert-from': { name: 'Convert from PDF', icon: 'fa-file-export', tools: [] },
    edit: { name: 'Edit PDF', icon: 'fa-pen', tools: [] },
    security: { name: 'Security', icon: 'fa-shield-halved', tools: [] },
    advanced: { name: 'Advanced', icon: 'fa-gears', tools: [] },
    ocr: { name: 'OCR', icon: 'fa-eye', tools: [] }
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initThreeJS();
    initCategories();
    renderSidebar();
    renderTools();
    initEventListeners();
    loadFrequentTools();
    initTiltEffect();
});

// ==================== THEME MANAGEMENT ====================
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    state.theme = savedTheme;
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('theme', state.theme);
}

// ==================== THREE.JS BACKGROUND ====================
function initThreeJS() {
    const container = document.getElementById('bg-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Create floating geometric shapes
    const geometries = [
        new THREE.IcosahedronGeometry(1, 0),
        new THREE.OctahedronGeometry(1, 0),
        new THREE.TetrahedronGeometry(1, 0)
    ];
    
    const materials = [
        new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.3 }),
        new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.3 }),
        new THREE.MeshBasicMaterial({ color: 0xec4899, wireframe: true, transparent: true, opacity: 0.3 })
    ];
    
    const shapes = [];
    for (let i = 0; i < 15; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const material = materials[Math.floor(Math.random() * materials.length)];
        const mesh = new THREE.Mesh(geometry, material);
        
        mesh.position.x = (Math.random() - 0.5) * 20;
        mesh.position.y = (Math.random() - 0.5) * 20;
        mesh.position.z = (Math.random() - 0.5) * 10 - 5;
        
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        
        mesh.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01
            },
            floatSpeed: Math.random() * 0.5 + 0.5,
            floatOffset: Math.random() * Math.PI * 2
        };
        
        scene.add(mesh);
        shapes.push(mesh);
    }
    
    camera.position.z = 5;
    
    function animate() {
        requestAnimationFrame(animate);
        
        const time = Date.now() * 0.001;
        
        shapes.forEach((shape, index) => {
            shape.rotation.x += shape.userData.rotationSpeed.x;
            shape.rotation.y += shape.userData.rotationSpeed.y;
            shape.position.y += Math.sin(time * shape.userData.floatSpeed + shape.userData.floatOffset) * 0.01;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ==================== CATEGORIES & TOOLS RENDERING ====================
function initCategories() {
    tools.forEach(tool => {
        if (categories[tool.category]) {
            categories[tool.category].tools.push(tool.id);
        }
    });
}

function renderTools(filterCategory = null) {
    const grid = document.getElementById('tools-grid');
    grid.innerHTML = '';
    
    const filteredTools = filterCategory 
        ? tools.filter(t => t.category === filterCategory)
        : tools;
    
    filteredTools.forEach(tool => {
        const card = createToolCard(tool);
        grid.appendChild(card);
    });
    
    // Animate cards on render
    gsap.from('.tool-card', {
        duration: 0.5,
        y: 50,
        opacity: 0,
        stagger: 0.05,
        ease: 'back.out(1.7)'
    });
}

function createToolCard(tool) {
    const card = document.createElement('div');
    card.className = 'tool-card glass-panel rounded-2xl p-6 cursor-pointer group';
    card.dataset.toolId = tool.id;
    
    card.innerHTML = `
        <div class="icon-container w-16 h-16 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
            <i class="fas ${tool.icon} text-white text-2xl"></i>
        </div>
        <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-2">${tool.name}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">${tool.description}</p>
        <button class="btn-primary w-full py-2 flex items-center justify-center gap-2">
            <span>Launch</span>
            <i class="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
        </button>
    `;
    
    card.addEventListener('click', () => openToolModal(tool));
    
    return card;
}

function renderSidebar() {
    const nav = document.getElementById('category-nav');
    nav.innerHTML = '';
    
    Object.entries(categories).forEach(([key, category]) => {
        const item = document.createElement('div');
        item.className = 'category-item';
        item.dataset.category = key;
        
        item.innerHTML = `
            <button class="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-colors">
                <div class="flex items-center gap-3">
                    <i class="fas ${category.icon} text-blue-500"></i>
                    <span class="font-medium text-gray-700 dark:text-gray-200">${category.name}</span>
                </div>
                <i class="fas fa-chevron-down text-xs text-gray-500 transition-transform"></i>
            </button>
            <div class="ml-4 mt-1 space-y-1 hidden">
                ${category.tools.map(toolId => {
                    const tool = tools.find(t => t.id === toolId);
                    return `
                        <button class="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-white/10 hover:text-blue-500 transition-colors" data-tool-id="${toolId}">
                            ${tool.name}
                        </button>
                    `;
                }).join('')}
            </div>
        `;
        
        item.querySelector('button').addEventListener('click', () => {
            item.classList.toggle('active');
            const submenu = item.querySelector('div:last-child');
            const chevron = item.querySelector('.fa-chevron-down');
            submenu.classList.toggle('hidden');
            chevron.style.transform = submenu.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
        });
        
        nav.appendChild(item);
    });
}

// ==================== MODAL MANAGEMENT ====================
function openToolModal(tool) {
    state.currentTool = tool;
    addToFrequentTools(tool.id);
    
    const modal = document.getElementById('tool-modal');
    const title = document.getElementById('modal-title');
    const description = document.getElementById('modal-description');
    const icon = document.getElementById('modal-icon');
    const content = document.getElementById('modal-content');
    
    title.textContent = tool.name;
    description.textContent = tool.description;
    icon.innerHTML = `<i class="fas ${tool.icon} text-white text-xl"></i>`;
    icon.className = `w-12 h-12 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center shadow-lg`;
    
    // Generate tool-specific content
    content.innerHTML = generateToolContent(tool);
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Initialize tool-specific functionality
    initializeToolFunctionality(tool);
}

function closeToolModal() {
    const modal = document.getElementById('tool-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    state.currentTool = null;
    state.files = [];
    state.pdfDoc = null;
}

// ==================== TOOL CONTENT GENERATORS ====================
function generateToolContent(tool) {
    const commonUpload = `
        <div class="drop-zone rounded-2xl p-8 text-center mb-6" id="drop-zone">
            <i class="fas fa-cloud-upload-alt text-5xl text-blue-500 mb-4"></i>
            <p class="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">Drop your PDF here</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">or click to browse</p>
            <input type="file" id="file-input" accept=".pdf" multiple class="hidden">
            <button class="btn-primary" onclick="document.getElementById('file-input').click()">
                <i class="fas fa-folder-open mr-2"></i>Select Files
            </button>
        </div>
        <div id="file-list" class="space-y-2 mb-6"></div>
    `;
    
    switch(tool.id) {
        case 'merge-pdf':
            return `
                ${commonUpload}
                <div id="merge-options" class="hidden">
                    <div class="flex items-center justify-between mb-4">
                        <h4 class="font-semibold text-gray-700 dark:text-gray-200">Reorder Files</h4>
                        <button class="btn-secondary text-sm" id="sort-alpha">
                            <i class="fas fa-sort-alpha-down mr-1"></i>Sort Alphabetically
                        </button>
                    </div>
                    <div id="file-order" class="thumbnail-grid mb-6"></div>
                    <button class="btn-primary w-full py-3" id="merge-btn">
                        <i class="fas fa-object-group mr-2"></i>Merge PDFs
                    </button>
                </div>
            `;
            
        case 'split-pdf':
            return `
                ${commonUpload}
                <div id="split-options" class="hidden">
                    <div class="grid md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Page Range</label>
                            <input type="text" id="page-range" placeholder="e.g., 1-5, 8, 11-15" class="input-field w-full">
                            <p class="text-xs text-gray-500 mt-1">Use commas to separate ranges</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Split Mode</label>
                            <select id="split-mode" class="input-field w-full">
                                <option value="range">Extract Range</option>
                                <option value="all">All Pages Separate</option>
                                <option value="custom">Custom Selection</option>
                            </select>
                        </div>
                    </div>
                    <button class="btn-primary w-full py-3" id="split-btn">
                        <i class="fas fa-scissors mr-2"></i>Split PDF
                    </button>
                </div>
            `;
            
        case 'rotate-pdf':
            return `
                ${commonUpload}
                <div id="rotate-options" class="hidden">
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Rotation Angle</label>
                        <div class="flex gap-4">
                            <button class="btn-secondary flex-1 rotate-option" data-angle="90">
                                <i class="fas fa-rotate-right mr-2"></i>90° CW
                            </button>
                            <button class="btn-secondary flex-1 rotate-option" data-angle="180">
                                <i class="fas fa-rotate-right mr-2"></i>180°
                            </button>
                            <button class="btn-secondary flex-1 rotate-option" data-angle="270">
                                <i class="fas fa-rotate-left mr-2"></i>270° CW
                            </button>
                        </div>
                    </div>
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Pages to Rotate</label>
                        <input type="text" id="rotate-pages" placeholder="All pages (leave empty) or e.g., 1,3,5" class="input-field w-full">
                    </div>
                    <button class="btn-primary w-full py-3" id="rotate-btn">
                        <i class="fas fa-rotate mr-2"></i>Rotate Pages
                    </button>
                </div>
            `;
            
        case 'compress-pdf':
            return `
                ${commonUpload}
                <div id="compress-options" class="hidden">
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Compression Level</label>
                        <input type="range" id="compression-level" min="1" max="100" value="50" class="w-full">
                        <div class="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Low</span>
                            <span id="compression-value">50%</span>
                            <span>High</span>
                        </div>
                    </div>
                    <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
                        <p class="text-sm text-yellow-700 dark:text-yellow-400">
                            <i class="fas fa-info-circle mr-2"></i>
                            Higher compression may reduce quality. This process may take a while for large files.
                        </p>
                    </div>
                    <button class="btn-primary w-full py-3" id="compress-btn">
                        <i class="fas fa-compress mr-2"></i>Compress PDF
                    </button>
                </div>
            `;
            
        case 'pdf-ocr':
            return `
                ${commonUpload}
                <div id="ocr-options" class="hidden">
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">OCR Language</label>
                        <select id="ocr-lang" class="input-field w-full">
                            <option value="eng">English</option>
                            <option value="spa">Spanish</option>
                            <option value="fra">French</option>
                            <option value="deu">German</option>
                            <option value="ita">Italian</option>
                            <option value="por">Portuguese</option>
                        </select>
                    </div>
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Output Format</label>
                        <div class="flex gap-4">
                            <label class="flex items-center gap-2">
                                <input type="radio" name="ocr-output" value="text" checked>
                                <span class="text-gray-700 dark:text-gray-200">Text File</span>
                            </label>
                            <label class="flex items-center gap-2">
                                <input type="radio" name="ocr-output" value="overlay">
                                <span class="text-gray-700 dark:text-gray-200">Text Overlay PDF</span>
                            </label>
                        </div>
                    </div>
                    <button class="btn-primary w-full py-3" id="ocr-btn">
                        <i class="fas fa-eye mr-2"></i>Start OCR
                    </button>
                </div>
            `;
            
        case 'sign-pdf':
            return `
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="font-semibold text-gray-700 dark:text-gray-200 mb-4">Draw Signature</h4>
                        <canvas id="signature-pad" class="signature-pad w-full h-48"></canvas>
                        <div class="flex gap-2 mt-4">
                            <button class="btn-secondary flex-1" id="clear-signature">
                                <i class="fas fa-eraser mr-2"></i>Clear
                            </button>
                            <button class="btn-secondary flex-1" id="undo-signature">
                                <i class="fas fa-undo mr-2"></i>Undo
                            </button>
                        </div>
                    </div>
                    <div>
                        <h4 class="font-semibold text-gray-700 dark:text-gray-200 mb-4">Upload PDF</h4>
                        <div class="drop-zone rounded-xl p-6 text-center" id="sign-drop-zone">
                            <i class="fas fa-file-pdf text-4xl text-blue-500 mb-2"></i>
                            <p class="text-sm text-gray-600 dark:text-gray-300">Drop PDF here</p>
                            <input type="file" id="sign-file-input" accept=".pdf" class="hidden">
                        </div>
                        <div id="sign-preview" class="mt-4 hidden">
                            <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">Selected PDF:</p>
                            <p id="sign-filename" class="text-sm font-medium text-gray-700 dark:text-gray-200 truncate"></p>
                        </div>
                    </div>
                </div>
                <button class="btn-primary w-full py-3 mt-6" id="apply-signature">
                    <i class="fas fa-signature mr-2"></i>Apply Signature
                </button>
            `;
            
        case 'images-to-pdf':
            return `
                <div class="drop-zone rounded-2xl p-8 text-center mb-6" id="drop-zone">
                    <i class="fas fa-cloud-upload-alt text-5xl text-blue-500 mb-4"></i>
                    <p class="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">Drop Images Here</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Supports JPG, PNG, WEBP, HEIC, SVG, TIFF</p>
                    <input type="file" id="file-input" accept="image/*" multiple class="hidden">
                    <button class="btn-primary" onclick="document.getElementById('file-input').click()">
                        <i class="fas fa-folder-open mr-2"></i>Select Images
                    </button>
                </div>
                <div id="image-options" class="hidden">
                    <div class="grid md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Page Size</label>
                            <select id="page-size" class="input-field w-full">
                                <option value="a4">A4</option>
                                <option value="letter">Letter</option>
                                <option value="legal">Legal</option>
                                <option value="fit">Fit to Image</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Orientation</label>
                            <select id="orientation" class="input-field w-full">
                                <option value="portrait">Portrait</option>
                                <option value="landscape">Landscape</option>
                                <option value="auto">Auto</option>
                            </select>
                        </div>
                    </div>
                    <div id="image-previews" class="thumbnail-grid mb-6"></div>
                    <button class="btn-primary w-full py-3" id="convert-images-btn">
                        <i class="fas fa-file-pdf mr-2"></i>Convert to PDF
                    </button>
                </div>
            `;
            
        case 'add-watermark':
            return `
                ${commonUpload}
                <div id="watermark-options" class="hidden">
                    <div class="grid md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Watermark Text</label>
                            <input type="text" id="watermark-text" placeholder="Enter watermark text" class="input-field w-full">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Font Size</label>
                            <input type="number" id="watermark-size" value="48" min="12" max="200" class="input-field w-full">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Opacity</label>
                            <input type="range" id="watermark-opacity" min="0" max="100" value="30" class="w-full">
                            <span id="opacity-value" class="text-xs text-gray-500">30%</span>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Rotation</label>
                            <input type="range" id="watermark-rotation" min="-180" max="180" value="-45" class="w-full">
                            <span id="rotation-value" class="text-xs text-gray-500">-45°</span>
                        </div>
                    </div>
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Position</label>
                        <div class="grid grid-cols-3 gap-2">
                            <button class="btn-secondary position-btn" data-pos="tl">Top Left</button>
                            <button class="btn-secondary position-btn" data-pos="tc">Top Center</button>
                            <button class="btn-secondary position-btn" data-pos="tr">Top Right</button>
                            <button class="btn-secondary position-btn" data-pos="cl">Center Left</button>
                            <button class="btn-secondary position-btn active" data-pos="cc">Center</button>
                            <button class="btn-secondary position-btn" data-pos="cr">Center Right</button>
                            <button class="btn-secondary position-btn" data-pos="bl">Bottom Left</button>
                            <button class="btn-secondary position-btn" data-pos="bc">Bottom Center</button>
                            <button class="btn-secondary position-btn" data-pos="br">Bottom Right</button>
                        </div>
                    </div>
                    <button class="btn-primary w-full py-3" id="add-watermark-btn">
                        <i class="fas fa-stamp mr-2"></i>Add Watermark
                    </button>
                </div>
            `;
            
        case 'pdf-reader':
            return `
                <div class="drop-zone rounded-2xl p-8 text-center mb-6" id="drop-zone">
                    <i class="fas fa-cloud-upload-alt text-5xl text-blue-500 mb-4"></i>
                    <p class="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">Open PDF to View</p>
                    <input type="file" id="file-input" accept=".pdf" class="hidden">
                    <button class="btn-primary" onclick="document.getElementById('file-input').click()">
                        <i class="fas fa-folder-open mr-2"></i>Select PDF
                    </button>
                </div>
                <div id="pdf-viewer" class="hidden">
                    <div class="flex items-center justify-between mb-4">
                        <button class="btn-secondary" id="prev-page">
                            <i class="fas fa-chevron-left mr-2"></i>Previous
                        </button>
                        <span id="page-info" class="text-gray-700 dark:text-gray-200">Page 1 of 1</span>
                        <button class="btn-secondary" id="next-page">
                            Next<i class="fas fa-chevron-right ml-2"></i>
                        </button>
                    </div>
                    <canvas id="pdf-canvas" class="w-full mx-auto page-preview"></canvas>
                </div>
            `;
            
        case 'webpage-to-pdf':
            return `
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Input Mode</label>
                    <div class="flex gap-4 mb-4">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="web-mode" value="html" checked onchange="toggleWebMode()">
                            <span class="text-gray-700 dark:text-gray-200">HTML Code</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="web-mode" value="capture" onchange="toggleWebMode()">
                            <span class="text-gray-700 dark:text-gray-200">Capture Page</span>
                        </label>
                    </div>
                    
                    <div id="html-input-mode">
                        <textarea id="html-code" rows="10" placeholder="Paste your HTML code here..." class="input-field w-full font-mono text-sm"></textarea>
                    </div>
                    
                    <div id="capture-mode" class="hidden">
                        <div class="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-4">
                            <p class="text-sm text-blue-700 dark:text-blue-400">
                                <i class="fas fa-info-circle mr-2"></i>
                                Click the button below to capture the current webpage. Quality depends on page complexity.
                            </p>
                        </div>
                        <button class="btn-secondary w-full" id="capture-page">
                            <i class="fas fa-camera mr-2"></i>Capture Current Page
                        </button>
                    </div>
                </div>
                <button class="btn-primary w-full py-3" id="convert-web-btn">
                    <i class="fas fa-file-pdf mr-2"></i>Convert to PDF
                </button>
            `;
            
        default:
            return `
                ${commonUpload}
                <div id="tool-options" class="hidden">
                    <div class="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
                        <p class="text-sm text-blue-700 dark:text-blue-400">
                            <i class="fas fa-info-circle mr-2"></i>
                            Tool options will appear here after uploading a file.
                        </p>
                    </div>
                    <button class="btn-primary w-full py-3" id="process-btn">
                        <i class="fas fa-cog mr-2"></i>Process
                    </button>
                </div>
            `;
    }
}

// ==================== TOOL FUNCTIONALITY INITIALIZERS ====================
function initializeToolFunctionality(tool) {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const signDropZone = document.getElementById('sign-drop-zone');
    
    if (!dropZone && !signDropZone) return;
    
    // File upload handling
    if (dropZone && fileInput) {
        setupFileUpload(dropZone, fileInput, tool);
    }
    
    // Signature pad
    if (tool.id === 'sign-pdf') {
        initSignaturePad();
    }
    
    // Compression slider
    if (tool.id === 'compress-pdf') {
        const slider = document.getElementById('compression-level');
        const value = document.getElementById('compression-value');
        if (slider) {
            slider.addEventListener('input', () => {
                value.textContent = `${slider.value}%`;
            });
        }
    }
    
    // Watermark controls
    if (tool.id === 'add-watermark') {
        const opacitySlider = document.getElementById('watermark-opacity');
        const opacityValue = document.getElementById('opacity-value');
        const rotationSlider = document.getElementById('watermark-rotation');
        const rotationValue = document.getElementById('rotation-value');
        
        if (opacitySlider) {
            opacitySlider.addEventListener('input', () => {
                opacityValue.textContent = `${opacitySlider.value}%`;
            });
        }
        if (rotationSlider) {
            rotationSlider.addEventListener('input', () => {
                rotationValue.textContent = `${rotationSlider.value}°`;
            });
        }
    }
}

function setupFileUpload(dropZone, fileInput, tool) {
    // Click to upload
    dropZone.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON') {
            fileInput.click();
        }
    });
    
    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files, tool);
    });
    
    // Drag and drop
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });
    
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        handleFiles(e.dataTransfer.files, tool);
    });
}

async function handleFiles(files, tool) {
    const fileList = Array.from(files);
    
    // Validate file types
    const validTypes = tool.id === 'images-to-pdf' 
        ? ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/svg+xml', 'image/tiff']
        : ['application/pdf'];
    
    for (const file of fileList) {
        if (!validTypes.some(type => file.type.includes(type.split('/')[1]))) {
            showToast('Invalid file type. Please upload correct files.', 'error');
            return;
        }
        
        // Warn for large files
        if (file.size > 50 * 1024 * 1024) {
            showToast('Large file detected (>50MB). This may take a while.', 'warning');
        }
    }
    
    state.files = [...state.files, ...fileList];
    updateFileList(tool);
    
    // Show tool options
    const optionsDiv = document.getElementById(`${tool.id.replace('-', '-')}-options`) || 
                       document.getElementById('merge-options') ||
                       document.getElementById('tool-options');
    if (optionsDiv) {
        optionsDiv.classList.remove('hidden');
        gsap.from(optionsDiv, { duration: 0.3, opacity: 0, y: 20 });
    }
}

function updateFileList(tool) {
    const fileList = document.getElementById('file-list');
    if (!fileList) return;
    
    fileList.innerHTML = state.files.map((file, index) => `
        <div class="glass-panel rounded-xl p-3 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <i class="fas fa-file-pdf text-blue-500"></i>
                <span class="text-sm text-gray-700 dark:text-gray-200 truncate max-w-xs">${file.name}</span>
                <span class="text-xs text-gray-500">(${formatFileSize(file.size)})</span>
            </div>
            <button class="text-red-500 hover:text-red-600" onclick="removeFile(${index})">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
}

function removeFile(index) {
    state.files.splice(index, 1);
    updateFileList(state.currentTool);
}

// ==================== SIGNATURE PAD ====================
function initSignaturePad() {
    const canvas = document.getElementById('signature-pad');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const signaturePad = new SignaturePad(canvas, {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        penColor: 'rgb(0, 0, 0)'
    });
    
    document.getElementById('clear-signature')?.addEventListener('click', () => {
        signaturePad.clear();
    });
    
    document.getElementById('undo-signature')?.addEventListener('click', () => {
        if (signaturePad.isEmpty()) return;
        const data = signaturePad.toData();
        data.pop();
        signaturePad.fromData(data);
    });
    
    // Store for later use
    state.signaturePad = signaturePad;
}

// ==================== PDF PROCESSING FUNCTIONS ====================

// Merge PDFs
async function mergePDFs() {
    if (state.files.length < 2) {
        showToast('Please select at least 2 PDFs to merge', 'error');
        return;
    }
    
    showLoading('Merging PDFs...', 0);
    
    try {
        const { PDFDocument } = PDFLib;
        const mergedPdf = await PDFDocument.create();
        
        for (let i = 0; i < state.files.length; i++) {
            const file = state.files[i];
            const arrayBuffer = await readFileAsArrayBuffer(file);
            const pdf = await PDFDocument.load(arrayBuffer);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
            updateProgress(((i + 1) / state.files.length) * 100);
        }
        
        const pdfBytes = await mergedPdf.save();
        downloadFile(pdfBytes, 'merged.pdf', 'application/pdf');
        showToast('PDFs merged successfully!', 'success');
    } catch (error) {
        console.error('Merge error:', error);
        showToast('Error merging PDFs: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

// Split PDF
async function splitPDF() {
    if (state.files.length !== 1) {
        showToast('Please select exactly 1 PDF', 'error');
        return;
    }
    
    showLoading('Splitting PDF...', 0);
    
    try {
        const { PDFDocument } = PDFLib;
        const file = state.files[0];
        const arrayBuffer = await readFileAsArrayBuffer(file);
        const pdf = await PDFDocument.load(arrayBuffer);
        const totalPages = pdf.getPageCount();
        
        const rangeInput = document.getElementById('page-range')?.value;
        const splitMode = document.getElementById('split-mode')?.value || 'range';
        
        let pagesToExtract = [];
        
        if (splitMode === 'all') {
            pagesToExtract = Array.from({ length: totalPages }, (_, i) => [i]);
        } else if (rangeInput) {
            pagesToExtract = parsePageRange(rangeInput, totalPages);
        } else {
            pagesToExtract = [Array.from({ length: totalPages }, (_, i) => i)];
        }
        
        const zip = new JSZip();
        
        for (let i = 0; i < pagesToExtract.length; i++) {
            const pages = pagesToExtract[i];
            const newPdf = await PDFDocument.create();
            const copiedPages = await newPdf.copyPages(pdf, pages);
            copiedPages.forEach((page) => newPdf.addPage(page));
            
            const pdfBytes = await newPdf.save();
            zip.file(`pages-${i + 1}.pdf`, pdfBytes);
            updateProgress(((i + 1) / pagesToExtract.length) * 100);
        }
        
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        saveAs(zipBlob, 'split-pages.zip');
        showToast('PDF split successfully!', 'success');
    } catch (error) {
        console.error('Split error:', error);
        showToast('Error splitting PDF: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

// Rotate PDF
async function rotatePDF() {
    if (state.files.length !== 1) {
        showToast('Please select exactly 1 PDF', 'error');
        return;
    }
    
    showLoading('Rotating PDF...', 0);
    
    try {
        const { PDFDocument, degrees } = PDFLib;
        const file = state.files[0];
        const arrayBuffer = await readFileAsArrayBuffer(file);
        const pdf = await PDFDocument.load(arrayBuffer);
        
        const angle = parseInt(document.querySelector('.rotate-option.active')?.dataset.angle || '90');
        const pagesInput = document.getElementById('rotate-pages')?.value;
        
        let pagesToRotate = pagesInput 
            ? parsePageRange(pagesInput, pdf.getPageCount()).flat()
            : Array.from({ length: pdf.getPageCount() }, (_, i) => i);
        
        const pages = pdf.getPages();
        pagesToRotate.forEach(pageIndex => {
            if (pages[pageIndex]) {
                const currentRotation = pages[pageIndex].getRotation().angle;
                pages[pageIndex].setRotation(degrees(currentRotation + angle));
            }
        });
        
        const pdfBytes = await pdf.save();
        downloadFile(pdfBytes, 'rotated.pdf', 'application/pdf');
        showToast('PDF rotated successfully!', 'success');
    } catch (error) {
        console.error('Rotate error:', error);
        showToast('Error rotating PDF: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

// PDF to Images
async function pdfToImages() {
    if (state.files.length !== 1) {
        showToast('Please select exactly 1 PDF', 'error');
        return;
    }
    
    showLoading('Converting to images...', 0);
    
    try {
        const file = state.files[0];
        const arrayBuffer = await readFileAsArrayBuffer(file);
        
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const zip = new JSZip();
        
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 2 });
            
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            
            await page.render({ canvasContext: ctx, viewport: viewport }).promise;
            
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
            zip.file(`page-${i}.png`, blob);
            updateProgress((i / pdf.numPages) * 100);
        }
        
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        saveAs(zipBlob, 'pdf-images.zip');
        showToast('PDF converted to images!', 'success');
    } catch (error) {
        console.error('PDF to images error:', error);
        showToast('Error converting PDF: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

// Images to PDF
async function imagesToPDF() {
    if (state.files.length === 0) {
        showToast('Please select at least 1 image', 'error');
        return;
    }
    
    showLoading('Converting images to PDF...', 0);
    
    try {
        const { jsPDF } = window.jspdf;
        const pageSize = document.getElementById('page-size')?.value || 'a4';
        const orientation = document.getElementById('orientation')?.value || 'portrait';
        
        let pdf;
        if (pageSize === 'fit') {
            const firstImage = state.files[0];
            const imgData = await readFileAsDataURL(firstImage);
            const img = new Image();
            await new Promise(resolve => { img.onload = resolve; img.src = imgData; });
            
            pdf = new jsPDF({
                orientation: img.width > img.height ? 'landscape' : 'portrait',
                unit: 'px',
                format: [img.width, img.height]
            });
            pdf.addImage(imgData, 'JPEG', 0, 0, img.width, img.height);
        } else {
            pdf = new jsPDF({ orientation, format: pageSize });
        }
        
        for (let i = 0; i < state.files.length; i++) {
            const file = state.files[i];
            const imgData = await readFileAsDataURL(file);
            
            if (i > 0) pdf.addPage();
            
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            
            pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight);
            updateProgress(((i + 1) / state.files.length) * 100);
        }
        
        pdf.save('images.pdf');
        showToast('Images converted to PDF!', 'success');
    } catch (error) {
        console.error('Images to PDF error:', error);
        showToast('Error converting images: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

// Extract Text from PDF
async function extractText() {
    if (state.files.length !== 1) {
        showToast('Please select exactly 1 PDF', 'error');
        return;
    }
    
    showLoading('Extracting text...', 0);
    
    try {
        const file = state.files[0];
        const arrayBuffer = await readFileAsArrayBuffer(file);
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        
        let fullText = '';
        
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += `--- Page ${i} ---\n\n${pageText}\n\n`;
            updateProgress((i / pdf.numPages) * 100);
        }
        
        const blob = new Blob([fullText], { type: 'text/plain' });
        saveAs(blob, 'extracted-text.txt');
        showToast('Text extracted successfully!', 'success');
    } catch (error) {
        console.error('Extract text error:', error);
        showToast('Error extracting text: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

// Add Watermark
async function addWatermark() {
    if (state.files.length !== 1) {
        showToast('Please select exactly 1 PDF', 'error');
        return;
    }
    
    showLoading('Adding watermark...', 0);
    
    try {
        const { PDFDocument, rgb, degrees } = PDFLib;
        const file = state.files[0];
        const arrayBuffer = await readFileAsArrayBuffer(file);
        const pdf = await PDFDocument.load(arrayBuffer);
        
        const text = document.getElementById('watermark-text')?.value || 'WATERMARK';
        const fontSize = parseInt(document.getElementById('watermark-size')?.value) || 48;
        const opacity = parseInt(document.getElementById('watermark-opacity')?.value) / 100 || 0.3;
        const rotation = parseInt(document.getElementById('watermark-rotation')?.value) || -45;
        const position = document.querySelector('.position-btn.active')?.dataset.pos || 'cc';
        
        const pages = pdf.getPages();
        
        pages.forEach((page, index) => {
            const { width, height } = page.getSize();
            let x, y;
            
            switch(position) {
                case 'tl': x = 50; y = height - 50; break;
                case 'tc': x = width / 2; y = height - 50; break;
                case 'tr': x = width - 50; y = height - 50; break;
                case 'cl': x = 50; y = height / 2; break;
                case 'cc': x = width / 2; y = height / 2; break;
                case 'cr': x = width - 50; y = height / 2; break;
                case 'bl': x = 50; y = 50; break;
                case 'bc': x = width / 2; y = 50; break;
                case 'br': x = width - 50; y = 50; break;
                default: x = width / 2; y = height / 2;
            }
            
            page.drawText(text, {
                x, y,
                size: fontSize,
                color: rgb(0.5, 0.5, 0.5),
                opacity,
                rotate: degrees(rotation),
                align: 'center'
            });
            
            updateProgress(((index + 1) / pages.length) * 100);
        });
        
        const pdfBytes = await pdf.save();
        downloadFile(pdfBytes, 'watermarked.pdf', 'application/pdf');
        showToast('Watermark added successfully!', 'success');
    } catch (error) {
        console.error('Watermark error:', error);
        showToast('Error adding watermark: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

// Protect PDF with Password
async function protectPDF() {
    if (state.files.length !== 1) {
        showToast('Please select exactly 1 PDF', 'error');
        return;
    }
    
    const userPassword = prompt('Enter user password:');
    if (!userPassword) return;
    
    const ownerPassword = prompt('Enter owner password (optional):') || userPassword;
    
    showLoading('Protecting PDF...', 0);
    
    try {
        const { PDFDocument } = PDFLib;
        const file = state.files[0];
        const arrayBuffer = await readFileAsArrayBuffer(file);
        const pdf = await PDFDocument.load(arrayBuffer);
        
        const pdfBytes = await pdf.save({
            userPassword,
            ownerPassword,
            permissions: {
                printing: 'highResolution',
                modifying: false,
                copying: false,
                annotating: false,
                fillingForms: false,
                contentAccessibility: false,
                documentAssembly: false
            }
        });
        
        downloadFile(pdfBytes, 'protected.pdf', 'application/pdf');
        showToast('PDF protected successfully!', 'success');
    } catch (error) {
        console.error('Protect error:', error);
        showToast('Error protecting PDF: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

// OCR PDF
async function performOCR() {
    if (state.files.length !== 1) {
        showToast('Please select exactly 1 PDF', 'error');
        return;
    }
    
    showLoading('Performing OCR...', 0);
    
    try {
        const file = state.files[0];
        const arrayBuffer = await readFileAsArrayBuffer(file);
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        
        const lang = document.getElementById('ocr-lang')?.value || 'eng';
        const outputFormat = document.querySelector('input[name="ocr-output"]:checked')?.value || 'text';
        
        let fullText = '';
        const worker = await Tesseract.createWorker(lang);
        
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 2 });
            
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            
            await page.render({ canvasContext: ctx, viewport: viewport }).promise;
            
            const { data: { text } } = await worker.recognize(canvas);
            fullText += `--- Page ${i} ---\n\n${text}\n\n`;
            updateProgress((i / pdf.numPages) * 100);
        }
        
        await worker.terminate();
        
        if (outputFormat === 'text') {
            const blob = new Blob([fullText], { type: 'text/plain' });
            saveAs(blob, 'ocr-text.txt');
        }
        
        showToast('OCR completed successfully!', 'success');
    } catch (error) {
        console.error('OCR error:', error);
        showToast('Error performing OCR: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

// Webpage to PDF
async function webpageToPDF() {
    showLoading('Converting to PDF...', 0);
    
    try {
        const mode = document.querySelector('input[name="web-mode"]:checked')?.value || 'html';
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();
        
        if (mode === 'html') {
            const htmlCode = document.getElementById('html-code')?.value || '<h1>Hello World</h1>';
            const sanitized = DOMPurify.sanitize(htmlCode);
            
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = sanitized;
            tempDiv.style.position = 'absolute';
            tempDiv.style.left = '-9999px';
            document.body.appendChild(tempDiv);
            
            const canvas = await html2canvas(tempDiv);
            const imgData = canvas.toDataURL('image/png');
            
            pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
            document.body.removeChild(tempDiv);
        } else {
            const canvas = await html2canvas(document.body);
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
        }
        
        pdf.save('webpage.pdf');
        showToast('Webpage converted to PDF!', 'success');
    } catch (error) {
        console.error('Webpage to PDF error:', error);
        showToast('Error converting webpage: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

// ==================== UTILITY FUNCTIONS ====================

function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function downloadFile(data, filename, mimeType) {
    const blob = new Blob([data], { type: mimeType });
    saveAs(blob, filename);
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function parsePageRange(rangeStr, totalPages) {
    const pages = [];
    const parts = rangeStr.split(',');
    
    parts.forEach(part => {
        part = part.trim();
        if (part.includes('-')) {
            const [start, end] = part.split('-').map(n => parseInt(n.trim()));
            for (let i = start; i <= end && i <= totalPages; i++) {
                pages.push([i - 1]);
            }
        } else {
            const pageNum = parseInt(part);
            if (pageNum <= totalPages) {
                pages.push([pageNum - 1]);
            }
        }
    });
    
    return pages.length ? pages : [Array.from({ length: totalPages }, (_, i) => i)];
}

// ==================== UI HELPERS ====================

function showLoading(text, initialProgress = 0) {
    const overlay = document.getElementById('loading-overlay');
    const loadingText = document.getElementById('loading-text');
    const progressBar = document.getElementById('progress-bar');
    
    loadingText.textContent = text;
    progressBar.style.width = `${initialProgress}%`;
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
}

function updateProgress(percent) {
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${percent}%`;
}

function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    
    const icons = {
        success: 'fa-check-circle text-green-500',
        error: 'fa-exclamation-circle text-red-500',
        warning: 'fa-exclamation-triangle text-yellow-500',
        info: 'fa-info-circle text-blue-500'
    };
    
    toast.className = `toast glass-panel rounded-xl p-4 flex items-center gap-3 shadow-2xl`;
    toast.innerHTML = `
        <i class="fas ${icons[type]} text-xl"></i>
        <span class="text-gray-700 dark:text-gray-200">${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ==================== FREQUENT TOOLS ====================

function addToFrequentTools(toolId) {
    const index = state.frequentTools.indexOf(toolId);
    if (index > -1) {
        state.frequentTools.splice(index, 1);
    }
    state.frequentTools.unshift(toolId);
    state.frequentTools = state.frequentTools.slice(0, 5);
    localStorage.setItem('frequentTools', JSON.stringify(state.frequentTools));
    updateFrequentDropdown();
}

function loadFrequentTools() {
    const saved = localStorage.getItem('frequentTools');
    if (saved) {
        state.frequentTools = JSON.parse(saved);
        updateFrequentDropdown();
    }
}

function updateFrequentDropdown() {
    const list = document.getElementById('frequent-list');
    if (!list) return;
    
    if (state.frequentTools.length === 0) {
        list.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 p-2">No frequent tools yet</p>';
        return;
    }
    
    list.innerHTML = state.frequentTools.map(toolId => {
        const tool = tools.find(t => t.id === toolId);
        return `
            <button class="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-white/10 flex items-center gap-2" onclick="openToolModal(tools.find(t => t.id === '${toolId}'))">
                <i class="fas fa-star text-yellow-500 text-xs"></i>
                ${tool.name}
            </button>
        `;
    }).join('');
}

// ==================== EVENT LISTENERS ====================

function initEventListeners() {
    // Theme toggle
    document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
    
    // Modal close
    document.getElementById('modal-close')?.addEventListener('click', closeToolModal);
    document.getElementById('tool-modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'tool-modal') closeToolModal();
    });
    
    // Sidebar toggle
    document.getElementById('sidebar-toggle')?.addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('-translate-x-full');
    });
    
    // Frequent dropdown
    document.getElementById('frequent-toggle')?.addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('frequent-dropdown').classList.toggle('hidden');
    });
    
    document.addEventListener('click', () => {
        document.getElementById('frequent-dropdown')?.classList.add('hidden');
    });
    
    // FAB
    document.getElementById('fab')?.addEventListener('click', () => {
        document.getElementById('frequent-dropdown').classList.toggle('hidden');
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeToolModal();
    });
    
    // Process buttons based on tool
    document.addEventListener('click', async (e) => {
        const target = e.target.closest('button');
        if (!target || !state.currentTool) return;
        
        const handlers = {
            'merge-btn': mergePDFs,
            'split-btn': splitPDF,
            'rotate-btn': rotatePDF,
            'compress-btn': async () => { showToast('Compression is experimental. Try reducing image quality manually.', 'info'); },
            'ocr-btn': performOCR,
            'convert-images-btn': imagesToPDF,
            'add-watermark-btn': addWatermark,
            'protect-btn': protectPDF,
            'convert-web-btn': webpageToPDF,
            'apply-signature': async () => { showToast('Signature feature coming soon!', 'info'); }
        };
        
        const handlerId = target.id;
        if (handlers[handlerId]) {
            await handlers[handlerId]();
        }
    });
    
    // Rotation option selection
    document.addEventListener('click', (e) => {
        if (e.target.closest('.rotate-option')) {
            document.querySelectorAll('.rotate-option').forEach(btn => btn.classList.remove('active'));
            e.target.closest('.rotate-option').classList.add('active');
        }
    });
    
    // Position button selection
    document.addEventListener('click', (e) => {
        if (e.target.closest('.position-btn')) {
            document.querySelectorAll('.position-btn').forEach(btn => btn.classList.remove('active'));
            e.target.closest('.position-btn').classList.add('active');
        }
    });
}

// ==================== TILT EFFECT ====================

function initTiltEffect() {
    const tiltElement = document.querySelector('.tilt-element');
    if (!tiltElement) return;
    
    tiltElement.addEventListener('mousemove', (e) => {
        const rect = tiltElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        tiltElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    tiltElement.addEventListener('mouseleave', () => {
        tiltElement.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

// ==================== PDF.js Worker Setup ====================
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// Export for global access
window.tools = tools;
window.openToolModal = openToolModal;
window.removeFile = removeFile;
window.toggleWebMode = () => {
    const mode = document.querySelector('input[name="web-mode"]:checked')?.value;
    document.getElementById('html-input-mode').classList.toggle('hidden', mode === 'capture');
    document.getElementById('capture-mode').classList.toggle('hidden', mode === 'html');
};
