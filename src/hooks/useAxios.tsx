import { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

type HttpMethod = 'get' | 'post';

interface ApiResponse<T> {
    data: T | null;
    loading: boolean;
    error: MyError | null;
}

interface MyError {
    message: string;
    status?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
}

export function useAxios<T>(url: string, method: HttpMethod = 'get', initialData: T | null = null): ApiResponse<T> {
    const [data, setData] = useState<T | null>(initialData);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<MyError | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                let response: AxiosResponse<T>;
                if (method === 'get') {
                    response = await axios.get<T>(url);
                } else if (method === 'post') {
                    response = await axios.post<T>(url);
                } else {
                    throw new Error('Unsupported HTTP method');
                }
                setData(response.data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError<MyError>;
                    setError({
                        message: axiosError.message,
                        status: axiosError.response?.status,
                        data: axiosError.response?.data
                    });
                } else if (error instanceof Error) {
                    setError({ message: error.message });
                } else {
                    setError({ message: 'An unknown error occurred.' });
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, method]);

    return { data, loading, error };
}
