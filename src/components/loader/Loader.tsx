import { styled } from "@mui/material"
const Loading = styled('div')`
  width: 80px;
  aspect-ratio: 1;
  --c: no-repeat repeating-linear-gradient(90deg, #45204b 0 calc(100%/7), #0000 0 calc(200%/7));
  background: var(--c), var(--c), var(--c), var(--c);
  background-size: 140% 26%;
  animation: l27 .75s infinite linear;

  @keyframes l27 {
    0%, 20% {
      background-position: 0 calc(0*100%/3), 100% calc(1*100%/3), 0 calc(2*100%/3), 100% calc(3*100%/3);
    }
    80%, 100% {
      background-position: 100% calc(0*100%/3), 0 calc(1*100%/3), 100% calc(2*100%/3), 0 calc(3*100%/3);
    }
  }
`;
const Loader=()=>{
    return(
        <div className="flex justify-center items-center bg-gray-200 bg-opacity-50 fixed w-full h-full z-[50] top-[0]">
            <Loading/>
        </div>
    )
}

export default Loader


