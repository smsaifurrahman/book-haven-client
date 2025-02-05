export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
  
    // Get parts of the date
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" }); // e.g., "January"
    const year = date.getFullYear();
  
    // Return the formatted date
    return `${month} ${day}, ${year}`;
  };
  