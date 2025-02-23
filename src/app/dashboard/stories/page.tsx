"use client";

import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import Image from 'next/image';
import { createStory, deleteStory, getAllStories, updateStory } from "@/services/story";

interface Story {
    id: string;
    title: string;
    description: string;
    image: string;
    date: string;
}

export default function StoryManagement() {
    const [stories, setStories] = useState<Story[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState('');

    const fetchAllStories = async () => {
        try {
            const response = await getAllStories()
            setStories(response.data);
        } catch (error) {
            console.error("Error during story fetch:", error);
        }
    };

    const handleUpdate = (id: string) => {
        setIsModalUpdateOpen(true);
        const story = stories.find(story => story.id === id);
        if (story) {
            setSelectedId(story.id);
            setTitle(story.title);
            setDate(story.date);
            setDescription(story.description);
            setPreviewUrl(`${process.env.NEXT_PUBLIC_API_URL_FILE}/files/preview/${story.image}`);
        }
    }

    const handleEdit = async () => {
        try {
            await updateStory(selectedId, title, date, selectedFile, description);
            setIsModalUpdateOpen(false);
            setSelectedId('');
            setTitle('');
            setDate('');
            setDescription('');
            setSelectedFile(null);
            setPreviewUrl(null);
            fetchAllStories();
            Swal.fire({
                icon: 'success',
                title: 'Cập nhật câu chuyện thành công!',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error("Error updating story:", error);
        }
    }

    const handleDelete = (id: string) => {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn xóa câu chuyện này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            confirmButtonColor: '#d33',
            cancelButtonText: 'Hủy',
            cancelButtonColor: '#3085d6',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await deleteStory(id);
                    if (response) {
                        fetchAllStories();
                        Swal.fire({
                            icon: 'success',
                            title: 'Xóa câu chuyện thành công!',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                } catch (error) {
                    console.error('Error deleting story:', error);
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

    const handleSubmit = async () => {
        if (selectedFile) {
            try {
                await createStory(title, date, selectedFile, description);
                setIsModalOpen(false);
                setTitle('');
                setDate('');
                setDescription('');
                setSelectedFile(null);
                setPreviewUrl(null);
                fetchAllStories();
                Swal.fire({
                    icon: 'success',
                    title: 'Tải lên câu chuyện thành công!',
                    showConfirmButton: false,
                    timer: 1500,
                });
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    };

    useEffect(() => {
        fetchAllStories();
    }, []);

    return (
        <div
            className="bg-white p-4 rounded-md shadow mt-10 mx-2"
            style={{ minHeight: "100vh" }}
        >
            <h2 className="text-lg font-semibold mb-2">Danh sách câu chuyện</h2>
            <div className="flex justify-end mb-4">
                <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Thêm câu chuyện
                </button>
            </div>

            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-orange-500 text-white">
                        <th className="border p-2">STT</th>
                        <th className="border p-2">Hình ảnh</th>
                        <th className="border p-2">Ngày</th>
                        <th className="border p-2">Tiêu đề</th>
                        <th className="border p-2">Mô tả</th>
                        <th className="border p-2">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {stories.map((story, index) => (
                        <tr key={story.id} className="bg-white hover:bg-gray-100">
                            <td className="border p-2 text-center">{index + 1}</td>
                            <td className="border p-2 flex justify-center items-center">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_API_URL_FILE}/files/preview/${story.image}`}
                                    alt={`story Image ${index + 1}`}
                                    width={150}
                                    height={150}
                                    className="rounded-lg shadow-md object-contain bg-pink-50"
                                />
                            </td>
                            <td className="border p-2 text-center">{story.date.toLocaleString()}</td>
                            <td className="border p-2 text-center">{story.title}</td>
                            <td className="border p-2 text-center">{story.description}</td>
                            <td className="border p-2 text-center">
                                <div className="flex justify-center items-center space-x-3">
                                    <CiEdit size={25} className='cursor-pointer' color='blue' onClick={() => handleUpdate(story.id)} />
                                    <MdDeleteForever size={25} className='cursor-pointer' color='red' onClick={() => handleDelete(story.id)} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-md shadow-lg w-96 max-h-[90vh] overflow-y-auto relative">
                        <h3 className="text-xl font-semibold mb-4 text-center">Thêm câu chuyện mới</h3>
                        <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4 w-full" />

                        {previewUrl && (
                            <div className="flex justify-center mb-4">
                                <Image src={previewUrl} alt="Preview" width={300} height={300} className="rounded-md object-contain" />
                            </div>
                        )}

                        <div className="space-y-2 mb-4">
                            <input
                                type="text" placeholder="Tiêu đề" className="border p-2 rounded-md w-full"
                                value={title} onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2 mb-4">
                            <input
                                type="date" placeholder="Ngày" className="border p-2 rounded-md w-full"
                                value={date} onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2 mb-4">
                            <textarea
                                placeholder="Mô tả" className="border p-2 rounded-md w-full resize-none" rows={4}
                                value={description} onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-end space-x-2 bg-white sticky bottom-0 left-0 right-0 py-2">
                            <button onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                                Hủy
                            </button>
                            <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isModalUpdateOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-md shadow-lg w-96 max-h-[90vh] overflow-y-auto relative">
                        <h3 className="text-xl font-semibold mb-4 text-center">Cập nhật câu chuyện</h3>
                        <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4 w-full" />

                        {previewUrl && (
                            <div className="flex justify-center mb-4">
                                <Image src={previewUrl} alt="Preview" width={300} height={300} className="rounded-md object-contain" />
                            </div>
                        )}

                        <div className="space-y-2 mb-4">
                            <input
                                type="text" placeholder="Tiêu đề" className="border p-2 rounded-md w-full"
                                value={title} onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2 mb-4">
                            <input
                                type="date" placeholder="Ngày" className="border p-2 rounded-md w-full"
                                value={date} onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2 mb-4">
                            <textarea
                                placeholder="Mô tả" className="border p-2 rounded-md w-full resize-none" rows={4}
                                value={description} onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-end space-x-2 bg-white sticky bottom-0 left-0 right-0 py-2">
                            <button onClick={() => setIsModalUpdateOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                                Hủy
                            </button>
                            <button onClick={handleEdit} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}