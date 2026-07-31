import Image from "next/image";
import {
  BookOpen,
  ExternalLink,
  FileText,
  GraduationCap,
  PlayCircle,
} from "lucide-react";

interface ResourceCardProps {
  resource: {
    _id: string;
    title: string;
    description: string;
    category: string;
    subject: string;
    semester: number;
    resourceUrl: string;
    thumbnail?: string;
    uploadedBy?: {
      fullName: string;
    };
  };
}

export default function ResourceCard({
  resource,
}: ResourceCardProps) {
  const isVideo = resource.category === "Video";

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative h-52 w-full">
        <Image
          src={
            resource.thumbnail && resource.thumbnail !== ""
              ? resource.thumbnail
              : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"
          }
          alt={resource.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
            {resource.category}
          </span>

          <span className="flex items-center gap-1 text-sm text-slate-500">
            <GraduationCap size={16} />
            Semester {resource.semester}
          </span>
        </div>

        <h2 className="line-clamp-2 text-2xl font-bold">
          {resource.title}
        </h2>

        <p className="text-slate-600">
          {resource.subject}
        </p>

        <p className="line-clamp-3 text-sm text-slate-500">
          {resource.description}
        </p>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <BookOpen size={16} />
          Uploaded by {resource.uploadedBy?.fullName || "Faculty"}
        </div>

        <a
          href={resource.resourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          {isVideo ? (
            <>
              <PlayCircle size={18} />
              Watch Video
            </>
          ) : (
            <>
              <FileText size={18} />
              Open Resource
            </>
          )}

          <ExternalLink size={18} />
        </a>
      </div>
    </div>
  );
}