import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const SubcribeComponent = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_0wz5qor",
        "template_igtje5d",
        form.current,
        "jyqCVpM9F1hEBoD9r"
      )
      .then(
        (result) => {
          console.log(result.text);
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div className="flex items-center justify-center ">
      <div className="absolute hidden bg-lightCard py-10 px-12 rounded-2xl md:flex items-center justify-center gap-9 shadow-[0px_15px_30px_10px_rgba(0,0,0,0.2)]">
        <div className="flex items-center justify-center gap-5">
          <div className="text-xl ">Subscribe To Our Newsletter</div>
          <form
            className="flex gap-1"
            ref={form}
            onSubmit={sendEmail}
            action="#"
            method="POST"
          >
            <input
              type="email" name="message"
              className="p-4 border border-black rounded-lg"
              placeholder="Enter Your Mail"
            />
            <button className="p-4 rounded-lg bg-lightPrimary text-lightCard">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubcribeComponent;
