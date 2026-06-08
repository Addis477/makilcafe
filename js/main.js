/* ============================================
   ማኪል ማዕድ - MAKIL MEAD
   የፍስክ ምግብ ቁርስ | Premium Ethiopian Restaurant
   Complete JavaScript with All Functionality
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== PAGE TRANSITIONS ==========
    const transitionOverlay = document.querySelector('.page-transition');
    
    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href !== '#' && !href.startsWith('http') && !href.startsWith('https') && !href.startsWith('tel') && !href.startsWith('mailto') && !href.startsWith('javascript')) {
            if (!link.classList.contains('whatsapp-float')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetUrl = this.getAttribute('href');
                    if (transitionOverlay) {
                        transitionOverlay.classList.add('active');
                        setTimeout(() => { window.location.href = targetUrl; }, 500);
                    } else {
                        window.location.href = targetUrl;
                    }
                });
            }
        }
    });
    
    if (transitionOverlay) {
        setTimeout(() => { transitionOverlay.classList.remove('active'); }, 100);
    }
    
    // ========== AOS INITIALIZATION ==========
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true, offset: 100, easing: 'ease-in-out' });
    }
    
    // ========== MOBILE SIDEBAR ==========
    const mobileSidebar = document.getElementById('mobileSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    
    function openSidebar() {
        if (mobileSidebar) mobileSidebar.classList.add('open');
        if (sidebarOverlay) sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeSidebar() {
        if (mobileSidebar) mobileSidebar.classList.remove('open');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openSidebar);
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);
    
    document.querySelectorAll('.sidebar-nav a, .sidebar-order-btn').forEach(link => {
        link.addEventListener('click', closeSidebar);
    });
    
    // ========== TOAST NOTIFICATION ==========
    window.showToast = function(message, duration = 2500) {
        let toast = document.getElementById('toastMsg');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toastMsg';
            toast.className = 'toast-msg';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), duration);
    };
    
    // ========== ACTIVE NAVIGATION ==========
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.desktop-nav a, .sidebar-nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // ========== CONTACT FORM ==========
    const sendContactBtn = document.getElementById('sendContactBtn');
    if (sendContactBtn) {
        sendContactBtn.addEventListener('click', function() {
            const name = document.getElementById('contactName')?.value.trim();
            const email = document.getElementById('contactEmail')?.value.trim();
            const message = document.getElementById('contactMsg')?.value.trim();
            
            if (!name || !email || !message) {
                showToast('⚠️ እባክዎ ሁሉንም መረጃ ይሙሉ');
                return;
            }
            
            if (!email.includes('@')) {
                showToast('⚠️ እባክዎ ትክክለኛ ኢሜይል ያስገቡ');
                return;
            }
            
            showToast('✓ መልዕክትዎ ተልኳል! በቅርቡ እንመልሳለን።');
            
            if (document.getElementById('contactName')) document.getElementById('contactName').value = '';
            if (document.getElementById('contactEmail')) document.getElementById('contactEmail').value = '';
            if (document.getElementById('contactMsg')) document.getElementById('contactMsg').value = '';
        });
    }
    
    // ========== CATERING INQUIRY ==========
    const submitCateringBtn = document.getElementById('submitCateringBtn');
    if (submitCateringBtn) {
        submitCateringBtn.addEventListener('click', function() {
            const name = document.getElementById('catName')?.value.trim();
            if (!name) {
                showToast('⚠️ እባክዎ ስምዎን ያስገቡ');
                return;
            }
            showToast('✓ ጥቅስዎ ተልኳል! በቅርቡ እናገኝዎታለን።');
            
            if (document.getElementById('catName')) document.getElementById('catName').value = '';
            if (document.getElementById('catEmail')) document.getElementById('catEmail').value = '';
            if (document.getElementById('catPhone')) document.getElementById('catPhone').value = '';
            if (document.getElementById('catGuests')) document.getElementById('catGuests').value = '';
            if (document.getElementById('catMsg')) document.getElementById('catMsg').value = '';
        });
    }
    
    // ========== GIFT CARD ==========
    const buyGiftBtn = document.getElementById('buyGiftBtn');
    if (buyGiftBtn) {
        buyGiftBtn.addEventListener('click', function() {
            const email = document.getElementById('giftEmail')?.value.trim();
            if (!email) {
                showToast('⚠️ እባክዎ የተቀባዩን ኢሜይል ያስገቡ');
                return;
            }
            showToast('🎁 Gift card purchased! Check your email for details.');
            if (document.getElementById('giftEmail')) document.getElementById('giftEmail').value = '';
            if (document.getElementById('giftName')) document.getElementById('giftName').value = '';
            if (document.getElementById('giftMessage')) document.getElementById('giftMessage').value = '';
        });
    }
    
    console.log('ማኪል ማዕድ - Website loaded successfully!');
});

// ========== CART FUNCTIONALITY ==========
let cart = [];
const FREE_DELIVERY = 1000;

window.updateCart = function() {
    const cartDiv = document.getElementById('cartItems');
    const totalSpan = document.getElementById('cartTotal');
    const countSpan = document.getElementById('cartCount');
    if (!cartDiv) return;
    if (cart.length === 0) {
        cartDiv.innerHTML = '<div class="empty-cart">🛒 ጋሪዎ ባዶ ነው</div>';
        if (totalSpan) totalSpan.textContent = 'ETB 0';
        if (countSpan) countSpan.textContent = '(0 items)';
        return;
    }
    let html = '', total = 0;
    cart.forEach((item, idx) => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        html += `
            <div class="cart-item">
                <span class="item-name"><strong>${escapeHtml(item.name)}</strong></span>
                <div class="cart-controls">
                    <button class="qty-btn" onclick="window.changeQty(${idx}, -1)">−</button>
                    <span class="item-qty">${item.qty}</span>
                    <button class="qty-btn" onclick="window.changeQty(${idx}, 1)">+</button>
                    <button class="remove-btn" onclick="window.removeItem(${idx})">🗑️</button>
                </div>
                <span class="item-total-price">ETB ${itemTotal}</span>
            </div>
        `;
    });
    cartDiv.innerHTML = html;
    if (totalSpan) totalSpan.textContent = `ETB ${total}`;
    if (countSpan) countSpan.textContent = `(${cart.reduce((s, i) => s + i.qty, 0)} items)`;
    const deliveryNote = document.querySelector('.delivery-note');
    if (deliveryNote) {
        if (total >= FREE_DELIVERY) {
            deliveryNote.innerHTML = '✅ ነጻ ማድረስ!';
            deliveryNote.style.color = '#4CAF50';
        } else {
            deliveryNote.innerHTML = `🚚 ከብር ${FREE_DELIVERY - total} ተጨማሪ ለነጻ ማድረስ`;
            deliveryNote.style.color = '#8B6340';
        }
    }
};

window.changeQty = function(idx, delta) {
    const newQty = cart[idx].qty + delta;
    if (newQty <= 0) {
        cart.splice(idx, 1);
    } else {
        cart[idx].qty = newQty;
    }
    window.updateCart();
};

window.removeItem = function(idx) {
    cart.splice(idx, 1);
    window.updateCart();
};

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemDiv = this.closest('.shop-item');
            if (itemDiv) {
                const name = itemDiv.getAttribute('data-name');
                const price = parseInt(itemDiv.getAttribute('data-price'));
                const existing = cart.find(i => i.name === name);
                if (existing) existing.qty++;
                else cart.push({ name, price, qty: 1 });
                window.updateCart();
                showToast(`✓ ${name} ወደ ጋሪ ተጨምሯል`);
            }
        });
    });
    
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const name = document.getElementById('orderName')?.value.trim();
            const phone = document.getElementById('orderPhone')?.value.trim();
            const address = document.getElementById('orderAddress')?.value.trim();
            if (!name || !phone || !address) {
                showToast('⚠️ እባክዎ ሁሉንም መረጃ ይሙሉ');
                return;
            }
            if (cart.length === 0) {
                showToast('⚠️ እባክዎ ምግብ ይጨምሩ');
                return;
            }
            const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
            showToast(`✅ እናመሰግናለን ${name}! ትእዛዝዎ (ብር ${total}) ተልኳል።`);
            cart = [];
            window.updateCart();
            if (document.getElementById('orderName')) document.getElementById('orderName').value = '';
            if (document.getElementById('orderPhone')) document.getElementById('orderPhone').value = '';
            if (document.getElementById('orderEmail')) document.getElementById('orderEmail').value = '';
            if (document.getElementById('orderAddress')) document.getElementById('orderAddress').value = '';
            if (document.getElementById('specialInstructions')) document.getElementById('specialInstructions').value = '';
        });
    }
    
    if (document.getElementById('cartItems')) {
        window.updateCart();
    }
});
