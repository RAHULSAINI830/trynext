import React, {useState} from "react";
import InterestForm from "../propdetailsComponents/sendInterest";
import { useSession } from "next-auth/react";

const InterestButton = ({ cssclass, property_name }) => {
  const { data: session } = useSession();
  async function handleInterestSubmit() {
    if (session) {
      const userName = session?.user?.name;
      const userEmail = session?.user?.email;
      const userPhone = session?.user?.phone;
      const userText = session?.user?.text;
      try {
        const response = await fetch(`/api/sendInterest`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the appropriate content type
          },
          body: JSON.stringify({
            userName,
            userEmail,
            userPhone,
            userText,
            property_name,
          }),
        });
        if (response.ok) {
          alert("Interest sent !");
        } else {
          const errordata = await response.json();
          alert(errordata.error);
        }
      } catch (error) {
        console.error("Error submitting interest:", error);
        alert("An error occurred ");
      }
    } else {
      setShowInterestForm(true);
    }
  }
  const [showInterestForm, setShowInterestForm] = useState(false);
  async function handleInterestFormSubmit(formdata) {
    const userName = formdata.name || "";
    const userEmail = formdata.email || "";
    const userPhone = formdata.phone || "";
    const userText = formdata.text || "";
    // console.log(userName, userEmail, userPhone, userText, property_name)
    try {
      const response = await fetch(`/api/sendInterest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the appropriate content type
        },
        body: JSON.stringify({
          userName,
          userEmail,
          userPhone,
          userText,
          property_name,
        }),
      });
      if (response.ok) {
        setShowInterestForm(false);
        alert("Interest sent !");
      } else {
        const errordata = await response.json();
        alert(errordata.error);
        setShowInterestForm(false);
      }
    } catch (error) {
      console.error("Error submitting interest:", error);
      alert("An error occurred ");
    }
  }
  async function handleCloseInterestForm() {
    setShowInterestForm(false);
  }
  return (
    <div>
      <button
        className={cssclass}
        onClick={handleInterestSubmit}
      >
        Send interest
      </button>
      {showInterestForm && (
        <InterestForm
          handleCloseInterestForm={handleCloseInterestForm}
          onSubmit={handleInterestFormSubmit}
        />
      )}
    </div>
  );
};

export default InterestButton;
