function getObjectUrl(file) {
    var url = null;
    if (window.createObjectURL !== undefined)
        url = window.createObjectURL(file);
    else if (window.URL !== undefined)
        url = window.URL.createObjectURL(file);
    else if (window.webkitURL !== undefined)
        url = window.webkitURL.createObjectURL(file);
    return url;
}
export function getBlobByFileURL(fileURL) {
    return new Promise(function (resolve) {
        fetch(fileURL)
            .then(function (response) {
            return response.blob();
        })
            .then(function (blob) {
            resolve(blob);
        });
    });
}
function dataURLtoBlob(str) {
    var arr = str.split(',');
    var firstStr = arr[0];
    if (firstStr) {
        var matchRes = firstStr.match(/:(.*?);/);
        if (matchRes) {
            var mime = matchRes[1];
            var bstr = atob(arr[1]);
            var n = bstr.length;
            var u8arr = new Uint8Array(n);
            while (n--)
                u8arr[n] = bstr.charCodeAt(n);
            return new Blob([u8arr], { type: mime });
        }
        return null;
    }
    return null;
}
function base64toUrl(str) {
    var file = dataURLtoBlob(str);
    if (!file)
        return null;
    return getObjectUrl(file);
}
function blobToDataURL(blob) {
    return new Promise(function (resolve) {
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = function (e) {
            if (e.target) {
                var r = e.target.result;
                resolve(r);
            }
            else {
                resolve('');
            }
        };
    });
}
function getBlobByUrl(url) {
    return new Promise(function (resolve) {
        fetch(url)
            .then(function (res) { return res.blob(); })
            .then(function (res) {
            resolve(res);
        });
    });
}
function getFileSize(url) {
    return new Promise(function (resolve) {
        getBlobByUrl(url).then(function (res) {
            resolve(res.size);
        });
    });
}
function download(url, filename, suffix) {
    var link = document.createElement('a');
    link.download = "".concat(filename, ".").concat(suffix);
    link.href = url;
    link.click();
}
function downloadBase64(str, filename, suffix) {
    var url = base64toUrl(str);
    if (!url)
        return;
    download(url, filename, suffix);
}
function imageReset(option) {
    var file = option.file;
    var targetSize = option.targetSize ? Number(option.targetSize) : undefined;
    var angle = option.angle ? Number(option.angle) : 0;
    var quality = option.quality ? Number(option.quality) : 1;
    if (file.size < 307200)
        quality = 1;
    angle = angle % 360;
    if (angle < 0)
        angle = angle + 360;
    var position = '';
    if (Math.abs(angle % 360) === 0)
        position = 'bottom';
    else if (Math.abs(angle % 270) === 0)
        position = 'right';
    else if (Math.abs(angle % 180) === 0)
        position = 'top';
    else if (Math.abs(angle % 90) === 0)
        position = 'left';
    var compressAndRotate = function (url) {
        var ext = url.split(';')[0].replace('data:image/', '');
        return new Promise(function (resolve) {
            var img = new Image();
            img.onload = function () {
                var imgWidth = img.width;
                var imgHeight = img.height;
                if (targetSize && Math.max(imgWidth, imgHeight) > targetSize) {
                    var scale = imgWidth / imgHeight;
                    if (scale > 1) {
                        imgWidth = targetSize;
                        imgHeight = imgWidth / scale;
                    }
                    else if (scale < 1) {
                        imgHeight = targetSize;
                        imgWidth = imgHeight * scale;
                    }
                }
                var width = imgWidth;
                var height = imgHeight;
                var left = 0;
                var top = 0;
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
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                canvas.width = width;
                canvas.height = height;
                ctx.translate(left, top);
                ctx.rotate(Math.PI / 180 * angle);
                ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
                url = canvas.toDataURL("image/".concat(ext), quality);
                resolve(url);
            };
            img.src = url;
        });
    };
    return new Promise(function (resolve) {
        if (typeof file === 'object') {
            var reader_1 = new FileReader();
            reader_1.readAsDataURL(file);
            reader_1.onload = function () {
                var url = reader_1.result;
                compressAndRotate(url).then(function (res) {
                    resolve(res);
                });
            };
        }
        if (typeof file === 'string' && file.includes('data:image')) {
            compressAndRotate(file).then(function (res) {
                resolve(res);
            });
        }
    });
}
function colorMatrix(url, option) {
    var brightness = option.brightness || 0;
    var contrast = option.contrast || 1;
    var ext = url.split(';')[0].replace('data:image/', '');
    return new Promise(function (resolve) {
        var image = new Image();
        image.src = url;
        image.crossOrigin = 'Anonymous';
        image.onload = function () {
            var canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0, image.width, image.height);
            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            for (var p = 0; p < imageData.data.length; p += 4) {
                var R = imageData.data[p];
                var G = imageData.data[p + 1];
                var B = imageData.data[p + 2];
                imageData.data[p] = R * contrast + brightness;
                imageData.data[p + 1] = G * contrast + brightness;
                imageData.data[p + 2] = B * contrast + brightness;
            }
            ctx.putImageData(imageData, 0, 0);
            url = canvas.toDataURL("image/".concat(ext), 0.7);
            resolve(url);
        };
    });
}
function cropImage(image, x, y, width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, x, y, width, height, 0, 0, width, height);
    var url = canvas.toDataURL('image/png', 0.9);
    return url;
}
function loadImages(images) {
    var queue = images.map(function (url) {
        return loadImage(url);
    });
    return Promise.all(queue).then(function (res) {
        return res;
    });
}
function loadImage(url) {
    return new Promise(function (resolve) {
        var image = new Image();
        image.onload = function () {
            resolve(image);
        };
        image.crossOrigin = 'Anonymous';
        image.src = url;
    });
}
function clearImageEdgeBlank(url, padding) {
    if (padding === void 0) { padding = 0; }
    return new Promise(function (resolve) {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var image = new Image();
        image.onload = function () {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var data = imageData.data, width = imageData.width, height = imageData.height;
            var startX = width;
            var startY = height;
            var endX = 0;
            var endY = 0;
            for (var col = 0; col < width; col++) {
                for (var row = 0; row < height; row++) {
                    var pxStartIndex = (row * width + col) * 4;
                    var pxData = {
                        r: data[pxStartIndex],
                        g: data[pxStartIndex + 1],
                        b: data[pxStartIndex + 2],
                        a: data[pxStartIndex + 3],
                    };
                    var colorExist = pxData.a !== 0;
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
            var cropCanvas = document.createElement('canvas');
            var cropCtx = cropCanvas.getContext('2d');
            cropCanvas.width = endX - startX;
            cropCanvas.height = endY - startY;
            cropCtx.drawImage(image, startX, startY, cropCanvas.width, cropCanvas.height, 0, 0, cropCanvas.width, cropCanvas.height);
            resolve(cropCanvas.toDataURL());
        };
        image.src = url;
        image.crossOrigin = 'Anonymous';
    });
}
function flipImage(data, type, isJPG) {
    if (type === void 0) { type = 'base64'; }
    return new Promise(function (resolve, reject) {
        var url = '';
        if (typeof data === 'object') {
            var file = data;
            url = getObjectUrl(file);
        }
        else {
            url = data;
        }
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var image = new Image();
        image.onload = function () {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.translate(image.width, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(image, 0, 0, image.width, image.height);
            var extention = 'image/png';
            if (isJPG)
                extention = 'image/jpeg';
            else if (typeof data === 'object')
                extention = data.type;
            var base64 = canvas.toDataURL(extention, 0.92);
            if (type === 'base64')
                resolve(base64);
            else
                resolve(dataURLtoBlob(base64));
        };
        image.onerror = function () {
            reject(new Error('图片加载失败'));
        };
        image.src = url;
        image.crossOrigin = 'Anonymous';
    });
}
function imageResetRate(params) {
    var url = params.url, width = params.width, height = params.height;
    var createImage = function (image, x, y, width, height) {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(image, x, y, image.width, image.height);
        var url = canvas.toDataURL('image/png', 0.9);
        return url;
    };
    return new Promise(function (resolve) {
        var img = new Image();
        img.onload = function () {
            var originalRate = img.width / img.height;
            var directionRate = width / height;
            var fixedEdge = directionRate > originalRate ? 'height' : 'width';
            var newWidth;
            var newHeight;
            var x;
            var y;
            if (fixedEdge === 'height') {
                newWidth = img.height * directionRate;
                newHeight = img.height;
                x = (newWidth - img.width) / 2;
                y = 0;
            }
            else {
                newWidth = img.width;
                newHeight = img.width / directionRate;
                x = 0;
                y = (newHeight - img.height) / 2;
            }
            var newUrl = createImage(img, x, y, newWidth, newHeight);
            resolve(newUrl);
        };
        img.src = url;
    });
}
function shopifyImageSetSize(url, width) {
    if (url.includes('cdn.')) {
        var newURL = url.replace(/(\.jpg|\.JPG|\.jpeg|\.JPEG|\.png|\.PNG|\.gif)/g, "_".concat(width, "x$1"));
        return newURL;
    }
    return url;
}
export { getObjectUrl, base64toUrl, dataURLtoBlob, blobToDataURL, getBlobByUrl, getFileSize, download, downloadBase64, imageReset, colorMatrix, cropImage, loadImage, loadImages, clearImageEdgeBlank, flipImage, imageResetRate, shopifyImageSetSize, };
