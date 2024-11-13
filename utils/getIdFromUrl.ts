const getIdFromUrl = (url:any) => {
    try {
        const urlObj = new URL(url);
        const segments = urlObj.pathname.split('/');
        const id = segments.pop();
        return id || null;
    } catch (error) {
        console.error('Invalid URL:', error);
        return null;
    }
}

export default getIdFromUrl;