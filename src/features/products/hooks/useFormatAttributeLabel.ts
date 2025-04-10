export const useFormatAttributeLabel = () => {
  const formatAttributeLabel = (code: string) => {
    return code
      .replace(/([A-Z])/g, " $1")
      .split(/[_\s]+/)
      .filter((word) => word.length > 0)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return { formatAttributeLabel };
};
