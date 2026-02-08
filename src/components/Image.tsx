import React, { useState, useEffect } from 'react';

interface ImageProps {
    image: File | null;
    setImage: (file: File | null) => void;
}

export default function Image({ image, setImage }: ImageProps) {
    const [base64Image, setBase64Image] = useState<string | null>(null);

    // Function to handle file change and convert to Base64
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImage(file);
            convertToBase64(file); // Convert the file to Base64
        }
    };

    // Convert file to Base64 string
    const convertToBase64 = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setBase64Image(reader.result as string);
        };
        reader.onerror = (error) => {
            console.error('Error converting image to Base64', error);
        };
    };

    return (
        <div className="col-span-3 flex my-3">
            <div className="mx-3">
                <div className="my-2 w-20 flex justify-center p-6 rounded-lg border border-dashed border-gray-900/25">
                    <div className="text-center">
                        <div className="w-26 text-sm text-gray-600">
                            <label
                                htmlFor="thumbnail-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                                <span>اختر صورة</span>
                                <input
                                    id="thumbnail-upload"
                                    name="thumbnail"
                                    type="file"
                                    className="sr-only"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>
                    </div>
                    {image && (
                        <div>
                            <p>Image uploaded successfully!</p>
                            {base64Image && (
                                <textarea
                                    value={base64Image}
                                    readOnly
                                    rows={4}
                                    className="mt-2 w-full text-xs"
                                    style={{ width: '100%' }}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
