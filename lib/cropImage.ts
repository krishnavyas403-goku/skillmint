export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener("load", () => resolve(image))
    image.addEventListener("error", (error) => reject(error))
    image.setAttribute("crossOrigin", "anonymous")
    image.src = url
  })

export default async function getCroppedImg(
  imageSrc: string,
  crop: any,
  zoom: number
): Promise<File> {
  const image: HTMLImageElement = await createImage(imageSrc)
  
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  const size = Math.min(image.width, image.height)
  canvas.width = size
  canvas.height = size

  const cropX = (crop.x * image.width) / 100
  const cropY = (crop.y * image.height) / 100

  const scaledWidth = image.width / zoom
  const scaledHeight = image.height / zoom

  ctx?.drawImage(
    image,
    cropX,
    cropY,
    scaledWidth,
    scaledHeight,
    0,
    0,
    size,
    size
  )

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(new File([blob!], "avatar.jpg", { type: "image/jpeg" }))
    }, "image/jpeg")
  })
}
