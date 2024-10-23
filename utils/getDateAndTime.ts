const getDate = () => {
    const now = new Date();

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayName = days[now.getDay()];
    const dayOfMonth = now.getDate();
    const monthName = months[now.getMonth()];
    const year = now.getFullYear();

    const date = `${dayName}, ${dayOfMonth} ${monthName} ${year}`;

    return date;
}

const getTime = () => {
    const now = new Date();

    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;


    const time = `${hours}:${formattedMinutes} ${ampm}`;

    return time;
}


export { getDate, getTime };