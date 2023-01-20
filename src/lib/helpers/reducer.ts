type ReducerType = {
  type: string;
};

export const reducer = (prev: boolean, action: ReducerType) => {
  if (
    action.type === "terjemahan" ||
    action.type === "audio" ||
    action.type === "tafsir" ||
    action.type === "notification"
  )
    return !prev;
  throw new Error("Unknown action type");
};
