import { useEffect, useRef } from "react";

export function useClickOutside (handler) {
    let domNode = useRef();
    useEffect(() => {
        let changeHandler = (event) => {
          if(!domNode.current.contains(event.target)) {
            handler();
          }
        };
        document.addEventListener("mousedown", changeHandler );
        return () => {
          document.removeEventListener("mousedown", changeHandler)
        }
      });
      return domNode;
};