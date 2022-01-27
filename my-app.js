app = new Framework7({
  // App root element
  el: "#app",
  // App Name
  name: "My App",
  // App id
  id: "com.myapp.test",
  // Enable swipe panel
  panel: {
    swipe: true,
  },
  // Add default routes
  routes: [
    {
      path: "/pelanggan/",
      url: "pages/pelanggan.html",
    },
    {
      path: "/tambah/",
      url: "/pages/tambah.html",
    },
    {
      path: "/ubah/",
      url: "/pages/ubah.html",
    },
    {
      path: "/listbarang/",
      url: "/pages/listbarang.html",
    },
    {
      path: "/keranjang/",
      url: "/pages/keranjang.html",
    },
    {
      path: "/menu/",
      url: "/pages/menu.html",
    },
  ],
  // ... other parameters
});

var mainView = app.views.create(".view-main");
var $$ = Dom7;

$$(document).on(
  "page:init",
  '.page[data-name="listbarang"]',
  function (e, page) {
    // const el = page.$el;
    app.request.json("http://localhost:8080/projek/barang/baca.php", (data) => {
      const listBarang = data.map(
        (barang) => `
      <div class="card demo-card-header-pic">
        <div style="background-image:url(microphone.jpg)" class="card-header align-items-flex-end"></div>
          <div class="card-content card-content-padding" id="dataBarang" >
            <p>${barang.stok}</p>
            <p>${barang.nama_barang}</p>
            <p>Rp. ${barang.harga}</p>
          </div>
        <div class="card-footer" id="tambah" ><a href="#" class="link" data-namaBarang="${barang.nama_barang}" data-id="${barang.id_barang}"  data-stok="${barang.stok}" data-harga="${barang.harga}">Tambah ke keranjang</a></div>
      </div>
    `
      );

      $$(".listbarang-container").html(listBarang);
    });
  }
);

$$(document).on(
  "page:init",
  '.page[data-name="keranjang"]',
  function (e, page) {
    // const el = page.$el;
    app.request.json(
      "http://localhost:8080/projek/keranjang/load.php",
      (data) => {
        const listKeranjang = data.map(
          (keranjang) => `
        <li>
        <a href="#" class="item-link item-content">
            <div class="item-media"><img src="88-1.jpg" width="80" /></div>
            <div class="item-inner">
                <div class="item-title-row">
                    <div class="item-title">${keranjang.nama_barang}</div>
                </div>
                <div class="item-subtitle">${keranjang.qty}</div>
                <div class="item-text">${keranjang.total_sub}</div>
            </div>
        </a>
    </li>
    `
        );

        $$("#keranjang").html(listKeranjang);
      }
    );
  }
);

$$(".view-main").on("click", "#tambah", (e) => {
  const dataBarang = $$(e.srcElement).dataset();

  app.request({
    url: "http://localhost:8080/projek/keranjang/simpan.php",
    type: "POST",
    data: {
      id_barang: dataBarang.id,
      id_pelanggan: "P0001",
      qty: 1,
      total_sub: `Rp. ${dataBarang.harga}`,
      nama_barang: dataBarang.namabarang,
    },
    dataType: "json",
  });
});
