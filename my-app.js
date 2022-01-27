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
    }
  ],
  // ... other parameters
});

var mainView = app.views.create(".view-main");
var $$ = Dom7;

$$(".view-main").on("click", "#simpan", () => {
  var id_barang = $$("#id_barang").val();
  var id_pelanggan = $$("#id_pelanggan").val();
  var qty = $$("#qty").val();
  var total_sub = $$("#total_sub").val();

  app.request({
    url: "http://localhost:8080/toko/tambah.php",
    type: "POST",
    data: {
      id_barang: id_barang,
      id_pelanggan: id_pelanggan,
      qty: qty,
      total_sub: total_sub,
    },

    dataType: "json",
    success(data) {
      if (data.pesan) {
        app.dialog.alert(data.pesan);
        $$("#id_barang").val("");
        $$("#qty").val("");
        $$("#total_sub").val("");
        $$("#id_pelanggan").val();
        tampil();
        app.views.main.router.navigate("/home/");
      }
    },
  });
});

$$(".view-main").on("click", "#ubah", function () {
  var id = $$(this).data("id");
  app.views.main.router.navigate("/ubah/");
  app.request.json(
    "http://localhost:8080/toko/cari.php",
    { id: id },
    function (data) {
      $$("#eid_barang").val(data[0].id_barang);
      $$("#eqty").val(data[0].qty);
      $$("#eid_pelanggan").val(data[0].id_pelanggan);
      $$("#etotal_sub").val(data[0].total_sub);
      $$("#kode").val(data[0].id_keranjang);
    }
  );
});

$$(".view-main").on("click", "#update", () => {
  var id_barang = $$("#eid_barang").val();
  var id_pelanggan = $$("#eid_pelanggan").val();
  var qty = $$("#eqty").val();
  var total_sub = $$("#etotal_sub").val();
  var id = $$("#kode").val();

  app.request({
    url: "http://localhost:8080/toko/ubah.php",
    type: "POST",
    data: {
      id_barang: id_barang,
      id_pelanggan: id_pelanggan,
      qty: qty,
      total_sub: total_sub,
      id: id,
    },
    dataType: "json",
    success(data) {
      if (data.pesan) {
        app.dialog.alert(data.pesan);
        $$("#eid_barang").val("");
        $$("#eid_pelanggan").val("");
        $$("#eqty").val("");
        $$("#etotal_sub").val("");
        tampil();
        app.views.main.router.navigate("/home/");
      }
    },
  });
});

const tampil = () => {
  app.request.json("http://localhost:8080/toko/index.php", (data) => {
    const tabel = data.map(
      (keranjang, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>
                <a class='link color-red' data-id='${
                  keranjang.id_keranjang
                }' id='hapus'>
                    <i class='f7-icons size-20'>trash</i>
                </a>
                <a class='link color-teal' data-id='${
                  keranjang.id_keranjang
                }' id='ubah'>
                    <i class='f7-icons size-20'>pencil</i>
                </a>
            </td>
            <td>${keranjang.id_barang}</td>
            <td>${keranjang.qty}</td>
            <td>${keranjang.total_sub}</td>
            <td>${keranjang.id_pelanggan}</td>
            <td>${keranjang.tgl_keranjang}</td>
        </tr>
      `
    );

    $$("#tampil").html(tabel.join(""));
  });
};

tampil();

function baca() {
  app.request.json("http://localhost/projek/barang/baca.php", function (data) {
   var jlh = data.length;
   console.log(data);
   var i = 0;
   var buatTabel = "";
   for (i = 0; i < jlh; i++){
       buatTabel += "<tr>" +
           "<td>" + (i + 1) + "</td>" +
           "<td>" + data[i].isbn + "</td>" +
           "<td>" + data[i].judul_buku + "</td>" +
           "<td>" + data[i].penerbit + "</td>" +
           "<td>" + data[i].penulis + "</td>" +
           "<td>" + data[i].tahun + "</td>" +
           "</tr>";
   }
   $$("#tampil").html(buatTabel);
});
}