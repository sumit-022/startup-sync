export function parseAttributes(data: any): any {
  // Values will be of 4 types
  // 1. Normal Objects/Primitives
  // 2. Arrays with props
  // 3. Objects with { id, attributes }
  // 4. Objects with { data }
  if (Array.isArray(data)) {
    return data.map((item) => parseAttributes(item));
  }

  if (typeof data === "object" && data) {
    if (data.id !== undefined && data.attributes !== undefined) {
      return { id: data.id, ...parseAttributes(data.attributes) };
    }

    if (data.data !== undefined) {
      return parseAttributes(data.data);
    }

    const parsedData: any = {};
    const keys = Object.keys(data);
    for (const key of keys) {
      parsedData[key] = parseAttributes(data[key]);
    }

    return parsedData;
  } else return data;
}
