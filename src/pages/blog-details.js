import React, { useState } from "react";
import Navbar from "./components/navbar";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import Link from "next/link";
import Footer from "./components/footer";

const Blogdetails = () => {
  return (
    <>
      <div className="w-full min-h-[100vh] bg-ghost">
        <div className="fixed w-screen z-50">
          <Navbar />
        </div>
        <div className="py-32 w-[95%] md:w-[95%] lg:w-[90%] mx-auto  ">
          <div class="grid grid-cols-12  gap-4">
            <div class="col-span-12 lg:col-span-9 order-2 lg:order-1 bg-white rounded-md p-4">
              <div className="p-2 md:p-5 lg:p-10">
                <h1 className="text-3xl md:text-4xl lg:text-5xl text-gray-700 font-bold">
                  What NRIs Need to Know About Buying a Home in India
                </h1>
                <div className="flex mt-5 justify-between items-center">
                  <p>{new Date().toDateString()}</p>
                  <div className="flex">
                  <a
                    href="https://www.facebook.com/sharer/sharer.php?u=https://smartneev.com/quiz/page/"
                    target="_blank"
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 cursor-pointer mr-2">
                      <i className="fa fa-facebook text-lg text-white"></i>
                    </div>
                  </a>
                  <a
                    href="https://api.whatsapp.com/send/?text=Check this out https://smartneev.com/quiz/page/"
                    target="_blank"
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-600 cursor-pointer mr-2">
                      <i className="fa fa-whatsapp text-lg text-white"></i>
                    </div>
                  </a>

                  <a
                    href="https://twitter.com/intent/tweet?url=https://smartneev.com/quiz/page/&text=Check this out"
                    target="_blank"
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-400 cursor-pointer mr-2">
                      <i className="fa fa-twitter text-lg text-white"></i>
                    </div>
                  </a>
                  <a
                    href="https://www.instagram.com/share?url=https://smartneev.com/quiz/page/&text=Check this out"
                    target="_blank"
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-800 cursor-pointer mr-2">
                      <i className="fa fa-instagram text-lg text-white"></i>
                    </div>
                  </a>
                  <a
                    href="  https://www.linkedin.com/shareArticle?mini=true&url=https://smartneev.com/quiz/page/&text=Check this out"
                    target="_blank"
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-400 cursor-pointer mr-2">
                      <i className="fa fa-linkedin text-lg text-white"></i>
                    </div>
                  </a>
                  </div>
                </div>
                <hr className="mt-3 mb-5" />
                <div className="p-2 md:p-5 ">
                  <img
                    src="https://images.unsplash.com/photo-1501183638710-841dd1904471"
                    alt=""
                    className="w-full  h-full"
                  />
                  <div className="mt-5">
                    <p>
                      Are you a Non-Resident Indian (NRI) or a Person of Indian
                      Origin (PIO) who dreams of owning a home in India? If so,
                      you might be wondering how to go about buying a property
                      in your motherland. What are the rules and regulations for
                      NRIs buying property in India? What are the types of
                      properties you can buy? What are the documents and
                      procedures involved? How can you finance your purchase and
                      save money on international payments?
                    </p>
                    <p className="mt-2">
                      In this blog post, we will answer all these questions and
                      more, to help you make an informed decision about buying a
                      home in India. Whether you want to invest in real estate,
                      buy a vacation home, or return to India someday, this
                      guide will provide you with all the information you need.
                    </p>
                    <h1 className="font-semibold text-lg mt-4">
                      Table of Contents
                    </h1>
                    <ul className="pl-10 mt-2 list-decimal">
                      <li className="text-blue-600 font-semibold">
                        <Link href="#types-of-properties">
                          Types of Properties NRIs Can Buy in India
                        </Link>
                      </li>
                      <li className="text-blue-600 font-semibold">
                        <Link href="#documents-required-for-NRIs">
                          Documents Required for NRIs to Buy Property in India
                        </Link>
                      </li>
                      <li className="text-blue-600 font-semibold">
                        <Link href="#procedure-for-NRIs-to-buy-property">
                          Procedure for NRIs to Buy Property in India
                        </Link>
                      </li>
                    </ul>

                    <div className="mt-10" id="types-of-properties">
                      <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-bold">
                        Types of Properties NRIs Can Buy in India
                      </h2>
                      <p className="mt-5">
                        As an NRI or PIO, you have the freedom to buy most types
                        of immovable properties in India, such as residential
                        and commercial properties. You do not need any special
                        permission from the Reserve Bank of India (RBI) or the
                        government to purchase these properties, as long as you
                        follow the Foreign Exchange Management Act (FEMA)
                        rules1.{" "}
                      </p>
                      <p className="mt-2">
                        The only exception is that you cannot buy agricultural
                        land, farmhouses, or plantation properties in India.
                        These types of properties are reserved for Indian
                        citizens only. You can only own such properties if you
                        inherit them from your relatives or if you get approval
                        from the RBI and the government on a case-by-case
                        basis1.{" "}
                      </p>
                      <p className="mt-2">
                        If you already own a property in India before becoming
                        an NRI, you can continue holding it even if it is
                        agricultural land, farmhouse, or plantation property.
                        You can also rent out your property to earn income from
                        it, as long as you pay the applicable taxes in India.
                      </p>
                    </div>

                    <div className="mt-10" id="documents-required-for-NRIs">
                      <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-bold">
                        Documents Required for NRIs to Buy Property in India
                      </h2>
                      <p className="mt-5">
                        The documents required for NRIs to buy property in India
                        are similar to those required for residents. Here is a
                        list of the common documents you will need:
                      </p>
                      <ul className="ml-10 list-disc">
                        <li className="mt-3">
                          Passport: You will need your passport as proof of
                          identity and nationality. If you hold a non-Indian
                          passport, you will also need proof that you are an NRI
                          or PIO, such as an Overseas Citizen of India (OCI)
                          card or a Person of Indian Origin (PIO) card.
                        </li>
                        <li className="mt-3">
                          PAN Card: You will need your Permanent Account Number
                          (PAN) card as proof of your tax status and identity in
                          India. If you do not have a PAN card, you can apply
                          for one online through the Income Tax Department
                          website
                        </li>

                        <li className="mt-3">
                          Address Proof: You will need a document that shows
                          your current address, such as a utility bill, bank
                          statement, or rent agreement.
                        </li>

                        <li className="mt-3">
                          Property Documents: You will need the documents
                          related to the property you want to buy, such as the
                          title deed, sale agreement, no objection certificate
                          (NOC), encumbrance certificate, etc. These documents
                          will vary depending on the type and location of the
                          property.
                        </li>
                        <li className="mt-3">
                          Bank Statements: You will need your bank statements
                          for the last six months to show your financial
                          capacity and source of funds for buying the property.
                        </li>

                        <li className="mt-3">
                          Photographs: You will need two passport-sized
                          photographs of yourself and your co-applicants (if
                          any).
                        </li>
                      </ul>
                    </div>

                    <div className="mt-10" id="procedure-for-NRIs-to-buy-property">
                      <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-bold">
                      Procedure for NRIs to Buy Property in India
                      </h2>
                      <p className="mt-5">
                      The procedure for NRIs to buy property in India is similar to that for residents. Here are the basic steps you will have to follow:

                      </p>
                      <ul className="ml-10 list-decimal">
                        <li className="mt-3">
                        Engage a local solicitor and notary: It is advisable to hire a local solicitor and notary who can help you with the legal aspects of buying a property in India. They can conduct due diligence checks on the property, draft and verify the sale agreement and deed, register the property in your name, and handle any disputes or issues that may arise.

                        </li>
                        <li className="mt-3">
                        Find a realtor in the location you want to buy: A realtor can help you find a suitable property that meets your requirements and budget. They can also negotiate with the seller on your behalf and facilitate the transaction process.

                        </li>

                        <li className="mt-3">
                        Arrange power of attorney if you are not in India for the purchase: If you are not physically present in India for buying the property, you will need to appoint a representative who can act on your behalf. This can be done by giving them a power of attorney (POA), which is a legal document that authorizes them to sign documents and make decisions for you. You can give a POA to anyone you trust, such as a relative, friend, or solicitor. The POA must be attested by an Indian consulate or embassy in your country of residence

                        </li>

                        <li className="mt-3">
                        Find a property and agree on a sale price: Once you find a property that suits your needs, you can make an offer to the seller and negotiate the sale price. You should also inspect the property thoroughly and verify its legal status and ownership history.

                        </li>
                        <li className="mt-3">
                        Sign the sale agreement and pay the booking amount: After agreeing on the sale price, you will have to sign a sale agreement with the seller, which is a contract that outlines the terms and conditions of the sale. You will also have to pay a booking amount, which is usually 10% to 20% of the sale price, as a token of your commitment. The sale agreement must be stamped and registered with the sub-registrar’s office within the jurisdiction of the property.

                        </li>

                        <li className="mt-3">
                        Apply for a home loan if needed: If you need to finance your property purchase, you can apply for a home loan from an Indian bank or a financial institution. You will have to submit your income proof, credit history, property documents, and other details to get approval. You can also avail of tax benefits on your home loan interest and principal repayments under the Income Tax Act.

                        </li>
                        <li className="mt-3">Sign the sale deed and pay the remaining amount: Once your home loan is approved, you will have to sign the sale deed with the seller, which is the final document that transfers the ownership of the property to you. You will also have to pay the remaining amount of the sale price, along with the stamp duty and registration charges, which are usually 5% to 10% of the property value.</li>
                   
                   <li className="mt-3">Register the property in your name: The last step is to register the property in your name with the sub-registrar’s office within the jurisdiction of the property. You will have to present the original sale deed, along with your identity proof, address proof, photographs, and POA (if applicable). The registration process will take a few days and you will receive a copy of the registered sale deed as proof of ownership.</li>
                      </ul>
                    </div>

                    <div className="mt-10" id="types-of-properties">
                      <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-bold">
                      Conclusion

                      </h2>
                      <p className="mt-5">
                      Buying a home in India can be a rewarding experience for NRIs who want to reconnect with their roots or invest in a growing economy. However, it can also be a complex and daunting process that requires careful planning and research
                      </p>
                      <p className="mt-2">
                      We hope this blog post has given you some useful information and tips on how to buy property in India as an NRI. If you have any questions or comments, please feel free to share them below.

                      </p>
                      <p className="mt-2">
                      And if you are unsure of where to buy the property, check out our homematch making feature to find your dream home based on your preferences and lifestyle.
                      </p>
                      <p className="mt-2">Happy home buying!
</p>
                    </div>
                    <div className="mt-10">
              <h4><b>HashTags</b></h4>
              <p className="text-blue-600">#SmartNeev ,  #NRIInvestments , #NRIs , #IndianRealEstate , #AIInRealEstate , #SmartHomeMatchmaking , #InnovativeRealEstate , #EmpoweredChoices 
</p>
            </div>

                  </div>
                </div>
              </div>
            </div>

            <div class="col-span-12 lg:col-span-3 order-1 lg:order-2 ">
              <div className="sticky top-20">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 shadow-md bg-white rounded-md p-1">
                  <div class=" ">
                    <Link href="/">
                      {" "}
                      <img
                        src="https://images.unsplash.com/photo-1501183638710-841dd1904471"
                        alt=""
                        className="w-full h-72 md:h-full lg:h-48 rounded-md"
                      />{" "}
                    </Link>
                  </div>
                  <div class=" py-4 px-2 md:px-4 lg:px-2 text-center md:text-left lg:text-center">
                    <h1 className="text-gray-700 font-semibold text-3xl">
                      Discover your dream home, today
                    </h1>
                    <p className="my-4">
                      Get exclusive, verified, and personalized recommendations
                      just for you
                    </p>
                    <button className="w-full py-2 px-4 rounded-md bg-blue-600 text-white">
                      Home MatchMaking Quiz
                    </button>
                  </div>
                </div>
                <div class="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 shadow-md bg-white rounded-md p-1 mt-4">
                  <h2 className="text-gray-700 font-semibold text-2xl p-2">
                    Recent Articel
                  </h2>

                  {[1, 2, 3, 4].map((val, ind) => {
                    return (
                      <>
                        <div
                          class="p-2 hover:bg-slate-100 rounded-md"
                          key={ind}
                        >
                          <div class="grid grid-cols-2 gap-2">
                            <div class="">
                              <Link href="/">
                                {" "}
                                <img
                                  src=" https://images.unsplash.com/photo-1501183638710-841dd1904471"
                                  alt=""
                                  className="w-full  rounded-md"
                                />{" "}
                              </Link>
                            </div>
                            <div class="ml-2 ">
                              <Link href="/">
                                <h1 className="text-base font-medium text-gray-700 text-len">
                                  Elastic Email Review 2023: Is This The Right
                                  Tool for Your Business?
                                </h1>
                              </Link>
                              <p className="mt-2 text-sm text-gray-500">
                                {new Date().toDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
           
          </div>
          <h2 className="block lg:hidden text-gray-700 font-semibold text-2xl mt-4 ">
            Recent Articel
          </h2>
          <div class="grid lg:hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-1 shadow-md bg-white rounded-md p-1 mt-4">
            {[1, 2, 3, 4].map((val, ind) => {
              return (
                <>
                  <div class="p-2 hover:bg-slate-100 rounded-md" key={ind}>
                    <div class="grid grid-cols-2 gap-2 ">
                      <div class="">
                        <Link href="/">
                          {" "}
                          <img
                            src="https://images.unsplash.com/photo-1501183638710-841dd1904471"
                            alt=""
                            className="w-full  rounded-md"
                          />{" "}
                        </Link>
                      </div>
                      <div class="ml-2 pt-4 ">
                        <Link href="/">
                          <h1 className="text-base font-medium text-gray-700 text-len">
                            Elastic Email Review 2023: Is This The Right Tool
                            for Your Business?
                          </h1>
                        </Link>
                        <p className="mt-2 text-sm text-gray-500">
                          {new Date().toDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Blogdetails;
