import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";
import Embed from "@editorjs/embed";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";

// For image uploads
const uploadImageByFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve({
        success: 1,
        file: {
          url: e.target.result,
        },
      });
    };
    reader.readAsDataURL(file);
  });
};

export const EDITOR_JS_TOOLS = {
  header: {
    class: Header,
    config: {
      placeholder: "Enter a header",
      levels: [2, 3, 4],
      defaultLevel: 2,
    },
  },
  list: List,
  image: {
    class: ImageTool,
    config: {
      uploader: {
        uploadByFile: uploadImageByFile,
      },
    },
  },
  paragraph: Paragraph,
  embed: Embed,
  quote: Quote,
  marker: Marker,
  inlineCode: InlineCode,
};
