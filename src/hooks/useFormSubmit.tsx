import axios from 'axios';
import { useState } from 'react';

type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

function useFormSubmit<T, R>(url: string) {

    const [formData, setFormData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<R | null>(null);

    const handleChange = (e: ChangeEvent) => {
        setFormData((prevFormData) => ({
            ...(prevFormData ?? {} as T),
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(url, formData);
            setResponse(response.data);
        } catch (error) {
            if (axios.isAxiosError(error) && error?.response?.data) {
                setError(error.response.data)
            } else if (error instanceof Error) {
                setError(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        isLoading,
        error,
        response,
        handleChange,
        handleSubmit,
    };
}

export default useFormSubmit;
