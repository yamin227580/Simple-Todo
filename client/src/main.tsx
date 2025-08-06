import { createRoot } from "react-dom/client";
import NoteList from "./components/NoteList";
import "./index.css";

createRoot(document.getElementById("root")!).render(<NoteList />);
