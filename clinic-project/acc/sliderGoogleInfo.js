export const sliderGoogleInfo = async () => {
  const serverUrl = "https://biodentric-server.vercel.app";
  const options = {
    method: "GET",
    headers: { "User-Agent": "insomnia/9.3.3" },
  };
  try {
    const request = await fetch(`${serverUrl}/api/reviews`, options);
    const response = await request.json();
    const selectedReviews =
      response.length > 5 ? response.slice(0, 5) : response;
    return { success: true, data: selectedReviews };
  } catch (error) {
    console.error(["error", error]);
    return { success: false, data: null };
  }
};
