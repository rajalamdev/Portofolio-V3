export function formatDate(dateString: string) {
    const months = [
      "January", "February", "March", "April", "Mei", "June", "July", "August", "September", "October", "November", "December"
    ];
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }