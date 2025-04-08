export const useFormatAttributeLabel = () => {
  const formatAttributeLabel = (code: string) => {
    return code
      .split(/[_\s]+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return { formatAttributeLabel };
};
