const isValidJsonData = (content) => {
  if (typeof content === "object") {
    return true;
  }

  if (typeof content !== "string") {
      return false;
  }

  try {
      JSON.parse(content);
      return true;
  } catch (error) {
      return false;
  }
}

const toJson = (content) => {
  if (typeof content === "object") {
    return JSON.stringify(content, null, 2);
  }
  return JSON.stringify(JSON.parse(content), null, 2);
}

module.exports = {
  isValidJsonData,
  toJson,
}