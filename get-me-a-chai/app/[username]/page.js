"use client";
import React, { useEffect } from 'react';

const Username = (props) => {
  const { username } = React.use(props.params);

  const [amount, setAmount] = React.useState('');
  const [name, setName] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [supporters, setSupporters] = React.useState([
    { name: 'Shubham', amount: 30, message: 'Great work!' },
    { name: 'Aryan', amount: 20, message: 'Keep it up!' },
    { name: 'Priya', amount: 50, message: 'Love your art!' },
    { name: 'Ankit', amount: 10, message: 'This is amazing!' },
    { name: 'Riya', amount: 25, message: 'So cool!' },
    { name: 'Rakesh', amount: 15, message: 'Keep growing!' },
  ]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.lordicon.com/lordicon.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleQuickSelect = (value) => {
    setAmount(value);
  };

  const handlePayment = () => {
    if (!name || !amount) return;

    const newSupporter = {
      name,
      amount: parseFloat(amount),
      message: message || '',
    };

    setSupporters([newSupporter, ...supporters]);
    setName('');
    setAmount('');
    setMessage('');
  };

  return (
    <>
      <div className="cover w-full relative">
        <img
          className="object-cover w-full h-[400px]"
          src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxOTIwLCJ3ZSI6MX0%3D/18.gif?token-hash=uwsb1dUAQTQPo-r3Yu3CC5aeLjpVLgWatgH-t5XOJHc%3D&token-time=1751587200"
          alt="Object Cover"
        />
        <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2">
          <img
            width={100}
            height={100}
            className="rounded-full border-white border-2 shadow-lg"
            src="https://www.unsw.edu.au/content/dam/images/canberra/unsw-canberra/space/events/2025-asdastm-conference/2025-04-render-of-m2-satellite-in-orbit-square-crop.cropimg.width=700.crop=square.jpg"
            alt="space"
          />
        </div>
      </div>

      <div className="info flex flex-col justify-center items-center my-20 mb-32 text-center gap-2 px-4">
        <div className="text-lg font-bold">@{username}</div>
        <div className="text-sm">Creating Animated art for VTT's</div>
        <div className="text-sm text-gray-600">9,719 members. 82 posts. $15,450/releases</div>

        <div className="payment flex flex-col md:flex-row gap-4 mt-6 w-[80%]">
          {/* Supporters Box */}
          <div className="supporters flex-1 bg-gradient-to-br from-yellow-300 to-orange-200 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Top Supporters</h2>
            <div className="text-sm space-y-4 text-gray-700">
              {supporters.map((s, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `
                        <lord-icon
                          src="https://cdn.lordicon.com/kdduutaw.json"
                          trigger="hover"
                          style="width:30px;height:30px"
                          colors="primary:#121331,secondary:#e32636">
                        </lord-icon>
                      `,
                    }}
                  />
                  <div>
                    <strong>{s.name}</strong> donated ${s.amount}{' '}
                    {s.message && <span>with a message "{s.message}"</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Make Payment Box */}
          <div className="makepayment flex-1 bg-gradient-to-br from-purple-500 to-indigo-500 p-6 rounded-xl shadow-md flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold text-white">Make a Payment</h2>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="px-4 py-2 rounded-full w-full max-w-[240px] outline-none border border-gray-300 text-sm"
            />

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message"
              className="px-4 py-2 rounded-xl w-full max-w-[240px] outline-none border border-gray-300 text-sm resize-none"
              rows={3}
            />

            <div className="flex w-full max-w-[240px] justify-center items-center gap-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                className="px-3 py-2 rounded-full w-full outline-none border border-gray-300 text-sm"
              />
              <button
                onClick={handlePayment}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center"
              >
                ➤
              </button>
            </div>

            <div className="flex gap-3 flex-wrap justify-center mt-2">
              {[10, 20, 50, 100].map((val) => (
                <button
                  key={val}
                  onClick={() => handleQuickSelect(val)}
                  className="bg-white text-gray-700 px-4 py-1 rounded-full border hover:bg-indigo-100 transition text-sm"
                >
                  ${val}
                </button>
              ))}
            </div>

            <p className="text-sm text-white/90 text-center px-2">
              Your support helps create more content!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Username;
