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
          <div class="card-content card-content-padding">
            <p class="date">124 Buah</p>
            <p>${barang.nama_barang}</p>
            <p>Rp. ${barang.harga}</p>
          </div>
        <div class="card-footer"><a href="#" class="link">Tambah ke keranjang</a></div>
      </div>
    `
      );

      $$(".listbarang-container").html(listBarang);
    });
  }
);
