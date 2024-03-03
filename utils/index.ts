export async function fetchData() {
    
    try {
        const response = await fetch('https://www.common.com/cmn-api/listings/common');
        if (!response.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data')
        } else {
            const rawData =  await response.json();
            const data = rawData.slice(0, 10);
            return { props: { data } };
        }
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return { props: { data: [] } };
    }
}