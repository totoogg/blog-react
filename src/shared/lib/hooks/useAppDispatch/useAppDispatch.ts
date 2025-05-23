import { AppDispatch } from "app/providers/StoryProvider";
import { useDispatch } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
