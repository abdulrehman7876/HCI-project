const images = [
  { id: 1, src: "/AlbumThumbnail.jpg", caption: "RAILWAY STATIONS" },
  { id: 2, src: "/AlbumThumbnail2.jpg", caption: "Trains" },
  { id: 3, src: "/AlbumThumbnail3.jpg", caption: "Railway Heritage" },
  { id: 4, src: "/AlbumThumbnail4.jpg", caption: "Railway Bridges" },
  { id: 5, src: "/AlbumThumbnail5.jpg", caption: "Azadi Train" },
  { id: 6, src: "/AlbumThumbnail6.jpg", caption: "Independence Day" },
  { id: 7, src: "/AlbumThumbnail7.jpg", caption: "AC PARLOR CLASS" },
  { id: 8, src: "/AlbumThumbnail8.jpg", caption: "AC BUSINESS CLASS" },
  { id: 9, src: "/AlbumThumbnail9.jpg", caption: "AC SLEEPER CLASS" },
  { id: 10, src: "/AlbumThumbnail10.jpg", caption: "AC STANDARD" },
  {
    id: 11,
    src: "/AlbumThumbnail11.jpg",
    caption:
      "A JOURNEY FROM AGENT NORTH WESTERN RAILWAYS TO SR. GENERAL MANAGER",
  },
  {
    id: 12,
    src: "/AlbumThumbnail12.jpg",
    caption:
      "FEDERAL MINISTER FOR RAILWAYS MUHAMMAD HANIF ABBASI CHAIRED AND ADDRESSED THE MOU SIGNING",
  },
];

export default function GalleryPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl p-10 font-bold text-center mb-8">Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((image) => (
          <div key={image.id} className="flex flex-col items-center">
            <img
              src={image.src}
              alt={image.caption}
              className="w-full h-auto rounded-lg shadow-md"
            />
            <p className="mt-2 text-rail-muted text-lg text-center">
              {image.caption}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
