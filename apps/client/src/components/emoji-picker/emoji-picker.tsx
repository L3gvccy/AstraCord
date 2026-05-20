import EmojiPicker, { Theme, type EmojiClickData } from "emoji-picker-react";
import "./emoji.css";
import React from "react";

interface Props {
  onEmojiClick: (emojiData: EmojiClickData) => void;
  width?: number;
  height?: number;
}

const EmojiPickerComponent = ({ onEmojiClick, width, height }: Props) => {
  return (
    <div className="custom-emoji-picker">
      <EmojiPicker
        onEmojiClick={onEmojiClick}
        theme={Theme.DARK}
        width={width}
        height={height}
      />
    </div>
  );
};

export default EmojiPickerComponent;
