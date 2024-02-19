import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { StatusAPIProps, post_status } from "../components/api_endpoints";
import { themes, brand } from "./theme";

interface ComposeStatusProps {
  className?: string;
  placeholder?: string;
  buttonText?: string;
  callbackFunction?: (createdPost: StatusAPIProps) => void;
  minLineCount?: number;
}

const ComposeStatus = ({
  className = "flex-col bg-inherit space-y-0.5",
  placeholder = "",
  buttonText = "",
  callbackFunction = () => {},
  minLineCount = 1,
}: ComposeStatusProps): JSX.Element => {
  const navigate = useNavigate();
  const { userID } = useContext(UserContext);

  // Status Text
  const [text, setText] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Status Media
  const [media1, setMedia1] = useState<File | null>(null);
  const [previewMedia1, setPreviewMedia1] = useState<string | null>(null);
  const mediaInputRef = useRef<HTMLInputElement>(null);

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
  }, [minLineCount, text]);

  return (
    <div className={className}>
      <div id="typing-input">
        <textarea
          placeholder={placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onClick={(e) => {
            e.preventDefault();
          }}
          ref={textAreaRef}
          className={`block w-full bg-inherit resize-none
                  py-1.5 pl-2 pr-8 text-xl ${themes["black"].textPrimary}
                  placeholder:${themes["black"].textSecondary} focus:outline-0
                  `}
          rows={minLineCount}
        />
      </div>
      <div id="preview-images">
        {previewMedia1 === null ? (
          <></>
        ) : (
          <img
            src={previewMedia1}
            className="rounded-lg w-1/2 cursor-pointer"
            // todo: move this into a dedicated 'x' button
            onClick={() => {
              setMedia1(null);
              setPreviewMedia1(null);
            }}
            alt="pfp"
          />
        )}
      </div>
      <div id="actions" className="flex pt-3 border-neutral-700">
        <div
          id="image-upload"
          className="border-2 rounded px-1 py-auto leading-8
                      select-none cursor-pointer
                      border-blue-400 hover:border-blue-500 active:border-blue-600"
        >
          <input
            type="file"
            ref={mediaInputRef}
            className="hidden"
            // onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setMedia1(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                  setPreviewMedia1(reader.result as string);
                };
                reader.readAsDataURL(file);
              } else {
                setMedia1(null);
                setPreviewMedia1(null);
              }
            }}
          />
          <span
            onClick={(e) => {
              e.preventDefault();
              mediaInputRef.current?.click();
            }}
            className="text-xl leading-none"
          >
            📸
          </span>
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            if (text === "") {
              return;
            }
            if (userID === null) {
              navigate("/login");
              return;
            }

            // todo: make api return statusID of created post
            //       then place that into this statusID
            post_status(userID as string, text, media1);
            callbackFunction({
              statusID: "",
              replyID: "",
              userID: userID,
              text: text,
              media1: previewMedia1,
              dateTimePosted: new Date().toString(),
            });

            setText("");
            setMedia1(null);
          }}
          id="post-status"
          className={`w-fit ml-auto text-center rounded-full
                      mr-2 px-5 py-1
                      ${
                        text === "" && media1 === null
                          ? `${brand.disable} text-gray-500`
                          : `${brand.base} text-white hover:${brand.hover} active:${brand.press} cursor-pointer`
                      }
                      text-lg font-semibold select-none `}
        >
          {buttonText}
        </div>
      </div>
    </div>
  );
};

export default ComposeStatus;
