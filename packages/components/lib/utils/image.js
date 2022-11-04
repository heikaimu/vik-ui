"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
function getObjectUrl(file) {
  let url = null;
  if (window.createObjectURL !== void 0) {
    url = window.createObjectURL(file);
  } else if (window.URL !== void 0) {
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL !== void 0) {
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
}
function dataURLtoBlob(str) {
  const arr = str.split(",");
  const firstStr = arr[0];
  if (firstStr) {
    const matchRes = firstStr.match(/:(.*?);/);
    if (matchRes) {
      const mime = matchRes[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    }
    return null;
  }
  return null;
}
function base64toUrl(str) {
  const file = dataURLtoBlob(str);
  if (!file) {
    return null;
  }
  return getObjectUrl(file);
}
function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function(e) {
      if (e.target) {
        const r = e.target.result;
        resolve(r);
      } else {
        resolve("");
      }
    };
  });
}
function getBlobByUrl(url) {
  return new Promise((resolve) => {
    fetch(url).then((res) => res.blob()).then((res) => {
      resolve(res);
    });
  });
}
function getFileSize(url) {
  return new Promise((resolve) => {
    getBlobByUrl(url).then((res) => {
      resolve(res.size);
    });
  });
}
function download(url, filename, suffix) {
  var link = document.createElement("a");
  link.download = filename + "." + suffix;
  link.href = url;
  link.click();
}
function downloadBase64(str, filename, suffix) {
  const url = base64toUrl(str);
  if (!url) {
    return;
  }
  download(url, filename, suffix);
}
function imageReset(option) {
  const file = option.file;
  const targetSize = option.targetSize ? Number(option.targetSize) : void 0;
  let angle = option.angle ? Number(option.angle) : 0;
  let quality = option.quality ? Number(option.quality) : 1;
  if (file.size < 307200) {
    quality = 1;
  }
  angle = angle % 360;
  if (angle < 0) {
    angle = angle + 360;
  }
  let position = "";
  if (Math.abs(angle % 360) === 0) {
    position = "bottom";
  } else if (Math.abs(angle % 270) === 0) {
    position = "right";
  } else if (Math.abs(angle % 180) === 0) {
    position = "top";
  } else if (Math.abs(angle % 90) === 0) {
    position = "left";
  }
  const compressAndRotate = (url) => {
    const ext = url.split(";")[0].replace("data:image/", "");
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        let imgWidth = img.width;
        let imgHeight = img.height;
        if (targetSize && Math.max(imgWidth, imgHeight) > targetSize) {
          const scale = imgWidth / imgHeight;
          if (scale > 1) {
            imgWidth = targetSize;
            imgHeight = imgWidth / scale;
          } else if (scale < 1) {
            imgHeight = targetSize;
            imgWidth = imgHeight * scale;
          }
        }
        let width = imgWidth;
        let height = imgHeight;
        let left = 0;
        let top = 0;
        switch (position) {
          case "bottom":
            width = imgWidth;
            height = imgHeight;
            left = 0;
            top = 0;
            break;
          case "left":
            width = imgHeight;
            height = imgWidth;
            left = width;
            top = 0;
            break;
          case "top":
            width = imgWidth;
            height = imgHeight;
            left = width;
            top = height;
            break;
          case "right":
            width = imgHeight;
            height = imgWidth;
            left = 0;
            top = height;
            break;
        }
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;
        ctx.translate(left, top);
        ctx.rotate(Math.PI / 180 * angle);
        ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
        url = canvas.toDataURL("image/" + ext, quality);
        resolve(url);
      };
      img.src = url;
    });
  };
  return new Promise((resolve) => {
    if (typeof file === "object") {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const url = reader.result;
        compressAndRotate(url).then((res) => {
          resolve(res);
        });
      };
    }
    if (typeof file === "string" && file.indexOf("data:image") > -1) {
      compressAndRotate(file).then((res) => {
        resolve(res);
      });
    }
  });
}
function colorMatrix(url, option) {
  const brightness = option.brightness || 0;
  const contrast = option.contrast || 1;
  const ext = url.split(";")[0].replace("data:image/", "");
  return new Promise((resolve) => {
    const image = new Image();
    image.src = url;
    image.crossOrigin = "Anonymous";
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, image.width, image.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      for (let p = 0; p < imageData.data.length; p += 4) {
        const R = imageData.data[p];
        const G = imageData.data[p + 1];
        const B = imageData.data[p + 2];
        imageData.data[p] = R * contrast + brightness;
        imageData.data[p + 1] = G * contrast + brightness;
        imageData.data[p + 2] = B * contrast + brightness;
      }
      ctx.putImageData(imageData, 0, 0);
      url = canvas.toDataURL("image/" + ext, 0.7);
      resolve(url);
    };
  });
}
function cropImage(image, x, y, width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, x, y, width, height, 0, 0, width, height);
  const url = canvas.toDataURL("image/png", 0.9);
  return url;
}
function loadImages(images) {
  const queue = images.map((url) => {
    return loadImage(url);
  });
  return Promise.all(queue).then((res) => {
    return res;
  });
}
function loadImage(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = function() {
      resolve(image);
    };
    image.crossOrigin = "Anonymous";
    image.src = url;
  });
}
function clearImageEdgeBlank(url, padding = 0) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.onload = function() {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const { data, width, height } = imageData;
      let startX = width;
      let startY = height;
      let endX = 0;
      let endY = 0;
      for (let col = 0; col < width; col++) {
        for (let row = 0; row < height; row++) {
          const pxStartIndex = (row * width + col) * 4;
          const pxData = {
            r: data[pxStartIndex],
            g: data[pxStartIndex + 1],
            b: data[pxStartIndex + 2],
            a: data[pxStartIndex + 3]
          };
          const colorExist = pxData.a !== 0;
          if (colorExist) {
            startX = Math.min(col, startX);
            endX = Math.max(col, startX);
            startY = Math.min(row, startY);
            endY = Math.max(row, endY);
          }
        }
      }
      endX += 1;
      endY += 1;
      startX -= padding;
      startY -= padding;
      endX += padding;
      endY += padding;
      const cropCanvas = document.createElement("canvas");
      const cropCtx = cropCanvas.getContext("2d");
      cropCanvas.width = endX - startX;
      cropCanvas.height = endY - startY;
      cropCtx.drawImage(
        image,
        startX,
        startY,
        cropCanvas.width,
        cropCanvas.height,
        0,
        0,
        cropCanvas.width,
        cropCanvas.height
      );
      resolve(cropCanvas.toDataURL());
    };
    image.src = url;
    image.crossOrigin = "Anonymous";
  });
}
function flipImage(data, type = "base64") {
  return new Promise((resolve, reject) => {
    let url = "";
    if (typeof data === "object") {
      const file = data;
      url = getObjectUrl(file);
    } else {
      url = data;
    }
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.onload = function() {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.translate(image.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(image, 0, 0, image.width, image.height);
      const base64 = canvas.toDataURL("image/png", 0.9);
      if (type === "base64") {
        resolve(base64);
      } else {
        resolve(dataURLtoBlob(base64));
      }
    };
    image.onerror = function() {
      reject(new Error("\u56FE\u7247\u52A0\u8F7D\u5931\u8D25"));
    };
    image.src = url;
    image.crossOrigin = "Anonymous";
  });
}
function imageResetRate(params) {
  const { url, width, height } = params;
  const createImage = (image, x, y, width2, height2) => {
    const canvas = document.createElement("canvas");
    canvas.width = width2;
    canvas.height = height2;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, x, y, image.width, image.height);
    const url2 = canvas.toDataURL("image/png", 0.9);
    return url2;
  };
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const originalRate = img.width / img.height;
      const directionRate = width / height;
      const fixedEdge = directionRate > originalRate ? "height" : "width";
      let newWidth;
      let newHeight;
      let x;
      let y;
      if (fixedEdge === "height") {
        newWidth = img.height * directionRate;
        newHeight = img.height;
        x = (newWidth - img.width) / 2;
        y = 0;
      } else {
        newWidth = img.width;
        newHeight = img.width / directionRate;
        x = 0;
        y = (newHeight - img.height) / 2;
      }
      const newUrl = createImage(img, x, y, newWidth, newHeight);
      resolve(newUrl);
    };
    img.src = url;
  });
}
function shopifyImageSetSize(url, width) {
  if (url.indexOf("cdn.") > -1) {
    const newURL = url.replace(/(\.jpg|\.JPG|\.jpeg|\.JPEG|\.png|\.PNG|\.gif)/g, `_${width}x$1`);
    return newURL;
  }
  return url;
}
exports.base64toUrl = base64toUrl;
exports.blobToDataURL = blobToDataURL;
exports.clearImageEdgeBlank = clearImageEdgeBlank;
exports.colorMatrix = colorMatrix;
exports.cropImage = cropImage;
exports.dataURLtoBlob = dataURLtoBlob;
exports.download = download;
exports.downloadBase64 = downloadBase64;
exports.flipImage = flipImage;
exports.getBlobByUrl = getBlobByUrl;
exports.getFileSize = getFileSize;
exports.getObjectUrl = getObjectUrl;
exports.imageReset = imageReset;
exports.imageResetRate = imageResetRate;
exports.loadImage = loadImage;
exports.loadImages = loadImages;
exports.shopifyImageSetSize = shopifyImageSetSize;
