import { useEffect, useRef } from "react";

interface ComposeStatusProps {
  placeholder?: string;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const minLineCount = 3;

const ComposeStatus = ({
  placeholder = "",
  text,
  setText,
}: ComposeStatusProps): JSX.Element => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Resize the text area to create new post
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.rows = 1;
      const lineHeight = parseInt(
        getComputedStyle(textAreaRef.current).lineHeight,
        10
      );
      const newLineCount =
        Math.ceil(textAreaRef.current.scrollHeight / lineHeight) - 1;

      textAreaRef.current.rows = Math.max(minLineCount, newLineCount);
    }
  }, [text]);

  return (
    <div id="text-box">
      <textarea
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        ref={textAreaRef}
        className="block w-full bg-black resize-none
                              py-1.5 pl-2 pr-8 text-xl text-white
                              placeholder:text-neutral-500 focus:outline-0"
        rows={minLineCount}
      />
    </div>
  );
};

export default ComposeStatus;
