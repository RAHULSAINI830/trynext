import React, { useState } from "react";
const Text = ({text}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // const text =
  //   "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit eum dolor maxime excepturi aperiam ea temporibus natus odio voluptatum impedit! Veritatis, fugit impedit porro nobis aspernatur repudiandae saepe dignissimos. Repudiandae ratione illum dolore neque eum! Aliquam, pariatur id hic voluptates molestiae deleniti illum, repellendus quasi sequi temporibus voluptate dicta asperiores magnam. Corrupti aperiam unde fugit adipisci saepe, ducimus labore illo ipsam itaque molestiae veniam ipsa quae assumenda vitae, expedita perspiciatis rem amet velit porro laborum a impedit vel. Laudantium, ipsa fugiat. Maxime beatae vel dolore pariatur! Exercitationem, quas doloribus, debitis quo eum provident fugiat ratione optio temporibus nihil, velit laboriosam!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit eum dolor maxime excepturi aperiam ea temporibus natus odio voluptatum impedit! Veritatis, fugit impedit porro nobis aspernatur repudiandae saepe dignissimos. Repudiandae ratione illum dolore neque eum! Aliquam, pariatur id hic voluptates molestiae deleniti illum, repellendus quasi sequi temporibus voluptate dicta asperiores magnam. Corrupti aperiam unde fugit adipisci saepe, ducimus labore illo ipsam itaque molestiae veniam ipsa quae assumenda vitae, expedita perspiciatis rem amet velit porro laborum a impedit vel. Laudantium, ipsa fugiat. Maxime beatae vel dolore pariatur! Exercitationem, quas doloribus, debitis quo eum provident fugiat ratione optio temporibus nihil, velit laboriosam!";
  const maxChars = 600;
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
    console.log("Toggled!")
  };

  const trimmedText = isExpanded ? text : text?.slice(0, maxChars);
  //console.log("csr");
  return (
    <>
      <div className="text-md">
        {trimmedText}{" "} {isExpanded && <button
            href={""}
            onClick={toggleReadMore}
            className="text-blue-500 underline cursor-pointer"
          >
            Read Less
          </button>}
        {!isExpanded && text?.length > maxChars && (
          <button
            href={""}
            onClick={toggleReadMore}
            className="text-blue-500 underline cursor-pointer"
          >
            Read More
          </button>
        )}
      </div>
    </>
  );
};

export default Text;