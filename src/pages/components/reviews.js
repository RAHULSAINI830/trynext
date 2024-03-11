export default function Reviews() {
  return (
    <div className="flex flex-col bg-gradient-to-br from-emerald-200 via-white to-white min-h-screen p-10">
      <div className="lg:p-10 p-4">
        <h1 className="text-4xl text-black font-semibold text-center  lg:text-left">
          Hear it from our happy homeowners
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div class="lg:w-1/3 rounded-2xl bg-white text-center lg:text-start lg:p-10  lg:m-10 m-3 p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="purple"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z"
              clipRule="evenodd"
            />
          </svg>

          <p class="mb-4 text-center text-sm lg:text-lg lg:text-start text-neutral-600">
            I discovered a property that perfectly matched my lifestyle and
            preferences. The platform&apos;s quiz and genuine listings saved me
            time and frustration. Truly a game-changer in the real estate
            market!
          </p>
          <p className="font-semibold text-black">Home Buyer</p>
          <p className="font-semibold text-black">Devendra Jain, Gurgaon</p>
        </div>
        <div class=" lg:w-1/3 rounded-2xl text-center lg:text-start bg-white lg:p-10  lg:m-10 m-3 p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="purple"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z"
              clipRule="evenodd"
            />
          </svg>
          <p class="mb-4 lg:text-lg text-sm text-neutral-600 ">
            The personalized recommendations and transparent information made my
            search effortless. And the best part is that they do not ask for
            your phone number and spam you like other platforms. Highly
            recommended!
          </p>
          <p className="font-semibold text-black">Home Buyer</p>
          <p className="font-semibold text-black">Ravi Goel, Gurgaon</p>
        </div>
        <div class=" lg:w-1/3 text-center lg:text-start rounded-2xl bg-white lg:p-10  lg:m-10 m-3 p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="purple"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z"
              clipRule="evenodd"
            />
          </svg>
          <p class="mb-4 text-sm lg:text-lg text-neutral-600 ">
            This platform connected me with genuine buyers who appreciated the
            quality and value of our projects. It significantly boosted our
            sales and brand reputation in the market!
          </p>
          <div className="mt-10">
            <p className="font-semibold text-black">Real Estate Developer</p>
            <p className="font-semibold text-black">Vikas, Gurgaon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
