/*
Here is change and reason: Expanded the original cart script into a small page-aware RexmoBd demonstration layer so the existing shopping flow can persist cart, customer, and order data across the new interconnected pages without introducing a database.
*/

document.addEventListener('DOMContentLoaded', () => {
  const STORAGE = {
    users: 'rexmobd_users',
    currentUser: 'rexmobd_current_user',
    cart: 'rexmobd_cart',
    orders: 'rexmobd_orders',
    products: 'rexmobd_products',
    newsletter: 'rexmobd_newsletter'
  };

  const demoProducts = [
    {id:'men-1',name:'Classic Men’s Overshirt',category:'Men',gender:'Men',price:42,image:'images/Newimages/Men/Men1.jpg',description:'A clean everyday overshirt with a versatile modern fit.',availability:true},
    {id:'men-2',name:'Modern Men’s Casual Look',category:'Men',gender:'Men',price:48,image:'images/Newimages/Men/Men2.jpg',description:'An easy-to-style casual outfit for daily wear.',availability:true},
    {id:'men-3',name:'Men’s Seasonal Jacket',category:'Men',gender:'Men',price:65,image:'images/Newimages/Men/Men3.jpg',description:'A polished seasonal layer designed for comfort.',availability:true},
    {id:'men-4',name:'Men’s Smart Casual Set',category:'Men',gender:'Men',price:58,image:'images/Newimages/Men/Men4.jpg',description:'A refined combination for relaxed smart-casual days.',availability:true},
    {id:'women-1',name:'Women’s Everyday Collection',category:'Women',gender:'Women',price:45,image:'images/Newimages/Women/Women1.jpg',description:'A comfortable seasonal piece with an elegant silhouette.',availability:true},
    {id:'women-2',name:'Women’s Contemporary Outfit',category:'Women',gender:'Women',price:52,image:'images/Newimages/Women/Women2.jpg',description:'A contemporary look made for effortless styling.',availability:true},
    {id:'women-3',name:'Women’s Statement Look',category:'Women',gender:'Women',price:60,image:'images/Newimages/Women/Women3.jpg',description:'A distinctive fashion piece for modern wardrobes.',availability:true},
    {id:'women-4',name:'Women’s Weekend Style',category:'Women',gender:'Women',price:49,image:'images/Newimages/Women/Women4.jpg',description:'A relaxed weekend option with a polished finish.',availability:true},
    {id:'kids-1',name:'Kids Combo Outfit',category:'Kids',gender:'Kids',price:28,image:'images/Newimages/kids/kids combo.jpg',description:'A playful outfit combination for everyday adventures.',availability:true},
    {id:'kids-2',name:'Kids Everyday T-Shirt',category:'Kids',gender:'Kids',price:18,image:'images/Newimages/kids/Kids tshirt.jpg',description:'A simple and comfortable t-shirt for active days.',availability:true},
    {id:'kids-3',name:'Kids Casual Set',category:'Kids',gender:'Kids',price:25,image:'images/Newimages/kids/kids2.jpg',description:'A practical casual set designed for easy movement.',availability:true},
    {id:'kids-4',name:'Kids Trend Look',category:'Kids',gender:'Kids',price:27,image:'images/Newimages/kids/kids3.jpg',description:'A cheerful style for school days and outings.',availability:true},
    {id:'kids-5',name:'Kids Comfort Wear',category:'Kids',gender:'Kids',price:24,image:'images/Newimages/kids/kids4.jpg',description:'Comfort-focused clothing for everyday play.',availability:true},
    {id:'kids-6',name:'Kids Seasonal Pick',category:'Kids',gender:'Kids',price:30,image:'images/Newimages/kids/kids5.jpg',description:'A seasonal favourite for a fresh young wardrobe.',availability:true},
    {id:'menac-1',name:'Men’s Bracelet Bundle',category:'Accessories',gender:'Men',accessoryGender:'Men',price:16,image:'images/Newimages/Accessories/MenAc/Bracelet Bundle.jpg',description:'A coordinated bracelet bundle to complete casual outfits.',availability:true},
    {id:'menac-2',name:'Men’s Classic Bracelet',category:'Accessories',gender:'Men',accessoryGender:'Men',price:12,image:'images/Newimages/Accessories/MenAc/Male Bracelet.jpg',description:'A simple accessory with a clean everyday look.',availability:true},
    {id:'menac-3',name:'Men’s Jewellery Combo',category:'Accessories',gender:'Men',accessoryGender:'Men',price:22,image:'images/Newimages/Accessories/MenAc/Men Jewelary Combo.jpg',description:'A versatile jewellery combination for modern styling.',availability:true},
    {id:'menac-4',name:'Men’s Outfit Combo',category:'Accessories',gender:'Men',accessoryGender:'Men',price:25,image:'images/Newimages/Accessories/MenAc/Outfit Combo.jpg',description:'A coordinated accessory set for a finished outfit.',availability:true},
    {id:'menac-5',name:'Men’s Sunglasses',category:'Accessories',gender:'Men',accessoryGender:'Men',price:20,image:'images/Newimages/Accessories/MenAc/Sunglasses.jpg',description:'A timeless pair of sunglasses for everyday wear.',availability:true},
    {id:'menac-6',name:'Men’s Classic Watch',category:'Accessories',gender:'Men',accessoryGender:'Men',price:35,image:'images/Newimages/Accessories/MenAc/Watch.jpg',description:'A practical watch that adds a refined finishing touch.',availability:true},
    {id:'womenac-1',name:'Women’s Bracelet',category:'Accessories',gender:'Women',accessoryGender:'Women',price:14,image:'images/Newimages/Accessories/WomenAc/Bracelet.jpg',description:'A delicate accessory for everyday styling.',availability:true},
    {id:'womenac-2',name:'Women’s Accessory Combo',category:'Accessories',gender:'Women',accessoryGender:'Women',price:24,image:'images/Newimages/Accessories/WomenAc/Combo.jpg',description:'A coordinated selection for a polished look.',availability:true},
    {id:'womenac-3',name:'Women’s Hand Bracelet Combo',category:'Accessories',gender:'Women',accessoryGender:'Women',price:19,image:'images/Newimages/Accessories/WomenAc/Hand Braclet Combo.jpg',description:'A layered accessory combination with an elegant feel.',availability:true},
    {id:'womenac-4',name:'Women’s Leather Bag',category:'Accessories',gender:'Women',accessoryGender:'Women',price:42,image:'images/Newimages/Accessories/WomenAc/Lether Bag.jpg',description:'A versatile bag for daily essentials and outings.',availability:true},
    {id:'womenac-5',name:'Women’s Necklace Combo',category:'Accessories',gender:'Women',accessoryGender:'Women',price:26,image:'images/Newimages/Accessories/WomenAc/Necklace Combo.jpg',description:'A coordinated necklace selection for special looks.',availability:true},
    {id:'womenac-6',name:'Women’s Classic Necklace',category:'Accessories',gender:'Women',accessoryGender:'Women',price:18,image:'images/Newimages/Accessories/WomenAc/Necklace.jpg',description:'A simple necklace designed for flexible styling.',availability:true},
    {id:'womenac-7',name:'Women’s Fashion Watch',category:'Accessories',gender:'Women',accessoryGender:'Women',price:36,image:'images/Newimages/Accessories/WomenAc/Watch.jpg',description:'A fashionable watch that pairs easily with seasonal outfits.',availability:true}
  ];

  const articles = [
    {
      title:'NEW TREND 2026',
      text:'Discover seasonal styles that combine comfortable fabrics, clean silhouettes, and practical pieces for everyday wear. RexmoBd keeps the collection focused on clothing and accessories that are easy to mix and match.'
    },
    {
      title:'STYLE UPDATE',
      text:'Refresh your wardrobe with versatile essentials. From relaxed casual pieces to polished accessories, the latest RexmoBd selections are designed to make daily styling simple without losing personality.'
    },
    {
      title:'ACCESSORY EDIT',
      text:'Small details can complete an outfit. Explore separate men’s and women’s accessory selections, including watches, bracelets, bags, necklaces, and sunglasses.'
    }
  ];

  const $ = (selector, scope=document) => scope.querySelector(selector);
  const $$ = (selector, scope=document) => [...scope.querySelectorAll(selector)];

  function read(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  }
  function write(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
  function currentUser() { return read(STORAGE.currentUser, null); }

  function escapeHtml(value='') {
    return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
  }

  function notify(message) {
    let box = $('#site-message');
    if (!box) {
      box = document.createElement('div');
      box.id = 'site-message';
      box.className = 'site-message';
      document.body.appendChild(box);
    }
    box.textContent = message;
    box.classList.add('show');
    clearTimeout(window.__rexmoNotify);
    window.__rexmoNotify = setTimeout(() => box.classList.remove('show'), 2800);
  }

  // Here is change and reason: Seed the supplied Newimages catalogue once so all provided clothing and accessory images are used without a database.
  function ensureProducts() {
    if (!localStorage.getItem(STORAGE.products)) write(STORAGE.products, demoProducts);
    return read(STORAGE.products, demoProducts);
  }

  function getProducts() { return read(STORAGE.products, demoProducts); }

  // Here is change and reason: Preserved the original cart concept while adding localStorage persistence, product metadata, quantity controls, and order creation.
  function getCart() { return read(STORAGE.cart, []); }
  function saveCart(cart) { write(STORAGE.cart, cart); renderCart(); }

  function addToCart(product) {
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);
    if (existing) existing.quantity += 1;
    else cart.push({id:product.id, name:product.name, price:Number(product.price), quantity:1, image:product.image, category:product.category});
    saveCart(cart);
    notify(`${product.name} added to your cart.`);
  }

  function addCardToCart(card) {
    const product = {
      id: card.dataset.productId || `home-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: $('.title', card)?.textContent.trim() || 'RexmoBd Product',
      price: Number($('.amount', card)?.textContent.replace(/[^0-9.]/g,'') || 0),
      image: $('img', card)?.getAttribute('src') || '',
      category: card.dataset.productCategory || 'Fashion'
    };
    addToCart(product);
  }

  function renderCart() {
    const cart = getCart();
    const list = $('#cart-items-list');
    const total = $('#cart-total-price');
    if (!list || !total) return;
    list.innerHTML = '';
    let amount = 0;
    if (!cart.length) {
      list.innerHTML = '<p style="text-align:center;color:#777;">Your cart is empty.</p>';
    } else {
      cart.forEach((item,index) => {
        const itemTotal = item.price * item.quantity;
        amount += itemTotal;
        const div = document.createElement('div');
        div.style.cssText = 'display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:15px;background:#f4f4f4;padding:12px;border-radius:8px;border-left:5px solid #e6303d;';
        div.innerHTML = `
          <div style="flex-grow:1;">
            <h4 style="margin:0;font-size:.95rem;color:#333;font-weight:700;">${escapeHtml(item.name)}</h4>
            <small style="color:#777;">${escapeHtml(item.category || 'Fashion')}</small>
            <div style="display:flex;align-items:center;margin-top:10px;gap:12px;">
              <button class="qty-btn minus" data-index="${index}" style="width:30px;height:30px;background:#333;color:white;border:none;cursor:pointer;font-weight:bold;border-radius:4px;">-</button>
              <span style="font-weight:700;color:#333;min-width:20px;text-align:center;">${item.quantity}</span>
              <button class="qty-btn plus" data-index="${index}" style="width:30px;height:30px;background:#e6303d;color:white;border:none;cursor:pointer;font-weight:bold;border-radius:4px;">+</button>
            </div>
          </div>
          <div style="font-weight:700;color:#e6303d;">$${itemTotal.toFixed(2)}</div>
        `;
        list.appendChild(div);
      });
    }
    total.textContent = `$${amount.toFixed(2)}`;
    $$('.qty-btn', list).forEach(btn => btn.addEventListener('click', () => {
      const index = Number(btn.dataset.index);
      const next = getCart();
      if (!next[index]) return;
      if (btn.classList.contains('plus')) next[index].quantity += 1;
      else if (next[index].quantity > 1) next[index].quantity -= 1;
      else next.splice(index,1);
      saveCart(next);
    }));
  }

  function setupCart() {
    if (!$('#cart-sidebar-menu')) {
      const sidebar = document.createElement('div');
      sidebar.id = 'cart-sidebar-menu';
      sidebar.style.cssText = 'position:fixed;top:0;right:-400px;width:min(350px,92vw);height:100%;background:#fff;box-shadow:-5px 0 15px rgba(0,0,0,.1);z-index:1000;transition:.4s ease-in-out;padding:20px;display:flex;flex-direction:column;font-family:Poppins,serif;';
      sidebar.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #e6303d;padding-bottom:15px;">
          <h2 style="font-size:1.5rem;margin:0;">Your Cart</h2>
          <button id="close-cart" style="background:none;border:none;font-size:2rem;cursor:pointer;color:#333;">&times;</button>
        </div>
        <div id="cart-items-list" style="flex-grow:1;overflow-y:auto;margin-top:20px;"></div>
        <div style="border-top:1px solid #eee;padding-top:20px;">
          <div style="display:flex;justify-content:space-between;font-weight:600;font-size:1.2rem;margin-bottom:20px;">
            <span>Total:</span><span id="cart-total-price">$0.00</span>
          </div>
          <button id="checkout-btn" style="width:100%;background:#e6303d;color:white;border:none;padding:12px;font-weight:600;cursor:pointer;text-transform:uppercase;margin-bottom:10px;">Checkout Now</button>
          <button id="cancel-cart" style="width:100%;background:#333;color:white;border:none;padding:12px;font-weight:600;cursor:pointer;text-transform:uppercase;">Clear Cart</button>
        </div>`;
      document.body.appendChild(sidebar);
      $('#close-cart').addEventListener('click', () => sidebar.style.right='-400px');
      $('#cancel-cart').addEventListener('click', () => {
        if (getCart().length && confirm('Are you sure you want to clear your cart?')) {
          saveCart([]); sidebar.style.right='-400px';
        }
      });
      $('#checkout-btn').addEventListener('click', checkoutCart);
    }
    const openCart = () => { renderCart(); $('#cart-sidebar-menu').style.right='0'; };
    $('#cart-trigger')?.addEventListener('click', e => { e.preventDefault(); openCart(); });
    $('#footer-cart-link')?.addEventListener('click', e => { e.preventDefault(); openCart(); });
    $$('.add-to-cart').forEach(btn => btn.addEventListener('click', e => {
      const card=e.currentTarget.closest('.card');
      if (card) addCardToCart(card);
    }));
    renderCart();
  }

  function checkoutCart() {
    const cart = getCart();
    if (!cart.length) { notify('Your cart is empty. Add an item before checkout.'); return; }
    const user = currentUser();
    if (!user) {
      sessionStorage.setItem('rexmobd_return_after_login','orders.html');
      notify('Please log in before completing your order.');
      setTimeout(() => location.href='login.html', 700);
      return;
    }
    const orders = read(STORAGE.orders, []);
    const now = new Date().toISOString();
    cart.forEach(item => orders.push({
      id:`ORD-${Date.now()}-${Math.random().toString(16).slice(2,7)}`,
      customer:user.name,
      email:user.email,
      productId:item.id,
      product:item.name,
      image:item.image,
      price:item.price,
      quantity:item.quantity,
      date:now,
      status:'Ordered'
    }));
    write(STORAGE.orders, orders);
    saveCart([]);
    $('#cart-sidebar-menu').style.right='-400px';
    notify('Your order has been created successfully.');
    setTimeout(() => location.href='orders.html', 700);
  }

  // Here is change and reason: Added the required registration and login validation using localStorage as a clearly labelled browser-side demonstration instead of pretending it is secure database authentication.
  function registerUser(name,email,password,confirmPassword,messageEl) {
    name=name.trim(); email=email.trim().toLowerCase();
    if (!name || !email || !password || !confirmPassword) return setFormMessage(messageEl,'Please complete every registration field.','error');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setFormMessage(messageEl,'Please enter a valid email address.','error');
    if (password.length < 6) return setFormMessage(messageEl,'Password must be at least 6 characters.','error');
    if (password !== confirmPassword) return setFormMessage(messageEl,'Passwords do not match.','error');
    const users=read(STORAGE.users,[]);
    if (users.some(u=>u.email===email)) return setFormMessage(messageEl,'An account with this email already exists.','error');
    users.push({name,email,password});
    write(STORAGE.users,users);
    write(STORAGE.currentUser,{name,email});
    setFormMessage(messageEl,'Registration successful. You are now logged in.','success');
    syncUserDisplay();
    setTimeout(() => {
      const target=sessionStorage.getItem('rexmobd_return_after_login') || 'index.html';
      sessionStorage.removeItem('rexmobd_return_after_login');
      location.href=target;
    },700);
  }

  function loginUser(email,password,messageEl) {
    email=email.trim().toLowerCase();
    const users=read(STORAGE.users,[]);
    const user=users.find(u=>u.email===email && u.password===password);
    if (!user) return setFormMessage(messageEl,'Email or password is incorrect. Register first if you do not have an account.','error');
    write(STORAGE.currentUser,{name:user.name,email:user.email});
    // Here is change and reason: Send the validated login to the small PHP endpoint so the project demonstrates PHP session initialization without any database connection.
    fetch('login.php',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},credentials:'same-origin',body:new URLSearchParams({email:user.email,name:user.name,password:'client-validated-demo'})}).catch(()=>{});
    setFormMessage(messageEl,'Login successful.','success');
    syncUserDisplay();
    setTimeout(() => {
      const target=sessionStorage.getItem('rexmobd_return_after_login') || 'index.html';
      sessionStorage.removeItem('rexmobd_return_after_login');
      location.href=target;
    },500);
  }

  function setFormMessage(el,text,type) {
    if (!el) { notify(text); return; }
    el.textContent=text; el.className=`form-message ${type}`;
  }

  function setupAuth() {
    const returnTarget = new URLSearchParams(location.search).get('return');
    if (returnTarget) sessionStorage.setItem('rexmobd_return_after_login', returnTarget);
    const form=$('#login-form');
    if (form) form.addEventListener('submit',e=>{
      e.preventDefault();
      loginUser($('#login-email').value,$('#login-password').value,$('#login-message'));
    });
    const reg=$('#registration-form');
    if (reg) reg.addEventListener('submit',e=>{
      e.preventDefault();
      registerUser($('#register-name').value,$('#register-email').value,$('#register-password').value,$('#register-confirm').value,$('#register-message'));
    });
    const signup=$('#signup-form');
    if (signup) signup.addEventListener('submit',e=>{
      e.preventDefault();
      registerUser($('#signup-name').value,$('#signup-email').value,$('#signup-password').value,$('#signup-confirm').value,$('#signup-message'));
    });
    $('#logout-btn')?.addEventListener('click',logout);
  }

  function logout() {
    localStorage.removeItem(STORAGE.currentUser);
    fetch('logout.php',{credentials:'same-origin'}).catch(()=>{});
    notify('You have been logged out.');
    setTimeout(()=>location.href='index.html',500);
  }

  function syncUserDisplay() {
    const user=currentUser();
    const target=$('#account-status');
    if (target) target.innerHTML=user ? `Signed in as <strong>${escapeHtml(user.name)}</strong> · <button type="button" id="logout-btn" class="btn-light">Logout</button>` : 'Not signed in';
    $('#logout-btn')?.addEventListener('click',logout);
  }

  function setupNavigation() {
    $('#hamburger-toggle')?.addEventListener('click',e=>{
      e.preventDefault(); $('.navlist')?.classList.toggle('navlist-active');
    });
    $$('.navlist .link').forEach(link=>link.addEventListener('click',()=>$('.navlist')?.classList.remove('navlist-active')));
    $$('[data-action="shop"]').forEach(btn=>btn.addEventListener('click',()=>location.href='shop.html'));
    $$('[data-category]').forEach(btn=>btn.addEventListener('click',()=>{
      sessionStorage.setItem('rexmobd_shop_category',btn.dataset.category);
      location.href='shop.html';
    }));
    $('#search-trigger')?.addEventListener('click',e=>{
      e.preventDefault(); sessionStorage.setItem('rexmobd_focus_search','1'); location.href='shop.html';
    });
  }

  function setupNewsletter() {
    const form=$('#newsletter-form');
    if (!form) return;
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const email=$('#email').value.trim().toLowerCase();
      const msg=$('#newsletter-message');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setFormMessage(msg,'Please enter a valid email address.','error');
      const list=read(STORAGE.newsletter,[]);
      if (!list.includes(email)) list.push(email);
      write(STORAGE.newsletter,list);
      setFormMessage(msg,'Thanks for subscribing to RexmoBd updates.','success');
      form.reset();
    });
  }

  function setupArticles() {
    $$('.blog-link').forEach(link=>link.addEventListener('click',()=>{
      const article=articles[Number(link.dataset.article)] || articles[0];
      const modal=document.createElement('div');
      modal.className='modal article-modal';
      modal.style.display='flex';
      modal.innerHTML=`<div class="modal-content"><span class="close-modal">&times;</span><h2>${escapeHtml(article.title)}</h2><p>${escapeHtml(article.text)}</p></div>`;
      document.body.appendChild(modal);
      const close=()=>modal.remove();
      $('.close-modal',modal).addEventListener('click',close);
      modal.addEventListener('click',e=>{if(e.target===modal) close();});
    }));
  }

  function setupShop() {
    const grid=$('#shop-grid');
    if (!grid) return;
    ensureProducts();
    let category=sessionStorage.getItem('rexmobd_shop_category') || 'All';
    sessionStorage.removeItem('rexmobd_shop_category');
    let accessoryGender='All';
    const search=$('#product-search');
    if (sessionStorage.getItem('rexmobd_focus_search')==='1') {
      sessionStorage.removeItem('rexmobd_focus_search');
      setTimeout(()=>search?.focus(),100);
    }
    function render() {
      const q=(search?.value || '').trim().toLowerCase();
      let products=getProducts().filter(p=>p.availability!==false);
      if(category!=='All') products=products.filter(p=>p.category===category);
      if(category==='Accessories' && accessoryGender!=='All') products=products.filter(p=>p.accessoryGender===accessoryGender);
      if(q) products=products.filter(p=>`${p.name} ${p.category} ${p.gender} ${p.description}`.toLowerCase().includes(q));
      grid.innerHTML=products.length ? products.map(p=>`
        <article class="card shop-card">
          <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}">
          <div class="card-content">
            <p class="title">${escapeHtml(p.name)}</p>
            <p class="product-meta">${escapeHtml(p.category)} · ${escapeHtml(p.gender || '')}</p>
            <div class="price"><span class="amount">$${Number(p.price).toFixed(2)}</span></div>
            <button type="button" class="add-to-cart" data-product-id="${escapeHtml(p.id)}">Add to Cart / Reserve</button>
          </div>
        </article>`).join('') : '<div class="empty-state"><h3>No products found</h3><p>Try another category or search term.</p></div>';
      $$('.add-to-cart',grid).forEach(btn=>btn.addEventListener('click',()=>{
        const product=getProducts().find(p=>p.id===btn.dataset.productId);
        if(product) addToCart(product);
      }));
      $$('.filter-btn').forEach(btn=>btn.classList.toggle('active',btn.dataset.category===category));
      $('#accessory-tabs')?.classList.toggle('visible',category==='Accessories');
    }
    $$('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{category=btn.dataset.category;accessoryGender='All';render();}));
    $$('.accessory-btn').forEach(btn=>btn.addEventListener('click',()=>{accessoryGender=btn.dataset.gender;render();}));
    search?.addEventListener('input',render);
    render();
  }

  function setupOrders() {
    const list=$('#orders-list');
    if (!list) return;
    const user=currentUser();
    if (!user) {
      list.innerHTML='<div class="content-card"><h2>Please log in to view your orders.</h2><p>Customer orders are linked to the currently signed-in account.</p><div class="form-actions"><button type="button" id="orders-login">Go to Login</button></div></div>';
      $('#orders-login').addEventListener('click',()=>location.href='login.html?return=orders.html');
      return;
    }
    function render() {
      const orders=read(STORAGE.orders,[]).filter(o=>o.email===user.email);
      if (!orders.length) {
        list.innerHTML='<div class="content-card empty-state"><h3>You have no active orders yet.</h3><p>Explore our latest collection to find something you like.</p><div class="form-actions" style="justify-content:center;"><button type="button" id="orders-shop">Explore Collection</button></div></div>';
        $('#orders-shop')?.addEventListener('click',()=>location.href='shop.html');
        return;
      }
      list.innerHTML=orders.map(o=>`
        <article class="order-item">
          <img src="${escapeHtml(o.image)}" alt="${escapeHtml(o.product)}">
          <div>
            <h3>${escapeHtml(o.product)}</h3>
            <p>Quantity: ${o.quantity} · $${(Number(o.price)*Number(o.quantity)).toFixed(2)}</p>
            <p>Order date: ${new Date(o.date).toLocaleString()}</p>
            <span class="status-badge status-${o.status.toLowerCase()}">${escapeHtml(o.status)}</span>
          </div>
          <div class="order-actions">
            ${['Ordered','Reserved'].includes(o.status) ? `<button type="button" data-return="${escapeHtml(o.id)}">Return / Cancel</button>` : ''}
          </div>
        </article>`).join('');
      $$('[data-return]',list).forEach(btn=>btn.addEventListener('click',()=>{
        const orders=read(STORAGE.orders,[]);
        const item=orders.find(o=>o.id===btn.dataset.return);
        if (!item) return;
        item.status=confirm('Choose OK to mark this order Returned, or Cancel to mark it Cancelled.') ? 'Returned' : 'Cancelled';
        write(STORAGE.orders,orders); render(); notify(`Order marked ${item.status}.`);
      }));
    }
    render();
  }

  // Here is change and reason: Added client-side CRUD operations for the Shop Owner/Admin panel so the teacher's Create, Read, Update, and Delete requirement can be demonstrated without MySQL.
  function setupAdmin() {
    const login=$('#admin-login-form');
    const panel=$('#admin-panel');
    if (!login || !panel) return;
    ensureProducts();
    const ADMIN_KEY='rexmobd_admin_session';
    function showPanel() {
      login.closest('.admin-login').style.display='none';
      panel.classList.add('active');
      renderAdmin();
    }
    login.addEventListener('submit',e=>{
      e.preventDefault();
      const email=$('#admin-email').value.trim().toLowerCase();
      const password=$('#admin-password').value;
      if(email==='admin@rexmobd.com' && password==='admin123'){
        sessionStorage.setItem(ADMIN_KEY,'1'); showPanel();
      } else setFormMessage($('#admin-message'),'Demo admin login: admin@rexmobd.com / admin123','error');
    });
    if(sessionStorage.getItem(ADMIN_KEY)==='1') showPanel();

    function renderAdmin() {
      const products=getProducts(), users=read(STORAGE.users,[]), orders=read(STORAGE.orders,[]);
      $('#stat-products').textContent=products.length;
      $('#stat-customers').textContent=users.length;
      $('#stat-active').textContent=orders.filter(o=>['Ordered','Reserved'].includes(o.status)).length;
      $('#stat-returned').textContent=orders.filter(o=>['Returned','Cancelled'].includes(o.status)).length;

      $('#customer-table-body').innerHTML=users.length ? users.map(u=>`<tr><td>${escapeHtml(u.name)}</td><td>${escapeHtml(u.email)}</td><td>Customer</td></tr>`).join('') : '<tr><td colspan="3">No registered customers yet.</td></tr>';
      $('#order-table-body').innerHTML=orders.length ? orders.map(o=>`<tr><td>${escapeHtml(o.customer)}</td><td>${escapeHtml(o.product)}</td><td>${o.quantity}</td><td>${new Date(o.date).toLocaleDateString()}</td><td>${escapeHtml(o.status)}</td></tr>`).join('') : '<tr><td colspan="5">No orders yet.</td></tr>';
      $('#product-table-body').innerHTML=products.map(p=>`<tr>
        <td>${escapeHtml(p.name)}</td><td>${escapeHtml(p.category)}</td><td>$${Number(p.price).toFixed(2)}</td>
        <td>${p.availability!==false?'Available':'Unavailable'}</td>
        <td class="table-actions"><button type="button" class="btn-light" data-edit-product="${escapeHtml(p.id)}">Edit</button><button type="button" class="btn-danger" data-delete-product="${escapeHtml(p.id)}">Delete</button></td>
      </tr>`).join('');
      $$('[data-edit-product]').forEach(btn=>btn.addEventListener('click',()=>loadProductIntoForm(btn.dataset.editProduct)));
      $$('[data-delete-product]').forEach(btn=>btn.addEventListener('click',()=>{
        if(confirm('Delete this product from the demonstration catalogue?')){
          write(STORAGE.products,getProducts().filter(p=>p.id!==btn.dataset.deleteProduct)); renderAdmin();
        }
      }));
    }

    function loadProductIntoForm(id) {
      const p=getProducts().find(x=>x.id===id); if(!p) return;
      $('#product-id').value=p.id; $('#product-name').value=p.name; $('#product-category').value=p.category;
      $('#product-gender').value=p.gender || ''; $('#product-price').value=p.price; $('#product-image').value=p.image;
      $('#product-description').value=p.description || ''; $('#product-availability').checked=p.availability!==false;
      $('#product-form-title').textContent='Edit Product';
      window.scrollTo({top:0,behavior:'smooth'});
    }

    $('#product-form').addEventListener('submit',e=>{
      e.preventDefault();
      const id=$('#product-id').value || `custom-${Date.now()}`;
      const product={id,name:$('#product-name').value.trim(),category:$('#product-category').value,gender:$('#product-gender').value,
        price:Number($('#product-price').value),image:$('#product-image').value.trim(),description:$('#product-description').value.trim(),availability:$('#product-availability').checked};
      if(!product.name || !product.price || !product.image) return setFormMessage($('#product-message'),'Product name, price, and image path are required.','error');
      const products=getProducts(), idx=products.findIndex(p=>p.id===id);
      if(idx>=0) products[idx]=product; else products.push(product);
      write(STORAGE.products,products);
      setFormMessage($('#product-message'),idx>=0?'Product updated successfully.':'Product added successfully.','success');
      e.target.reset(); $('#product-id').value=''; $('#product-form-title').textContent='Add Product'; renderAdmin();
    });
    $('#product-cancel').addEventListener('click',()=>{$('#product-form').reset();$('#product-id').value='';$('#product-form-title').textContent='Add Product';});
    $('#admin-logout').addEventListener('click',()=>{sessionStorage.removeItem(ADMIN_KEY);location.reload();});
  }

  // Here is change and reason: Added the required account/logout UI and safe empty-state handling so each new page can share the same authentication demonstration.
  ensureProducts();
  setupNavigation();
  setupCart();
  setupAuth();
  setupNewsletter();
  setupArticles();
  setupShop();
  setupOrders();
  setupAdmin();
  syncUserDisplay();
});
