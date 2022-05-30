const loadImagesAsync = (arrayOfSrc) => (
  Promise.all(arrayOfSrc.map((src) => (
    new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = reject;
    })
  )))
);

export default loadImagesAsync;
