import { useState } from "react";
import "./App.css";
import * as A from "@automerge/automerge/next";

type TextDocument = {
  text: string;
};

const initialText = "Hello how are you?";

let doc: A.Doc<TextDocument> = A.from({ text: initialText });

function App() {
  const [input1, setInput1] = useState<string>(initialText);
  const [input2, setInput2] = useState<string>(initialText);
  const handleSync = () => {
    const originalDoc = A.change(doc, (d) => {
      A.updateText(d, ["text"], input1);
    });
    let forkedDoc = A.clone(doc);
    forkedDoc = A.change(forkedDoc, (d) => {
      A.updateText(d, ["text"], input2);
    });
    doc = A.merge(originalDoc, forkedDoc);
    setInput1(doc.text);
    setInput2(doc.text);
  };
  return (
    <div>
      <input
        type="text"
        value={input1}
        onChange={(e) => setInput1(e.target.value)}
      />
      <input
        type="text"
        value={input2}
        onChange={(e) => {
          setInput2(e.target.value);
        }}
      />
      <button onClick={() => handleSync()}>🔁</button>
    </div>
  );
}

export default App;
