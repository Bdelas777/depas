import deleteFile from "../../firebase/deleteFile";

const deleteImages = async (imagenes, userId) => {
  if (imagenes.length > 0) {
    const promises = imagenes.map((imgURL) => {
      const imgName = imgURL?.split(`${userId}%2F`)[1]?.split("?")[0];
      return deleteFile(`rooms/${userId}/${imgName}`);
    });
    try {
      await Promise.all(promises);
    } catch (error) {
      console.log(error);
    }
  }
};

export default deleteImages;
