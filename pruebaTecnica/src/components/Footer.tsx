const Footer = () => {
  return (
    <div className='bg-blue-700 flex flex-col items-center text-amber-300 font-bold py-4'>
      <div className='flex gap-8 mb-2 text-amber-300'>
        <a href="https://www.linkedin.com/in/eiriselias" target="_blank" rel="noopener noreferrer">
          <img src="/linkedin.svg" alt="logolinkedin" width={50} height={40} />
        </a>
        <a href="https://www.github.com/eiriselias" target="_blank" rel="noopener noreferrer">
          <img src="/github.svg" alt="logogithub" width={50} height={40} />
        </a>
        <a href="https://www.facebook.com/eiriselias" target="_blank" rel="noopener noreferrer">
          <img src="/facebook.svg" alt="logofacebook" width={50} height={40} />
        </a>
        <a href="https://miro.com/app/board/uXjVITivLMw=/?share_link_id=414131799964" target="_blank" rel="noopener noreferrer">
          <img src="/logoMiro.png" alt="logoMiro" width={50} height={40} />
        </a>
      </div>
      <div>
        <p>© Eiris Salazar Full Stack Developer - 2024</p>
      </div>
    </div>
  );
};

export default Footer;



