export const FetchData = async () => {
  try {
    const response = await fetch("https://api.covid19api.com/summary");
    let data = response.json();
    return data;
    
  } catch (error) {
    return error;
  }
};
