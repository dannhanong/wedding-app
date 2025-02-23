"use client";

import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { deleteWish, getAllWishes } from "@/services/wish";

interface Wish {
    id: string;
    name: string;
    message: string;
    roleFriend: boolean;
}

export default function WishManagement() {
    const [wishes, setWishes] = useState<Wish[]>([]);

    const fetchAllWishes = async () => {
        try {
            const response = await getAllWishes();
            setWishes(response);
        } catch (error) {
            console.error("Error during wish fetch:", error);
        }
    };

    const handleDelete = (id: string) => {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn xóa lời chúc này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            confirmButtonColor: '#d33',
            cancelButtonText: 'Hủy',
            cancelButtonColor: '#3085d6',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await deleteWish(id);
                    if (response) {
                        fetchAllWishes();
                        Swal.fire({
                            icon: 'success',
                            title: 'Xóa lời chúc thành công!',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                } catch (error) {
                    console.error('Error deleting wish:', error);
                }
            }
        });
    };

    useEffect(() => {
        fetchAllWishes();
    }, []);

    return (
        <div className="bg-white p-4 rounded-md shadow mt-10 mx-2">
            <h2 className="text-lg font-semibold mb-2">Danh sách lời chúc</h2>

            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-orange-500 text-white">
                        <th className="border p-2">STT</th>
                        <th className="border p-2">Họ tên</th>
                        <th className="border p-2">Lời chúc</th>
                        <th className="border p-2">Bạn của</th>
                        <th className="border p-2">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {wishes.map((wish, index) => (
                        <tr key={wish.id} className="bg-white hover:bg-gray-100">
                            <td className="border p-2 text-center">{(index + 1)}</td>
                            <td className="border p-2 text-center">{wish.name}</td>
                            <td className="border p-2 text-center">{wish.message}</td>
                            <td className="border p-2 text-center">{wish.roleFriend ? 'Bạn của 🤵' : 'Bạn của 👰'}</td>
                            <td className="border p-2 text-center">
                                <div className="flex justify-center items-center space-x-3">
                                    <MdDeleteForever size={25} className='cursor-pointer' color='red' onClick={() => handleDelete(wish.id)} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}