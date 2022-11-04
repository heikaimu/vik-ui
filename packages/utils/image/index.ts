/*
 * @Description: 图片文件工具函数
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-05-07 16:48:42
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-11-04 15:41:01
 */
interface ImageResetRateParams {
  url: string
  width: number
  height: number
}

interface ColorMatrixParams {
  brightness: number
  contrast: number
}

interface ImageResetParams {
  file: Blob
  quality: number
  targetSize: number
  angle: number
}

/**
 * 获取文件本地预览地址
 * @param {blob} file - 源文件
 * @returns {string} - 本地预览地址
 */
function getObjectUrl(file: Blob): string {
  let url = null;
  if ((window as any).createObjectURL !== undefined) {
    url = (window as any).createObjectURL(file);
  } else if (window.URL !== undefined) {
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL !== undefined) {
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
}

/**
 * base64转blob
 * @param {string} str - base64
 * @returns {blob} - Blob
 */
function dataURLtoBlob(str: string): Blob | null {
  const arr = str.split(',');
  const firstStr = arr[0] as string;
  if (firstStr) {
    const matchRes = firstStr.match(/:(.*?);/);
    if (matchRes) {
      const mime = matchRes[1];
      const bstr = atob(arr[1]); let n = bstr.length; const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    }

    return null;
  }

  return null;
}

/**
 * base64转本地连接
 * @param {string} str - base64
 * @returns {string}
 */
function base64toUrl(str: string): string | null {
  const file = dataURLtoBlob(str);
  if (!file) {
    return null
  }

  return getObjectUrl(file);
}

/**
 * bolb转base64
 * @param {Blob} blob - 文件blob
 * @returns {Promise<string>}
 */
function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function (e) {
      if (e.target) {
        const r = e.target.result as string
        resolve(r);
      } else {
        resolve('');
      }
    };
  });
}

/**
 * 通过图片地址获取文件Blob
 * @param {string} url - 图片地址
 * @returns {Promise<Blob>}
 */
function getBlobByUrl(url: string): Promise<Blob> {
  return new Promise((resolve) => {
    fetch(url)
      .then(res => res.blob())
      .then(res => {
        resolve(res);
      });
  });
}

/**
 * 通过图片地址获取文件尺寸
 * @param {string} url - 图片地址
 * @returns {Promise<Blob>}
 */
function getFileSize(url: string) {
  return new Promise((resolve) => {
    getBlobByUrl(url).then(res => {
      resolve(res.size);
    });
  });
}

/**
 * 通过图片地址下载
 * @param {string} url - 图片地址
 * @param {string} filename - 文件名
 * @param {string} suffix - 后缀名
 */
function download(url: string, filename: string, suffix: string) {
  var link = document.createElement('a');
  link.download = filename + '.' + suffix;
  link.href = url;
  link.click();
}

/**
 * 下载base64
 * @param {string} str - base64
 * @param {string} filename - 文件名
 * @param {string} suffix - 后缀名
 */
function downloadBase64(str: string, filename: string, suffix: string): void {
  const url = base64toUrl(str);
  if (!url) {
    return;
  }

  download(url, filename, suffix);
}

/**
 * 旋转图片
 * @param {object} option
 * @param {blob} option.file - 文件
 * @param {number} option.quality - 质量
 * @param {number} option.targetSize - 目标尺寸
 * @param {number} option.angle - 旋转角度 90 x
 * @returns {Promise<string>} - base64
 */
function imageReset(option: ImageResetParams): Promise<string> {
  const file = option.file; // 文件blob
  const targetSize = option.targetSize ? Number(option.targetSize) : undefined; // 目标尺寸
  let angle = option.angle ? Number(option.angle) : 0; // 选择角度
  let quality = option.quality ? Number(option.quality) : 1; // 质量

  // 如果图片小于300kb, 则使用最大质量
  if (file.size < 307200) {
    quality = 1;
  }

  // 角度处理成360度以内
  angle = angle % 360;
  if (angle < 0) {
    angle = angle + 360;
  }

  // 获取当前方位
  let position = '';
  if (Math.abs(angle % 360) === 0) {
    position = 'bottom';
  } else if (Math.abs(angle % 270) === 0) {
    position = 'right';
  } else if (Math.abs(angle % 180) === 0) {
    position = 'top';
  } else if (Math.abs(angle % 90) === 0) {
    position = 'left';
  }

  // 压缩并旋转
  const compressAndRotate = (url: string): Promise<string> => {
    const ext = url.split(';')[0].replace('data:image/', '');

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        let imgWidth = img.width;
        let imgHeight = img.height;

        // 如果有目标尺寸，先通过宽高比判断长边
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

        // 绘制图片，或旋转
        let width = imgWidth;
        let height = imgHeight;
        let left = 0;
        let top = 0;

        switch (position) {
          case 'bottom':
            width = imgWidth;
            height = imgHeight;
            left = 0;
            top = 0;
            break;

          case 'left':
            width = imgHeight;
            height = imgWidth;
            left = width;
            top = 0;
            break;

          case 'top':
            width = imgWidth;
            height = imgHeight;
            left = width;
            top = height;
            break;

          case 'right':
            width = imgHeight;
            height = imgWidth;
            left = 0;
            top = height;
            break;

          default:
            break;
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        canvas.width = width;
        canvas.height = height;
        ctx.translate(left, top);

        ctx.rotate(Math.PI / 180 * angle);
        ctx.drawImage(img, 0, 0, imgWidth, imgHeight);

        url = canvas.toDataURL('image/' + ext, quality);
        resolve(url);
      };
      img.src = url;
    });
  };

  return new Promise((resolve) => {
    // 如果是blob
    if (typeof file === 'object') {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const url = reader.result as string;
        compressAndRotate(url).then(res => {
          resolve(res);
        });
      };
    }

    // 如果是base64
    if (typeof file === 'string' && (file as any).indexOf('data:image') > -1) {
      compressAndRotate(file).then(res => {
        resolve(res);
      });
    }
  });
}

/**
 * 亮度对比度调整
 * @param {string} url - base64
 * @param {object} option - 配置
 * @param {number} option.brightness - 亮度
 * @param {number} option.contrast - 对比度
 * @returns {Promise<string>}
 */
function colorMatrix(url: string, option: ColorMatrixParams): Promise<string> {
  const brightness = option.brightness || 0; // 亮度
  const contrast = option.contrast || 1; // 对比度
  const ext = url.split(';')[0].replace('data:image/', ''); // 后缀
  return new Promise((resolve) => {
    const image = new Image();
    image.src = url;
    image.crossOrigin = 'Anonymous'; // 支持跨域图片
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      ctx.drawImage(image, 0, 0, image.width, image.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // 获取米格像素点信息
      for (let p = 0; p < imageData.data.length; p += 4) {
        const R = imageData.data[p];
        const G = imageData.data[p + 1];
        const B = imageData.data[p + 2];

        imageData.data[p] = R * contrast + brightness;
        imageData.data[p + 1] = G * contrast + brightness;
        imageData.data[p + 2] = B * contrast + brightness;
      }

      ctx.putImageData(imageData, 0, 0);

      url = canvas.toDataURL('image/' + ext, 0.7);

      resolve(url);
    };
  });
}

/**
 * 裁剪图片
 * @param {HTMLImageElement} image - 图片文件
 * @param {number} x - 开始坐标x
 * @param {number} y - 开始坐标y
 * @param {number} width - 宽度
 * @param {number} height - 高度
 * @returns {string}
 */
function cropImage(image: HTMLImageElement, x: number, y: number, width: number, height: number): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.drawImage(image, x, y, width, height, 0, 0, width, height);
  const url = canvas.toDataURL('image/png', 0.9);
  return url;
}

/**
 * 加载多张图片
 * @param {array[string]} images - 图片地址集合
 * @returns {HTMLImageElement[]}
 */
function loadImages(images: string[]): Promise<HTMLImageElement[]> {
  const queue = images.map(url => {
    return loadImage(url);
  });
  return Promise.all(queue).then(res => {
    return res;
  });
}

/**
 * 加载图片
 * @param {string} url - 图片地址
 * @returns {HTMLImageElement}
 */
function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = function () {
      resolve(image);
    };
    image.crossOrigin = 'Anonymous'; // 支持跨域图片
    image.src = url;
  });
}

/**
 * 清楚图片周围空白区域
 * @param {string} url - 图片地址或base64
 * @param {number} [padding=0] - 内边距
 * @return {Promise<string>} - 裁剪后的图片字符串
 */
function clearImageEdgeBlank(url: string, padding = 0): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const image = new Image();
    image.onload = function () {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const { data, width, height } = imageData;

      // 裁剪需要的起点和终点,初始值为画布左上和右下点互换设置成极限值。
      let startX = width;
      let startY = height;
      let endX = 0;
      let endY = 0;

      /*
      col为列，row为行，两层循环构造每一个网格，
      便利所有网格的像素，如果有色彩则设置裁剪的起点和终点
      */
      for (let col = 0; col < width; col++) {
        for (let row = 0; row < height; row++) {
          // 网格索引
          const pxStartIndex = (row * width + col) * 4;

          // 网格的实际像素RGBA
          const pxData = {
            r: data[pxStartIndex],
            g: data[pxStartIndex + 1],
            b: data[pxStartIndex + 2],
            a: data[pxStartIndex + 3]
          };

          // 存在色彩：不透明
          const colorExist = pxData.a !== 0;

          /*
          如果当前像素点有色彩
          startX坐标取当前col和startX的最小值
          endX坐标取当前col和endX的最大值
          startY坐标取当前row和startY的最小值
          endY坐标取当前row和endY的最大值
          */
          if (colorExist) {
            startX = Math.min(col, startX);
            endX = Math.max(col, startX);
            startY = Math.min(row, startY);
            endY = Math.max(row, endY);
          }
        }
      }

      // 右下坐标需要扩展1px,才能完整的截取到图像
      endX += 1;
      endY += 1;

      // 加上padding
      startX -= padding;
      startY -= padding;
      endX += padding;
      endY += padding;

      // 根据计算的起点终点进行裁剪
      const cropCanvas = document.createElement('canvas');
      const cropCtx = cropCanvas.getContext('2d') as CanvasRenderingContext2D;
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

      // rosolve裁剪后的图像字符串
      resolve(cropCanvas.toDataURL());
    };

    image.src = url;
    image.crossOrigin = 'Anonymous';
  });
}

/**
 * 图片翻转
 * @param {} data - 图片，blob或者base64或者链接
 * @param {*} type - 返回的类型，默认base64，可选blob
 * @returns {Promise<String|Blob>}
 */
function flipImage(data: Blob | String, type = 'base64'): Promise<String | Blob> {
  return new Promise((resolve, reject) => {
    let url = '';

    if (typeof data === 'object') {
      const file = data as Blob;
      url = getObjectUrl(file);
    } else {
      url = data;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    const image = new Image();
    image.onload = function () {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.translate(image.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(image, 0, 0, image.width, image.height);

      const base64 = canvas.toDataURL('image/png', 0.9);
      if (type === 'base64') {
        resolve(base64);
      } else {
        resolve(dataURLtoBlob(base64) as Blob);
      }
    };
    image.onerror = function () {
      reject(new Error('图片加载失败'));
    };
    image.src = url;
    image.crossOrigin = 'Anonymous';
  });
}

/**
 * 设置图片宽高比
 * @param {string} param.url
 * @param {string} param.width
 * @param {string} param.height
 * @returns {Promise<string>}
 */
function imageResetRate(params: ImageResetRateParams): Promise<string> {
  const { url, width, height } = params;
  const createImage = (image: HTMLImageElement, x: number, y: number, width: number, height: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.drawImage(image, x, y, image.width, image.height);
    const url = canvas.toDataURL('image/png', 0.9);
    return url;
  };

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      // 图像的原始比列
      const originalRate = img.width / img.height;
      // 目标比列
      const directionRate = width / height;
      // 目标比例大于原始比例则固定高度调整宽度，反之
      const fixedEdge = directionRate > originalRate ? 'height' : 'width';
      // 核心计算
      let newWidth;
      let newHeight;
      let x;
      let y;
      if (fixedEdge === 'height') {
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

/**
 * shopify的图片地址压缩
 * @param {string} url - 图片地址
 * @param {number} width - 目标尺寸
 * @returns {string} - 新地址
 */
function shopifyImageSetSize(url: string, width: number): string {
  if (url.indexOf('cdn.') > -1) {
    const newURL = url.replace(/(\.jpg|\.JPG|\.jpeg|\.JPEG|\.png|\.PNG|\.gif)/g, `_${width}x$1`);
    return newURL;
  }
  return url;
}

export {
  getObjectUrl,
  base64toUrl,
  dataURLtoBlob,
  blobToDataURL,
  getBlobByUrl,
  getFileSize,
  download,
  downloadBase64,
  imageReset,
  colorMatrix,
  cropImage,
  loadImage,
  loadImages,
  clearImageEdgeBlank,
  flipImage,
  imageResetRate,
  shopifyImageSetSize
};
