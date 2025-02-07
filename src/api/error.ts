

export const errorCatch = (error: unknown): string => {
    if (typeof error === 'object' && error !== null && 'response' in error) {
        const err = error as { response?: { data?: { message?: string | string[] } } };
        const message = err.response?.data?.message;

        return message
            ? Array.isArray(message)
                ? message[0]
                : message
            : (error as unknown as Error).message;
    }

    return 'Unknown error';
};
