// components/VideoPlayer.tsx
'use client';

type Props = {
  video: {
    title: string;
    filePath: string;
  };
};

export default function VideoPlayer({ video }: Props) {
  if (!video?.filePath) return null;

  return (
    <div className="mt-4">
      <h4 className="text-md font-semibold mb-1">{video.title}</h4>
      <video controls className="w-full rounded">
        <source src={video.filePath} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
