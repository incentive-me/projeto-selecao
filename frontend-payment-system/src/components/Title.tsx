import { Typography } from "@mui/material";

export default function Title({title}: {title: string}){
    return(
        <Typography style={{ color: "#000000de", fontSize: "24px" }}>
            {title}
        </Typography>
    )
}