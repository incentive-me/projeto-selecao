import { Typography } from "@mui/material";

export default function Title({title}: {title: string}){
    return(
        <Typography style={{
                paddingTop: "24px",
                paddingLeft: "24px",
                paddingRight: "24px",
                color: "#000000de",
                fontSize: "24px"
            }}
        >
            {title}
        </Typography>
    )
}