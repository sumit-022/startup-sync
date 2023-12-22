const formatDate = (strapiDate: string | null | undefined) => {
  if (!strapiDate) return "";
  const parts = strapiDate.split("-");
  const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
  return formattedDate;
};

export default formatDate;
