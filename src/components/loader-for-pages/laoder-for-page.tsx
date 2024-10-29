
import logob from '@img/logommc.png'
import './loader-for-pages.css'
const LoaderForPage=()=>{

    return(
        <div className="bg-p-mmc w-full h-[100vh] flex flex-col items-center justify-center  ">
         <div className="mb-[20px] w-[50%] max-w-[300px]">
            <img src={logob.src} alt="" />
         </div>
         <div className="loader"></div>
      </div>
    )
}

export default LoaderForPage