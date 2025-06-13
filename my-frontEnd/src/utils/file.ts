/**
 *
 * @param file File | Blob
 * @description 压缩图片
 * @returns Promise<Blob | File>
 */
export const compressImage = async (
  file: File | Blob
): Promise<Blob | File> => {
  return new Promise((resolve, reject) => {
    // new Compressor(file, {
    //   quality: 0.6,
    //   mimeType: "image/jpeg",
    //   success(result) {
    //     resolve(result);
    //   },
    //   error(err) {
    //     reject(err);
    //   },
    // });
  });
};
