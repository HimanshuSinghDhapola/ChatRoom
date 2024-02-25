import React, { useContext, useRef, useEffect } from "react";
import { SocketContext } from "../../Context/SocketContext";

function Chats({ feed }) {
  const { userName } = useContext(SocketContext);

  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [feed]);

  return (
    <div className="container my-auto mx-auto" ref={scrollRef}>
      {feed.map((feedContent) => {
        return (
          <div
            className={
              " md:max-w-[40%] max-w-[60%] message " +
              (feedContent.author
                ? feedContent.author === userName
                  ? "right"
                  : "left"
                : "center")
            }
          >
            {feedContent.message ? (
              <div className="p-1">
                <div className="text-xs font-bold justify-start mb-0">
                  {feedContent.author}
                </div>
                <div className=" -my-0.5 font-normal">
                  {feedContent.message}
                </div>
                <div className=" font-medium flex justify-end text-[10px] -my-1">
                  {feedContent.time}
                </div>
              </div>
            ) : (
              feedContent
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Chats;
