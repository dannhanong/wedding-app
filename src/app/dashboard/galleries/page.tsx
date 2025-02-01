import dynamic from "next/dynamic";

const GalleryManagement = dynamic(
    () => import("./GalleryManagement"), 
    {
    ssr: false,
    }
);

export default function GalleryManagementPage() {
  return (
    <div>
        <GalleryManagement />
    </div>
  );
}