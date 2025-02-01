"use client";

import Pagination from "@/app/components/Pagination";
import { createGallery, deleteGallery, getAllGalleries } from "@/services/gallery";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import Image from 'next/image';

interface Gallery {
    id: string;
    fileCode: string;
}

export default function GalleryManagement() {
    const [galleries, setGalleries] = useState<Gallery[]>([]);
    const [currentSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const fetchAllGalleries = async (size: number, page: number) => {
        try {
            const response = await getAllGalleries(size, page);
            setGalleries(response.content);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Error during gallery fetch:", error);
        }
    };

    const handleDelete = (id: string) => {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn xóa hình ảnh này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            confirmButtonColor: '#d33',
            cancelButtonText: 'Hủy',
            cancelButtonColor: '#3085d6',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await deleteGallery(id);
                    if (response) {
                        fetchAllGalleries(currentSize, currentPage);
                        Swal.fire({
                            icon: 'success',
                            title: 'Xóa hình ảnh thành công!',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                } catch (error) {
                    console.error('Error deleting gallery:', error);
                }
            }
        });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setSelectedFile(file || null);
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (selectedFile) {

            try {
                await createGallery(selectedFile);
                setIsModalOpen(false);
                setSelectedFile(null);
                setPreviewUrl(null);
                fetchAllGalleries(currentSize, currentPage);
                Swal.fire({
                    icon: 'success',
                    title: 'Tải lên thành công!',
                    showConfirmButton: false,
                    timer: 1500,
                });
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    };

    useEffect(() => {
        fetchAllGalleries(currentSize, currentPage);
    }, [currentSize, currentPage]);

    return (
        <div className="bg-white p-4 rounded-md shadow mt-10 mx-2">
            <h2 className="text-lg font-semibold mb-2">Danh sách hình ảnh</h2>
            <div className="flex justify-end mb-4">
                <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Thêm hình ảnh
                </button>
            </div>

            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-orange-500 text-white">
                        <th className="border p-2">STT</th>
                        <th className="border p-2">Hình ảnh</th>
                        <th className="border p-2">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {galleries.map((gallery, index) => (
                        <tr key={gallery.id} className="bg-white hover:bg-gray-100">
                            <td className="border p-2 text-center">{(index + 1) + currentPage * currentSize}</td>
                            <td className="border p-2 flex justify-center items-center">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/files/preview/${gallery.fileCode}`}
                                    alt={`Gallery Image ${index + 1}`}
                                    width={150}
                                    height={150}
                                    className="rounded-lg shadow-md object-contain bg-pink-50"
                                />
                            </td>
                            <td className="border p-2 text-center">
                                <div className="flex justify-center items-center space-x-3">
                                    {/* <CiEdit size={25} className='cursor-pointer' color='blue' onClick={() => router.push(`/dashboard/update/${gallery.id}`)} /> */}
                                    <MdDeleteForever size={25} className='cursor-pointer' color='red' onClick={() => handleDelete(gallery.id)} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(newPage) => setCurrentPage(newPage)}
            />

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-md shadow-lg w-96">
                        <h3 className="text-lg font-semibold mb-4">Thêm hình ảnh mới</h3>
                        <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
                        {previewUrl && (
                            <Image src={previewUrl} alt="Preview" width={300} height={300} className="rounded-md mb-4" />
                        )}
                        <div className="flex justify-end space-x-2">
                            <button onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                                Hủy
                            </button>
                            <button onClick={handleUpload} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}