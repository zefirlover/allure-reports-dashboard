export class DateGetter {
    async getFormattedDateNow(): Promise<string> {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const now = new Date();
        const day = days[now.getUTCDay()];
        const date = String(now.getUTCDate()).padStart(2, '0');
        const month = months[now.getUTCMonth()];
        const year = now.getUTCFullYear();
        const hours = String(now.getUTCHours()).padStart(2, '0');
        const minutes = String(now.getUTCMinutes()).padStart(2, '0');
        const seconds = String(now.getUTCSeconds()).padStart(2, '0');

        return `${day}, ${date} ${month} ${year} ${hours}:${minutes}:${seconds} GMT`;
    }
}