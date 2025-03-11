const Footer = () => {
  return (
    <div className='bg-blue-700 flex flex-col items-center text-amber-300 font-bold py-4'>
      <div className='flex gap-8 mb-2 text-amber-300'>
        <a href="https://www.linkedin.com/in/eiriselias" target="_blank" rel="noopener noreferrer" className="hover:scale-120 transition-all ease-in-out relative group">
          <img src="/linkedin.svg" alt="logolinkedin" width={50} height={40} />
          <span className="absolute bg-black text-white px-4 rounded-2xl w-40 text-center -top-6 -left-12 hidden group-hover:block">
              Linkedin
          </span>
        </a>
        <a href="https://www.github.com/eiriselias" target="_blank" rel="noopener noreferrer" className="hover:scale-120 transition-all ease-in-out relative group">
          <img src="/github.svg" alt="logogithub" width={50} height={40} />
          <span className="absolute bg-black text-white px-4 rounded-2xl w-40 text-center -top-6 -left-12 hidden group-hover:block">
              Github
          </span>
        </a>
        <a href="https://www.facebook.com/eiriselias" target="_blank" rel="noopener noreferrer" className="hover:scale-120 transition-all ease-in-out relative group">
          <img src="/facebook.svg" alt="logofacebook" width={50} height={40} />
          <span className="absolute bg-black text-white px-4 rounded-2xl w-40 text-center -top-6 -left-12 hidden group-hover:block">
              Facebook
          </span>
        </a>
        <a href="https://miro.com/app/board/uXjVITivLMw=/?share_link_id=414131799964" target="_blank" rel="noopener noreferrer" 
          className="hover:scale-120 transition-all ease-in-out relative group "
        >
          <img src="/logoMiro.png" alt="logoMiro" width={50} height={40} />
          <span className="absolute bg-black text-white px-4 rounded-2xl w-40 text-center -top-6 -left-12 hidden group-hover:block">
              Ver diseño UI
          </span>
        </a>
      </div>
      <div>
        <p className="text-sm">© Eiris Salazar Full Stack Developer - 2024</p>
      </div>
    </div>
  );
};

export default Footer;



