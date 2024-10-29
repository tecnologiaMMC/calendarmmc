
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp, FaYoutube } from 'react-icons/fa6';
import './footer.css'

const FooterMmc=()=>{


   const whats = () => {
      window.open("https://wa.me/954109568", "_blank");
   };

   const instagram = () => {
      window.open("https://www.instagram.com/mimarinera.com_/", "_blank");
   };

   
   const youtube = () => {
      window.open("https://www.youtube.com/@MiMarineracom", "_blank");
   };

   const fb = () => {
      window.open("https://www.facebook.com/mimarinerapuntocom", "_blank");
   };

   const tik = () => {
      window.open("https://www.tiktok.com/@mimarinera.com?is_from_webapp=1&sender_device=pc", "_blank");
   };

   
   

    return(
        <footer className="conten_footer">
            <article className="footer_contenArticle">
               <section>
                        <FaWhatsapp onClick={whats} className='text-white h-[23px] cursor-pointer hover:text-s-mmc '/>
                        <FaFacebook onClick={fb} className='text-white h-[23px]  cursor-pointer hover:text-s-mmc'/>
                        <FaYoutube onClick={youtube} className='text-white h-[23px]  cursor-pointer hover:text-s-mmc'/>
                        <FaInstagram onClick={instagram} className='text-white h-[23px]  cursor-pointer hover:text-s-mmc'/>
                        <FaTiktok onClick={tik} className='text-white h-[23px]  cursor-pointer hover:text-s-mmc'/>
               </section>
            </article>
            <article className="footer_contenlog">
               <p>© 2024 <span>MiMarinera.com</span> Todos los derechos reservados.</p>
            </article>
         </footer>
    )
}

export default FooterMmc

