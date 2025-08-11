export const useUTableFilter = (q, data) => {
  if (!q.value) {
    return data;
  }
  const excludedProperties = ["created_at", "updated_at", "deleted_at"];
  return data.filter((element) => {
    const includesQuery = (obj) => {
      return Object.entries(obj).some(([key, value]) => {
        if (excludedProperties.includes(key)) {
          return false;
        }
        if (typeof value === "string" && value.toLowerCase().includes(q.value.toLowerCase())) {
          return true;
        }
        if (typeof value === "object" && value !== null) {
          return includesQuery(value);
        }
        return false;
      });
    };
    return includesQuery(element);
  });
};
