const Home = () => {

  const token = localStorage.getItem("accessToken");

  return (
    <div className="flex md:flex-row flex-col font-epilogue mx-3 w-[80vw] h-[80vh]">
      <div className="md:w-[40%] w-[100%] h-[100%] bg-[white] m-2 rounded-lg border border-solid border-[#5cbdb9]">
        <h1 className="font-epilogue font-bold text-[#5cbdb9] md:text-[40px] text-[20px] text-center m-2">Welcome,</h1>
        <p className="font-epilogue md:text-[20px] text-[14px] text-center m-2">{token ? 'to our restaurant dear (user.name), you can book your table or leave a review' : 'dear guest, please login or register'}</p>
      </div>

      <div className="md:w-[60%] w-[100%] h-[100%] bg-[white] m-2 rounded-lg border border-solid border-[#5cbdb9]">

      </div>
    </div>
  )
}

export default Home