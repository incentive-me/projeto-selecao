import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Load({load}: {load: boolean}) {
const isLoad = load ? "flex" : "none"
const height = window.innerHeight
const width = window.innerWidth   

  return (
    <Box sx={[styled.container, {display: isLoad, width: width, height: height}]}>
      <CircularProgress />
    </Box>
  );
}

const styled = {
    container : {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        position: "fixed",
        zIndex: "10",
        left: "0",
        top: "0"
    }
}