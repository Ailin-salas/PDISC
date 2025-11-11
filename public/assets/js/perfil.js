const banners = [
  "img/banner1.jpg",
  "img/banner2.jpg",
  "img/banner3.jpg"
];

const gifs = [
  "img/banner1.gif",
  "img/banner2.gif",
  "img/banner3.gif"
];

let currentBanner = 0;

function changeBanner(index) {
  const banner = document.getElementById("banner");
  currentBanner = index;
  banner.src = gifs[index];
  setTimeout(() => {
    banner.src = banners[index];
  }, 3000); // vuelve a imagen después de mostrar el gif
}
